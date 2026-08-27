import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const logger = req.scope.resolve("logger")
  logger.info("Received Telebirr payment webhook")
  
  // In a real integration, you would verify the signature,
  // extract the payment intent ID, and capture the payment using the payment module.
  const payload = req.body

  res.status(200).json({ received: true })
}
