import Bancontact from "@/modules/common/icons/bancontact"
import FilePlus from "@/modules/common/icons/file-plus"
import Ideal from "@/modules/common/icons/ideal"
import PayPal from "@/modules/common/icons/paypal"
import { CreditCard } from "@medusajs/icons"
import React from "react"

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; subtitle?: string; badge?: string; icon: React.JSX.Element }
> = {
  pp_telebirr: {
    title: "Telebirr Mobile Money",
    subtitle: "Instant payment via Ethio Telecom Telebirr",
    badge: "Most Popular",
    icon: <CreditCard />,
  },
  pp_cbe: {
    title: "CBE Birr / Bank Transfer",
    subtitle: "Commercial Bank of Ethiopia Direct Deposit",
    icon: <CreditCard />,
  },
  pp_system_default: {
    title: "Corporate Invoice (Net 30)",
    subtitle: "Official VAT Proforma with 30-day settlement terms",
    badge: "B2B Credit",
    icon: <FilePlus />,
  },
  pp_cod: {
    title: "Cash on Delivery",
    subtitle: "Pay on delivery across Addis Ababa metropolitan area",
    icon: <CreditCard />,
  },
  pp_stripe_stripe: {
    title: "Credit card",
    icon: <CreditCard />,
  },
  "pp_medusa-payments_default": {
    title: "Credit card",
    icon: <CreditCard />,
  },
  "pp_stripe-ideal_stripe": {
    title: "iDeal",
    icon: <Ideal />,
  },
  "pp_stripe-bancontact_stripe": {
    title: "Bancontact",
    icon: <Bancontact />,
  },
  pp_paypal_paypal: {
    title: "PayPal",
    icon: <PayPal />,
  },
  telebirr: {
    title: "Telebirr Mobile Money",
    subtitle: "Instant payment via Ethio Telecom Telebirr",
    badge: "Most Popular",
    icon: <CreditCard />,
  },
  cbe: {
    title: "CBE Birr / Bank Transfer",
    subtitle: "Commercial Bank of Ethiopia Direct Deposit",
    icon: <CreditCard />,
  },
}

// This only checks if it is native stripe or medusa payments for card payments, it ignores the other stripe-based providers
export const isStripeLike = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_stripe") ||
    providerId?.startsWith("pp_medusa-payments")
  )
}
export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal")
}
export const isManual = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_system_default") ||
    providerId?.startsWith("pp_telebirr") ||
    providerId?.startsWith("telebirr") ||
    providerId?.startsWith("manual")
  )
}

export const currencySymbolMap: Record<string, string> = {
  etb: "ETB ",
  usd: "$",
  eur: "€",
  gbp: "£",
  cad: "C$",
  aud: "A$",
  jpy: "¥",
  cny: "¥",
  chf: "CHF",
  hkd: "HK$",
  nzd: "NZ$",
  sek: "kr",
  krw: "₩",
  sgd: "S$",
  nok: "kr",
  mxn: "$",
  inr: "₹",
  rub: "₽",
  zar: "R",
  try: "₺",
  brl: "R$",
  twd: "NT$",
  dkk: "kr",
  pln: "zł",
  thb: "฿",
  idr: "Rp",
  huf: "Ft",
  czk: "Kč",
  ils: "₪",
  clp: "$",
  php: "₱",
  aed: "د.إ",
  cop: "$",
  sar: "﷼",
  myr: "RM",
  ron: "lei",
  vnd: "₫",
  egp: "£",
  pkr: "₨",
  ngn: "₦",
  bdt: "৳",
  uah: "₴",
  kes: "KSh",
  ars: "$",
  qar: "﷼",
  kwd: "د.ك",
  omr: "﷼",
  bhd: "ب.د",
  lkr: "₨",
  mmk: "K",
  uzs: "лв",
}
