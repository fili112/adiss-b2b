"use client"

import React, { useState } from "react"
import { Text, Input, clx } from "@medusajs/ui"
import { CheckCircleSolid, ExclamationCircle, InformationCircleSolid } from "@medusajs/icons"
import { verifyPaymentTransaction, clearPaymentVerification } from "@/lib/data/verify-payment"
import Spinner from "@/modules/common/icons/spinner"

type PaymentVerificationProps = {
  cart: any
  selectedMethod: string
  onVerificationChange?: (verified: boolean) => void
}

const PaymentVerification: React.FC<PaymentVerificationProps> = ({
  cart,
  selectedMethod,
  onVerificationChange,
}) => {
  const isTelebirr =
    selectedMethod === "pp_telebirr" || selectedMethod === "telebirr"
  const isCbe = selectedMethod === "pp_cbe" || selectedMethod === "cbe"

  const existingMeta = cart?.metadata || {}
  const alreadyVerified = Boolean(
    existingMeta?.payment_verified &&
      existingMeta?.payment_transaction_id &&
      existingMeta?.payment_provider === selectedMethod
  )

  const [transactionId, setTransactionId] = useState(
    alreadyVerified ? existingMeta.payment_transaction_id : ""
  )
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verifiedData, setVerifiedData] = useState<any>(
    alreadyVerified
      ? {
          transactionId: existingMeta.payment_transaction_id,
          amount: existingMeta.payment_verified_amount || cart?.total,
          verifiedAt: existingMeta.payment_verified_at,
          receiver: existingMeta.payment_receiver,
          status: "CONFIRMED",
        }
      : null
  )
  const [copied, setCopied] = useState(false)

  if (!isTelebirr && !isCbe) {
    return null
  }

  const accountDetails = isTelebirr
    ? {
        bankName: "Ethio Telecom Telebirr",
        accountLabel: "Telebirr Merchant Phone",
        accountNumber: "+251911234567",
        displayNumber: "+251 91 123 4567",
        accountName: "Addis B2B Wholesale Distribution",
        hint: "Open your Telebirr app, send money to this phone number, and paste the Transaction ID from the confirmation SMS.",
        placeholder: "e.g. TLB2490182394",
        badgeBg: "bg-amber-500/10 text-amber-700 border-amber-300",
      }
    : {
        bankName: "Commercial Bank of Ethiopia (CBE)",
        accountLabel: "CBE Account Number",
        accountNumber: "1000482919283",
        displayNumber: "1000 4829 19283",
        accountName: "Addis B2B Technology & Logistics PLC",
        hint: "Transfer via CBE Mobile Banking / CBE Birr to this account, then enter the FT... reference from your receipt.",
        placeholder: "e.g. FT240129384910",
        badgeBg: "bg-purple-500/10 text-purple-700 border-purple-300",
      }

  const handleCopy = () => {
    navigator.clipboard.writeText(accountDetails.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVerify = async () => {
    if (!transactionId || transactionId.trim().length < 6) {
      setError("Please enter a valid Transaction ID or Receipt Reference.")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      const res = await verifyPaymentTransaction({
        cartId: cart.id,
        transactionId: transactionId.trim(),
        provider: selectedMethod,
        expectedAmount: cart.total,
      })

      if (res.success && res.details) {
        setVerifiedData(res.details)
        if (onVerificationChange) {
          onVerificationChange(true)
        }
      } else {
        setError(res.message || "Failed to verify transaction.")
        if (onVerificationChange) {
          onVerificationChange(false)
        }
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected verification error occurred.")
      if (onVerificationChange) {
        onVerificationChange(false)
      }
    } finally {
      setIsVerifying(false)
    }
  }

  const handleReset = async () => {
    setIsVerifying(true)
    try {
      await clearPaymentVerification(cart.id)
      setVerifiedData(null)
      setTransactionId("")
      setError(null)
      if (onVerificationChange) {
        onVerificationChange(false)
      }
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="mt-4 p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 flex flex-col gap-y-3.5 transition-all">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <Text className="text-xs font-semibold tracking-wide text-emerald-800 dark:text-emerald-300 uppercase">
            Official Payment Destination • Verified via Verify.et
          </Text>
        </div>
        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-white dark:bg-neutral-800 border border-emerald-200 text-emerald-700">
          Real-time API Rail
        </span>
      </div>

      {/* Account Info Box */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3.5 flex flex-col gap-y-2">
        <div className="flex justify-between items-start gap-x-2">
          <div>
            <Text className="text-xs text-neutral-500 font-medium">
              {accountDetails.bankName}
            </Text>
            <div className="flex items-center gap-x-2 mt-0.5">
              <span className="font-mono text-base font-bold text-neutral-900 dark:text-white tracking-wider">
                {accountDetails.displayNumber}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs px-2 py-0.5 rounded border border-neutral-300 hover:bg-neutral-100 text-neutral-700 transition"
              >
                {copied ? "Copied! ✓" : "Copy"}
              </button>
            </div>
            <Text className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              Account Name: <strong className="text-neutral-800 dark:text-neutral-200">{accountDetails.accountName}</strong>
            </Text>
          </div>

          <div className="text-right">
            <Text className="text-xs text-neutral-500 font-medium">Payable Total</Text>
            <Text className="text-base font-bold text-emerald-700 dark:text-emerald-400">
              Br {Number(cart?.total || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </Text>
          </div>
        </div>

        <div className="flex items-start gap-x-1.5 pt-1 border-t border-neutral-100 dark:border-neutral-800">
          <InformationCircleSolid className="text-blue-500 w-4 h-4 mt-0.5 flex-shrink-0" />
          <Text className="text-[11px] text-neutral-500">
            {accountDetails.hint}
          </Text>
        </div>
      </div>

      {/* Verification State */}
      {verifiedData ? (
        <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-lg p-3.5 flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2 text-emerald-700 dark:text-emerald-300 font-semibold text-sm">
              <CheckCircleSolid className="w-5 h-5 text-emerald-600" />
              <span>Payment Verified via Verify.et</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-full">
              Matched & Confirmed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-neutral-700 dark:text-neutral-300">
            <div>
              <span className="text-neutral-500">Reference: </span>
              <strong className="font-mono">{verifiedData.transactionId}</strong>
            </div>
            <div>
              <span className="text-neutral-500">Amount: </span>
              <strong className="text-emerald-700 dark:text-emerald-400">
                Br {Number(verifiedData.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })} ETB
              </strong>
            </div>
            <div>
              <span className="text-neutral-500">Receiver: </span>
              <span>{verifiedData.receiver}</span>
            </div>
            <div>
              <span className="text-neutral-500">Verified at: </span>
              <span>
                {verifiedData.verifiedAt
                  ? new Date(verifiedData.verifiedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Just now"}
              </span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              disabled={isVerifying}
              className="text-xs text-neutral-500 hover:text-neutral-800 underline transition"
            >
              Change Transaction ID
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-2">
          <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
            <span>Enter Transaction ID / Receipt Reference:</span>
            <span className="text-[11px] text-neutral-500">Checked via verify.et</span>
          </label>

          <div className="flex gap-x-2">
            <input
              type="text"
              value={transactionId}
              onChange={(e) => {
                setTransactionId(e.target.value)
                setError(null)
              }}
              placeholder={accountDetails.placeholder}
              className="flex-1 uppercase font-mono text-sm px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              disabled={isVerifying}
            />

            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying || !transactionId}
              className={clx(
                "px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-x-1.5 shadow-sm",
                {
                  "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer":
                    !isVerifying && transactionId,
                  "bg-neutral-300 text-neutral-500 cursor-not-allowed":
                    isVerifying || !transactionId,
                }
              )}
            >
              {isVerifying ? (
                <>
                  <Spinner className="w-4 h-4 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <span>Verify with Verify.et</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-x-1.5 text-rose-600 text-xs mt-1 bg-rose-50 dark:bg-rose-950/30 p-2 rounded border border-rose-200">
              <ExclamationCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PaymentVerification

