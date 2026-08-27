import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import {
  addToCartWorkflow,
  createCartWorkflow,
  listShippingOptionsForCartWorkflow,
  addShippingMethodToCartWorkflow,
} from "@medusajs/core-flows"
import { COMPANY_MODULE } from "../modules/company"
import { ApprovalStatusType, ApprovalType } from "../types/approval"
import {
  createApprovalsWorkflow,
  updateApprovalSettingsWorkflow,
} from "../workflows/approval/workflows"

export default async function setupDemoApproval({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const link = container.resolve(ContainerRegistrationKeys.LINK)

  logger.info("=== 1. ENABLING REQUIRES_ADMIN_APPROVAL ON COMPANY ===")

  // 1. Get company and customer
  const { data: companies } = await query.graph({
    entity: "company",
    fields: [
      "id",
      "name",
      "approval_settings.id",
      "approval_settings.requires_admin_approval",
      "employees.customer.id",
      "employees.customer.email",
    ],
  })

  const company = companies[0]
  if (!company) {
    throw new Error("No company found")
  }

  logger.info(`Found company: ${company.name} (${company.id})`)

  // Update approval settings to requires_admin_approval: true
  if (company.approval_settings?.id) {
    await updateApprovalSettingsWorkflow(container).run({
      input: {
        id: company.approval_settings.id,
        requires_admin_approval: true,
      },
    })
    logger.info("Updated approval_settings: requires_admin_approval = true")
  }

  // 2. Customer
  const customerId = company.employees?.[0]?.customer?.id
  const customerEmail = company.employees?.[0]?.customer?.email
  logger.info(`Using Customer: ${customerEmail} (${customerId})`)

  // 3. Region & Sales channel
  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "currency_code"],
  })
  const region = regions[0]

  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })
  const salesChannel = salesChannels[0]

  const { data: variants } = await query.graph({
    entity: "product_variant",
    fields: ["id", "title"],
  })
  const variant1 = variants[0]
  const variant2 = variants[1]

  logger.info("=== 2. CREATING DEMO CART FOR APPROVAL ===")

  // 4. Create Cart
  const { result: cart } = await createCartWorkflow(container).run({
    input: {
      region_id: region.id,
      sales_channel_id: salesChannel.id,
      currency_code: region.currency_code,
      customer_id: customerId,
      email: customerEmail ?? undefined,
      shipping_address: {
        first_name: "Dani",
        last_name: "Tse",
        address_1: "Bole Road, Office 401",
        city: "Addis Ababa",
        country_code: "et",
        postal_code: "1000",
        phone: "+251911223344",
      },
      metadata: {
        company_id: company.id,
      },
    },
  })
  logger.info(`Created Cart: ${cart.id}`)

  // Link cart to company
  try {
    await link.create({
      [COMPANY_MODULE]: { company_id: company.id },
      [Modules.CART]: { cart_id: cart.id },
    })
    logger.info("Linked cart to company")
  } catch {
    logger.info("Cart already linked to company")
  }

  // 5. Add items to cart
  await addToCartWorkflow(container).run({
    input: {
      cart_id: cart.id,
      items: [
        { variant_id: variant1.id, quantity: 2 },
        { variant_id: variant2.id, quantity: 1 },
      ],
    },
  })
  logger.info(`Added items to cart: ${variant1.title}, ${variant2.title}`)

  // 6. Add shipping method
  const { result: shippingOptions } = await listShippingOptionsForCartWorkflow(container).run({
    input: { cart_id: cart.id, is_return: false },
  })
  if (shippingOptions.length > 0) {
    await addShippingMethodToCartWorkflow(container).run({
      input: {
        cart_id: cart.id,
        options: [{ id: shippingOptions[0].id }],
      },
    })
    logger.info(`Added shipping option: ${shippingOptions[0].name}`)
  }

  // 7. Create Pending Approval for Cart
  logger.info("=== 3. CREATING PENDING APPROVAL REQUEST ===")
  const { result: approvalResult } = await createApprovalsWorkflow(container).run({
    input: {
      cart_id: cart.id,
      type: ApprovalType.ADMIN,
      status: ApprovalStatusType.PENDING,
      created_by: customerId,
    } as any,
  })
  logger.info(`Approval created: ${JSON.stringify(approvalResult)}`)

  // 8. Verify the approvals endpoint query logic
  const { data: [companyWithCarts] } = await query.graph({
    entity: "company",
    fields: [
      "id",
      "name",
      "carts.id",
      "carts.total",
      "carts.approval_status.status",
      "carts.approvals.id",
      "carts.approvals.status",
      "carts.approvals.type",
    ],
    filters: { id: company.id },
  })

  logger.info(`Company Carts with Approvals: ${JSON.stringify(companyWithCarts, null, 2)}`)
  logger.info("=== DEMO APPROVAL SETUP COMPLETED SUCCESSFULLY ===")
}
