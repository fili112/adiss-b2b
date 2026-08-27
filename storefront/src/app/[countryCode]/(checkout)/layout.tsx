import LocalizedClientLink from "@/modules/common/components/localized-client-link"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mb-2 w-full bg-white relative small:min-h-screen">
      <div className="h-16 bg-white border-b border-neutral-200">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink className="hover:text-ui-fg-base flex items-center gap-2" href="/">
            <span className="w-7 h-7 rounded bg-emerald-700 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              AB
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-neutral-900 leading-tight">
                Addis B2B Wholesale
              </span>
              <span className="text-[9px] text-neutral-500 font-semibold uppercase tracking-wider">
                Enterprise Checkout
              </span>
            </div>
          </LocalizedClientLink>
          <div className="flex items-center gap-3 text-xs text-neutral-600 font-medium">
            <span className="hidden sm:inline">🇪🇹 Ethiopian Birr (ETB)</span>
            <span className="hidden sm:inline text-neutral-300">•</span>
            <span className="text-emerald-700 font-semibold">🔒 Secure Commercial Ordering</span>
          </div>
        </nav>
      </div>
      <div className="relative bg-neutral-100" data-testid="checkout-container">
        {children}
      </div>
      <div className="py-6 w-full flex items-center justify-center border-t border-neutral-200 bg-white">
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} Addis B2B Wholesale PLC • Addis Ababa, Ethiopia • Official VAT & Tax Invoice Compliant
        </p>
      </div>
    </div>
  )
}
