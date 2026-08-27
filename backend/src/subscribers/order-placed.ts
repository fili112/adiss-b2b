import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { IOrderModuleService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")
  const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)

  try {
    const order = await orderModuleService.retrieveOrder(data.id, {
      relations: ["items", "summary"],
    })

    logger.info(`[Email Service Mock] Sending order confirmation email for order ${order.id} to ${order.email}`)
    // Here you would integrate with SendGrid, Resend, Nodemailer etc.
  } catch (error) {
    logger.error(`Error sending email for order ${data.id}: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
