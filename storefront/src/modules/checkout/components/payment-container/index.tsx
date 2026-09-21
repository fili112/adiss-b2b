import { isManual } from "@/lib/constants"
import PaymentTest from "@/modules/checkout/components/payment-test"
import Divider from "@/modules/common/components/divider"
import Radio from "@/modules/common/components/radio"
import { RadioGroup } from "@headlessui/react"
import { Text, clx } from "@medusajs/ui"
import React, { type JSX } from "react"

type PaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<
    string,
    { title: string; subtitle?: string; badge?: string; icon: JSX.Element }
  >
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
}) => {
  const isDevelopment = process.env.NODE_ENV === "development"
  const info = paymentInfoMap[paymentProviderId] || {
    title: paymentProviderId,
  }

  return (
    <>
      <RadioGroup.Option
        key={paymentProviderId}
        value={paymentProviderId}
        disabled={disabled}
        className={clx(
          "flex flex-col gap-y-2 text-small-regular cursor-pointer py-3 px-4 rounded-md border transition-all my-1.5",
          {
            "border-ui-border-interactive bg-ui-bg-subtle-hover shadow-borders-interactive-with-active":
              selectedPaymentOptionId === paymentProviderId,
            "border-ui-border-base hover:bg-ui-bg-field-hover":
              selectedPaymentOptionId !== paymentProviderId,
          }
        )}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-3">
            <Radio checked={selectedPaymentOptionId === paymentProviderId} />
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <Text className="font-medium text-ui-fg-base">
                  {info.title}
                </Text>
                {info.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {info.badge}
                  </span>
                )}
              </div>
              {info.subtitle && (
                <Text className="text-xs text-ui-fg-subtle mt-0.5">
                  {info.subtitle}
                </Text>
              )}
            </div>
            {isManual(paymentProviderId) && isDevelopment && (
              <PaymentTest className="hidden small:block" />
            )}
          </div>
          <span className="justify-self-end text-ui-fg-base">
            {info.icon}
          </span>
        </div>
        {isManual(paymentProviderId) && isDevelopment && (
          <PaymentTest className="small:hidden text-[10px]" />
        )}
      </RadioGroup.Option>
      <Divider />
    </>
  )
}

export default PaymentContainer
