import { ExecArgs, ITaxModuleService } from "@medusajs/framework/types"
import { ModuleRegistrationName } from "@medusajs/framework/utils"

const SYSTEM_TAX_PROVIDER_ID = "tp_system"

export default async function fixRegionTaxes({ container }: ExecArgs) {
  const logger = container.resolve("logger")
  const taxModuleService: ITaxModuleService = container.resolve(
    ModuleRegistrationName.TAX
  )

  const taxRegions = await taxModuleService.listTaxRegions({
    province_code: undefined,
  })

  logger.info(`Found ${taxRegions.length} top-level tax region(s).`)

  for (const taxRegion of taxRegions) {
    if (taxRegion.provider_id === SYSTEM_TAX_PROVIDER_ID) {
      logger.info(
        `Tax region ${taxRegion.id} (${taxRegion.country_code}) already uses ${SYSTEM_TAX_PROVIDER_ID}.`
      )
      continue
    }

    logger.info(
      `Setting tax provider on ${taxRegion.id} (${taxRegion.country_code}) from ${taxRegion.provider_id ?? "null"} to ${SYSTEM_TAX_PROVIDER_ID}.`
    )

    await taxModuleService.updateTaxRegions({
      id: taxRegion.id,
      provider_id: SYSTEM_TAX_PROVIDER_ID,
    })
  }

  logger.info("Done. Tax regions now use the system tax provider.")
}
