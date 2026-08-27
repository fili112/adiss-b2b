import { getBaseURL } from "@/lib/util/env"
import { Toaster } from "@medusajs/ui"
import { Analytics } from "@vercel/analytics/next"
import { GeistSans } from "geist/font/sans"
import { Metadata } from "next"
import "@/styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Addis B2B Wholesale | Ethiopia's B2B Commerce Marketplace",
    template: "%s | Addis B2B Wholesale",
  },
  description:
    "Ethiopia's digital wholesale procurement portal. Direct distributor pricing, official ETB tax invoicing (VAT/TIN), custom quotes, and nationwide delivery.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={GeistSans.variable}>
      <body className="bg-corporate-50 text-corporate-900">
        <main className="relative">{props.children}</main>
        <Toaster className="z-[99999]" position="bottom-left" />
        <Analytics />
      </body>
    </html>
  )
}
