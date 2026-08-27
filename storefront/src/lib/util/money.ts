import { isEmpty } from "@/lib/util/isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits = 2,
  maximumFractionDigits,
  locale = "en-ET",
}: ConvertToLocaleParams) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "ETB", // Force ETB regardless of input
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)
}
