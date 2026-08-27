import {
  createShippingOptionsWorkflow,
  deleteShippingOptionsWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  listShippingOptionsForCartWorkflow,
  updateProductsWorkflow,
  updateProductVariantsWorkflow,
} from "@medusajs/core-flows"
import {
  ExecArgs,
  IFulfillmentModuleService,
  IRegionModuleService,
  ISalesChannelModuleService,
  IStockLocationService,
} from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
} from "@medusajs/framework/utils"

const MANUAL_PROVIDER_ID = "manual_manual"
const ET_COUNTRY = "et"

export default async function fixShipping({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const fulfillment: IFulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  )
  const stockLocationService: IStockLocationService = container.resolve(
    ModuleRegistrationName.STOCK_LOCATION
  )
  const salesChannelService: ISalesChannelModuleService = container.resolve(
    ModuleRegistrationName.SALES_CHANNEL
  )
  const regionService: IRegionModuleService = container.resolve(
    ModuleRegistrationName.REGION
  )

  logger.info("Starting shipping configuration fix...")

  // 1. Get/ensure sales channel
  const salesChannels = await salesChannelService.listSalesChannels({}, { take: 20 })
  const defaultSalesChannel =
    salesChannels.find((sc) => sc.name === "Default Sales Channel") ||
    salesChannels[0]
  if (!defaultSalesChannel) {
    throw new Error("No sales channel found.")
  }

  // 2. Get region for Ethiopia
  const regions = await regionService.listRegions({}, { take: 20 })
  const ethiopiaRegion =
    regions.find((r) => r.currency_code === "etb") ||
    regions.find((r) => r.name?.toLowerCase().includes("ethiopia")) ||
    regions[0]
  if (!ethiopiaRegion) {
    throw new Error("No region found.")
  }

  // 3. Shipping Profile
  const profiles = await fulfillment.listShippingProfiles({}, { take: 50 })
  let shippingProfile = profiles.find((p) => p.type === "default") || profiles[0]
  if (!shippingProfile) {
    const created = await fulfillment.createShippingProfiles({
      name: "Default",
      type: "default",
    })
    shippingProfile = Array.isArray(created) ? created[0] : created
  }
  logger.info(`Using shipping profile: ${shippingProfile.name} (${shippingProfile.id})`)

  // 4. Stock Location
  const locations = await stockLocationService.listStockLocations({}, { take: 20 })
  let location = locations.find((l) => l.name === "Addis Ababa Warehouse") || locations[0]
  if (!location) {
    const created = await stockLocationService.createStockLocations({
      name: "Addis Ababa Warehouse",
      address: {
        city: "Addis Ababa",
        country_code: "ET",
        address_1: "",
      },
    })
    location = Array.isArray(created) ? created[0] : created
  }

  // Link all stock locations to fulfillment provider and sales channel
  for (const loc of locations) {
    try {
      await link.create({
        [Modules.STOCK_LOCATION]: { stock_location_id: loc.id },
        [Modules.FULFILLMENT]: { fulfillment_provider_id: MANUAL_PROVIDER_ID },
      })
    } catch {
      // already linked
    }

    try {
      await linkSalesChannelsToStockLocationWorkflow(container).run({
        input: { id: loc.id, add: [defaultSalesChannel.id] },
      })
    } catch {
      // already linked
    }
  }

  // 5. Get or create shipping fulfillment set
  const { data: fulfillmentSets } = await query.graph({
    entity: "fulfillment_set",
    fields: [
      "id",
      "name",
      "type",
      "service_zones.id",
      "service_zones.name",
      "service_zones.geo_zones.id",
      "service_zones.geo_zones.country_code",
    ],
  })

  let targetServiceZoneId: string | undefined

  for (const set of fulfillmentSets) {
    if (set.type === "shipping") {
      for (const zone of set.service_zones || []) {
        const hasEt = (zone.geo_zones || []).some(
          (g: any) => (g.country_code || "").toLowerCase() === ET_COUNTRY
        )
        if (hasEt) {
          targetServiceZoneId = zone.id
          break
        }
      }
    }
    if (targetServiceZoneId) break
  }

  if (!targetServiceZoneId) {
    const createdSet = await fulfillment.createFulfillmentSets({
      name: "Addis Ababa Warehouse delivery",
      type: "shipping",
      service_zones: [
        {
          name: `Ethiopia-${Date.now()}`,
          geo_zones: [{ country_code: ET_COUNTRY, type: "country" }],
        },
      ],
    })
    const created = Array.isArray(createdSet) ? createdSet[0] : createdSet
    targetServiceZoneId = created.service_zones[0].id

    for (const loc of locations) {
      try {
        await link.create({
          [Modules.STOCK_LOCATION]: { stock_location_id: loc.id },
          [Modules.FULFILLMENT]: { fulfillment_set_id: created.id },
        })
      } catch {
        // already linked
      }
    }
  }

  // Ensure all fulfillment sets are linked to all stock locations
  for (const set of fulfillmentSets) {
    for (const loc of locations) {
      try {
        await link.create({
          [Modules.STOCK_LOCATION]: { stock_location_id: loc.id },
          [Modules.FULFILLMENT]: { fulfillment_set_id: set.id },
        })
      } catch {
        // already linked
      }
    }
  }

  // 6. Delete old shipping options and recreate clean standard/express options
  const { data: existingOptions } = await query.graph({
    entity: "shipping_option",
    fields: ["id", "name"],
  })
  if (existingOptions.length) {
    await deleteShippingOptionsWorkflow(container).run({
      input: { ids: existingOptions.map((o: any) => o.id) },
    })
  }

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: MANUAL_PROVIDER_ID,
        service_zone_id: targetServiceZoneId!,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Delivery in 2-3 business days.",
          code: "standard",
        },
        prices: [
          { currency_code: "etb", amount: 1000 },
          { region_id: ethiopiaRegion.id, amount: 1000 },
        ],
        rules: [
          { attribute: "is_return", value: "false", operator: "eq" },
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
        ],
      },
      {
        name: "Express Shipping",
        price_type: "flat",
        provider_id: MANUAL_PROVIDER_ID,
        service_zone_id: targetServiceZoneId!,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Express",
          description: "Delivery within 24 hours.",
          code: "express",
        },
        prices: [
          { currency_code: "etb", amount: 2500 },
          { region_id: ethiopiaRegion.id, amount: 2500 },
        ],
        rules: [
          { attribute: "is_return", value: "false", operator: "eq" },
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
        ],
      },
    ],
  })

  // 7. Ensure all catalog products are assigned to this shipping profile
  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title"],
  })
  if (products.length) {
    await updateProductsWorkflow(container).run({
      input: {
        selector: { id: products.map((p: any) => p.id) },
        update: { shipping_profile_id: shippingProfile.id },
      },
    })
  }

  // 8. Ensure variants without inventory tracking are set to manage_inventory: false
  const { data: variants } = await query.graph({
    entity: "product_variant",
    fields: ["id", "title", "manage_inventory", "inventory_items.inventory_item_id"],
  })
  for (const v of variants) {
    if (v.manage_inventory && (!v.inventory_items || v.inventory_items.length === 0)) {
      logger.info(`Setting variant ${v.title} (${v.id}) manage_inventory to false to avoid fulfillment errors`)
      await updateProductVariantsWorkflow(container).run({
        input: {
          selector: { id: v.id },
          update: { manage_inventory: false },
        },
      })
    }
  }

  // 8. Test carts
  const { data: carts } = await query.graph({
    entity: "cart",
    fields: ["id", "shipping_address.country_code", "completed_at"],
  })

  for (const c of carts) {
    if (!c.completed_at && c.shipping_address?.country_code) {
      const { result } = await listShippingOptionsForCartWorkflow(container).run({
        input: { cart_id: c.id, is_return: false },
      })
      logger.info(
        `Cart ${c.id}: ${result.map((o: any) => o.name).join(", ") || "(none)"}`
      )
    }
  }

  logger.info("Shipping fix finished successfully.")
}
