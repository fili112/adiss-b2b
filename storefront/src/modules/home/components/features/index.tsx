import React from "react"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"

export default function EthiopiaB2BFeatures() {
  const features = [
    {
      icon: "🏢",
      title: "Corporate & Wholesale Accounts",
      description:
        "Manage multiple branch locations, assign employee purchasing roles, and enforce corporate spending limits.",
      tag: "Enterprise Hierarchy",
    },
    {
      icon: "📑",
      title: "100% Tax Compliant (ETB)",
      description:
        "All transactions are conducted in Ethiopian Birr (ETB) with official commercial invoices and TIN support for Ethiopian tax filing.",
      tag: "Official VAT & TIN",
    },
    {
      icon: "🚚",
      title: "Addis Ababa & Regional Freight",
      description:
        "Express same-day/24-hour fulfillment across Addis Ababa (Bole, Merkato, Kazanchis) plus reliable freight to Hawassa, Adama, Dire Dawa, and Bahir Dar.",
      tag: "Nationwide Logistics",
    },
    {
      icon: "💬",
      title: "Request for Quotes (RFQ)",
      description:
        "Need large volume supply? Submit instant RFQ requests with custom order notes and negotiate pricing directly with suppliers.",
      tag: "Custom Pricing",
    },
  ]

  return (
    <section className="w-full py-12 px-4 sm:px-6 bg-white rounded-2xl border border-neutral-200 my-4 shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Ethiopian Enterprise Trade
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-3">
              Built Specifically for the Ethiopian B2B Ecosystem
            </h2>
          </div>
          <p className="text-neutral-500 text-sm max-w-md mt-2 md:mt-0">
            Tailored workflows that empower Ethiopian importers, wholesale distributors, retailers, and corporate procurement teams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-neutral-50 border border-neutral-200/80 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-xs">
                  {feature.icon}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded">
                  {feature.tag}
                </span>
                <h3 className="text-base font-bold text-neutral-900 mt-2 mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">📞</span>
            <p className="text-xs text-emerald-950 font-medium">
              Have large corporate orders or need custom contract terms? Reach our Addis Ababa wholesale desk at{" "}
              <a href="tel:+251911234567" className="font-bold text-emerald-800 underline">
                +251 91 123 4567
              </a>
            </p>
          </div>
          <LocalizedClientLink
            href="/store"
            className="text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            View Wholesale Inventory →
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
