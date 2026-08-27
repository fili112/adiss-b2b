import { AbstractPaymentProvider } from "@medusajs/framework/utils"
import { Logger } from "@medusajs/framework/types"
import {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types"

type Options = {
  merchantAppId?: string
  fabricAppId?: string
  appSecret?: string
  merchantCode?: string
}

export default class TelebirrPaymentProvider extends AbstractPaymentProvider<Options> {
  static identifier = "telebirr"

  protected logger_: Logger
  protected options_: Options

  constructor(container: any, options: Options) {
    super(container, options)
    this.logger_ = container.logger
    this.options_ = options || {}
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    this.logger_.info("Capturing Telebirr payment")
    return { data: { ...input.data, status: "captured" } }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    this.logger_.info("Authorizing Telebirr payment")
    return { status: "authorized", data: input.data }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    this.logger_.info("Canceling Telebirr payment")
    return { data: { ...input.data, status: "canceled" } }
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    this.logger_.info("Initiating Telebirr payment")
    const id = "telebirr_session_" + Date.now()
    return {
      id,
      data: {
        id,
        amount: input.amount,
        currency_code: input.currency_code,
      },
    }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    this.logger_.info("Deleting Telebirr payment")
    return { data: input.data }
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    return { status: "authorized" }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    this.logger_.info(`Refunding ${input.amount} via Telebirr`)
    return { data: { ...input.data, status: "refunded" } }
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    return { data: input.data }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    this.logger_.info("Updating Telebirr payment")
    return {
      data: {
        ...input.data,
        amount: input.amount,
      },
    }
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    this.logger_.info("Processing Telebirr webhook")
    // In a real integration, parse the payload and map to a PaymentActions value.
    return {
      action: "authorized",
    }
  }
}
