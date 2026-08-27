import { MedusaService } from "@medusajs/framework/utils"
import { LoyaltyPoint } from "./models/loyalty-point"

export default class LoyaltyModuleService extends MedusaService({
  LoyaltyPoint,
}) {
  async awardPoints(companyId: string, amount: number) {
    // Logic to increment points for a company
    return { company_id: companyId, points_awarded: amount }
  }

  async redeemPoints(companyId: string, amount: number) {
    // Logic to decrement points
    return { company_id: companyId, points_redeemed: amount }
  }
}
