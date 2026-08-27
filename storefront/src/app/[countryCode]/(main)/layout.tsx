import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import { listCartFreeShippingPrices } from "@/lib/data/fulfillment"
import { getBaseURL } from "@/lib/util/env"
import CartMismatchBanner from "@/modules/layout/components/cart-mismatch-banner"
import Footer from "@/modules/layout/templates/footer"
import { NavigationHeader } from "@/modules/layout/templates/nav"
import FreeShippingPriceNudge from "@/modules/shipping/components/free-shipping-price-nudge"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"
import { ArrowUpRightMini, ExclamationCircleSolid } from "@medusajs/icons"
import { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer().catch(() => null)
  const cart = await retrieveCart()
  let freeShippingPrices: StoreFreeShippingPrice[] = []

  if (cart) {
    freeShippingPrices = await listCartFreeShippingPrices(cart.id)
  }

  return (
    <>
      <NavigationHeader />
      <div className="flex items-center text-neutral-50 justify-between small:px-8 px-4 py-2 bg-neutral-900 text-xs tracking-wide">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-700 text-white">
            🇪🇹 ETHIOPIA B2B
          </span>
          <span className="hidden small:inline text-neutral-300">
            Wholesale Distributor Portal • Addis Ababa & Nationwide Direct Delivery • Official ETB Invoicing
          </span>
        </div>
        <div className="flex items-center gap-4 text-neutral-300">
          <span className="hidden md:inline">
            Wholesale Support: <a href="tel:+251911234567" className="text-white hover:underline font-medium">+251 91 123 4567</a>
          </span>
          <span className="hidden lg:inline text-neutral-400">|</span>
          <span className="hidden lg:inline text-neutral-400">Mon - Sat: 8:30 AM - 5:30 PM EAT</span>
        </div>
      </div>

      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {props.children}

      <Footer />

      {cart && freeShippingPrices && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          freeShippingPrices={freeShippingPrices}
        />
      )}
    </>
  )
}
