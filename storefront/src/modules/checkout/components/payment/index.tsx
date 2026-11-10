"use client"

import { isStripeLike, paymentInfoMap } from "@/lib/constants"
import { initiatePaymentSession } from "@/lib/data/cart"
import ErrorMessage from "@/modules/checkout/components/error-message"
import PaymentContainer from "@/modules/checkout/components/payment-container"
import PaymentVerification from "@/modules/checkout/components/payment-verification"
import { StripeContext } from "@/modules/checkout/components/payment-wrapper"
import Button from "@/modules/common/components/button"
import Divider from "@/modules/common/components/divider"
import { ApprovalStatusType } from "@/types"
import { RadioGroup } from "@headlessui/react"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Container, Heading, Text, clx } from "@medusajs/ui"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id || "pp_telebirr"
  )

  const isEthiopianTransfer =
    selectedPaymentMethod === "pp_telebirr" ||
    selectedPaymentMethod === "pp_cbe" ||
    selectedPaymentMethod === "telebirr" ||
    selectedPaymentMethod === "cbe"

  const [localVerificationStatus, setLocalVerificationStatus] = useState(
    Boolean(
      cart?.metadata?.payment_verified &&
        cart?.metadata?.payment_transaction_id &&
        cart?.metadata?.payment_provider === selectedPaymentMethod
    )
  )

  useEffect(() => {
    const isVerifiedForMethod = Boolean(
      cart?.metadata?.payment_verified &&
        cart?.metadata?.payment_transaction_id &&
        cart?.metadata?.payment_provider === selectedPaymentMethod
    )
    setLocalVerificationStatus(isVerifiedForMethod)
  }, [selectedPaymentMethod, cart?.metadata])

  const displayPaymentMethods = useMemo(() => {
    const defaultB2BMethods = [
      { id: "pp_telebirr" },
      { id: "pp_cbe" },
      { id: "pp_system_default" },
      { id: "pp_cod" },
    ]

    const methodMap = new Map<string, any>()
    defaultB2BMethods.forEach((m) => methodMap.set(m.id, m))
    if (availablePaymentMethods && availablePaymentMethods.length > 0) {
      availablePaymentMethods.forEach((m: any) => methodMap.set(m.id, m))
    }
    return Array.from(methodMap.values())
  }, [availablePaymentMethods])

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const cartApprovalStatus = cart.approval_status?.status

  const stripeReady = useContext(StripeContext)

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          "::placeholder": {
            color: "rgb(107 114 128)",
          },
        },
      },
      classes: {
        base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover transition-all duration-300 ease-in-out",
      },
    }
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeLike(selectedPaymentMethod) && !activeSession

      const backendProviderId =
        availablePaymentMethods?.find((m: any) => m.id === selectedPaymentMethod)?.id ||
        availablePaymentMethods?.[0]?.id ||
        "pp_system_default"

      if (
        !activeSession ||
        activeSession.provider_id !== selectedPaymentMethod
      ) {
        await initiatePaymentSession(cart, {
          provider_id: backendProviderId,
        }).catch(() => {
          return initiatePaymentSession(cart, {
            provider_id: "pp_system_default",
          })
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <Container>
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row items-center justify-between w-full">
          <Heading
            level="h2"
            className={clx("flex flex-row text-xl gap-x-2 items-center", {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            })}
          >
            Payment Method
            {!isOpen && paymentReady && <CheckCircleSolid />}
          </Heading>
          {!isOpen &&
            paymentReady &&
            cartApprovalStatus !== ApprovalStatusType.PENDING && (
              <Text>
                <button
                  onClick={handleEdit}
                  className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
                  data-testid="edit-payment-button"
                >
                  Edit
                </button>
              </Text>
            )}
        </div>
        {(isOpen || (cart && paymentReady && activeSession)) && <Divider />}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && displayPaymentMethods?.length > 0 && (
            <>
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setSelectedPaymentMethod(value)}
              >
                {displayPaymentMethods.map((paymentMethod) => {
                  return (
                    <PaymentContainer
                      paymentInfoMap={paymentInfoMap}
                      paymentProviderId={paymentMethod.id}
                      key={paymentMethod.id}
                      selectedPaymentOptionId={selectedPaymentMethod}
                    />
                  )
                })}
              </RadioGroup>
              {isEthiopianTransfer && (
                <PaymentVerification
                  cart={cart}
                  selectedMethod={selectedPaymentMethod}
                  onVerificationChange={(v) => {
                    setLocalVerificationStatus(v)
                    if (v) {
                      setError(null)
                    }
                  }}
                />
              )}

              {stripeReady && selectedPaymentMethod === "pp_stripe_stripe" && (
                <div className="mt-5 transition-all duration-150 ease-in-out">
                  <Text className="txt-medium-plus text-ui-fg-base mb-1">
                    Enter your card details:
                  </Text>

                  <CardElement
                    options={useOptions as StripeCardElementOptions}
                    onChange={(e) => {
                      setCardBrand(
                        e.brand &&
                          e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                      )
                      setError(e.error?.message || null)
                      setCardComplete(e.complete)
                    }}
                  />
                </div>
              )}
            </>
          )}

          {paidByGiftcard && (
            <div className="flex flex-col w-1/3">
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          )}

          <div className="flex flex-col gap-y-2 items-end">
            <ErrorMessage
              error={error}
              data-testid="payment-method-error-message"
            />

            <Button
              size="large"
              className="mt-6"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={
                (selectedPaymentMethod === "pp_stripe_stripe" &&
                  !cardComplete) ||
                (!selectedPaymentMethod && !paidByGiftcard) ||
                (isEthiopianTransfer && !localVerificationStatus)
              }
              data-testid="submit-payment-button"
            >
              {!activeSession && isStripeLike(selectedPaymentMethod)
                ? " Enter card details"
                : isEthiopianTransfer && !localVerificationStatus
                ? "Verify payment with Verify.et to continue"
                : "Next step"}
            </Button>
          </div>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex flex-col gap-y-2 w-full pt-2">
              <div className="flex items-center gap-x-1 w-full">
                <div className="flex flex-col w-1/3">
                  <Text
                    className="txt-medium text-ui-fg-subtle"
                    data-testid="payment-method-summary"
                  >
                    {paymentInfoMap[selectedPaymentMethod]?.title ||
                      selectedPaymentMethod}
                  </Text>
                </div>
                <div className="flex flex-col w-1/3">
                  <div
                    className="flex gap-2 txt-medium text-ui-fg-subtle items-center"
                    data-testid="payment-details-summary"
                  >
                    <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                      {paymentInfoMap[selectedPaymentMethod]?.icon || (
                        <CreditCard />
                      )}
                    </Container>
                    <Text>
                      {isStripeLike(selectedPaymentMethod) && cardBrand
                        ? cardBrand
                        : paymentInfoMap[selectedPaymentMethod]?.title}
                    </Text>
                  </div>
                </div>
              </div>

              {cart?.metadata?.payment_verified && (
                <div className="flex items-center gap-x-2 text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-lg w-fit mt-1">
                  <CheckCircleSolid className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    Verified via <strong>verify.et</strong> • Ref:{" "}
                    <strong className="font-mono">
                      {cart.metadata.payment_transaction_id}
                    </strong>
                    {cart.metadata.payment_verified_amount && (
                      <>
                        {" "}
                        (Br{" "}
                        {Number(
                          cart.metadata.payment_verified_amount
                        ).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        ETB)
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment method
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  )
}

export default Payment
