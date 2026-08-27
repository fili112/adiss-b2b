import { model } from "@medusajs/framework/utils"

export const LoyaltyPoint = model.define("loyalty_point", {
  id: model.id().primaryKey(),
  company_id: model.text(),
  points: model.number().default(0),
  tier: model.text().default("Bronze"),
})
