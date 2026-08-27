"use client"

import { Heading } from "@medusajs/ui"
import Button from "@/modules/common/components/button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 text-white min-h-[520px] flex items-center shadow-lg">
      <Image
        src="/hero-image.jpg"
        alt="Ethiopian B2B Wholesale Market"
        fill
        className="object-cover opacity-25"
        priority
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 sm:py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
          <span>🇪🇹 Ethiopia&apos;s B2B Wholesale Marketplace</span>
          <span className="text-neutral-400">•</span>
          <span>የጅምላ ንግድ መድረክ</span>
        </div>

        <Heading
          level="h1"
          className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight sm:leading-none mb-6"
        >
          Direct Wholesale Sourcing for Ethiopian Enterprises & Retailers
        </Heading>

        <p className="text-neutral-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed mb-8">
          Streamline corporate procurement with official ETB tax invoices, direct distributor pricing tiers, instant bulk quote negotiations, and fast delivery across Addis Ababa and all regional hubs.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <LocalizedClientLink href="/store" className="w-full sm:w-auto">
            <Button
              variant="primary"
              className="w-full sm:w-auto px-8 h-12 rounded-xl text-base font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md border-none transition-all"
            >
              Browse Wholesale Catalog
            </Button>
          </LocalizedClientLink>

          <LocalizedClientLink href="/account" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              className="w-full sm:w-auto px-8 h-12 rounded-xl text-base font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all"
            >
              Corporate Account Login
            </Button>
          </LocalizedClientLink>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10 w-full text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📑</span>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Official ETB Invoicing</p>
              <p className="text-[11px] text-neutral-400">VAT & TIN Compliant</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Addis Express Dispatch</p>
              <p className="text-[11px] text-neutral-400">24h Delivery & Regional Hubs</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">💳</span>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Telebirr & CBE</p>
              <p className="text-[11px] text-neutral-400">Bank Wire & Net 30 Terms</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Tiered Bulk Pricing</p>
              <p className="text-[11px] text-neutral-400">Distributor-Direct Rates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
