import { listCategories } from "@/lib/data/categories"
import { listCollections } from "@/lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@/modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    offset: "0",
    limit: "6",
  })
  const product_categories = await listCategories({
    offset: 0,
    limit: 6,
  })

  return (
    <footer className="border-t border-ui-border-base w-full bg-white text-neutral-800">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 lg:flex-row items-start justify-between py-16">
          <div className="flex flex-col max-w-sm">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                AB
              </span>
              <div className="flex flex-col">
                <span className="text-base font-bold text-neutral-900 leading-tight">
                  Addis B2B Wholesale
                </span>
                <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">
                  Ethiopia Corporate Commerce
                </span>
              </div>
            </LocalizedClientLink>
            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              Ethiopia&apos;s centralized digital platform for wholesale supply, bulk quoting, and direct enterprise distribution. Fully integrated with ETB invoicing, VAT & TIN compliance.
            </p>
            <div className="text-xs text-neutral-700 space-y-1 border-l-2 border-emerald-600 pl-3">
              <p className="font-semibold text-neutral-900">Addis Ababa Head Office:</p>
              <p>Bole Sub-City, Kazanchis Business District</p>
              <p>Addis Ababa, Ethiopia</p>
              <p className="text-emerald-800 font-medium pt-1">
                Tel: +251 11 667 8900 / +251 91 123 4567
              </p>
            </div>
          </div>

          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3 w-full lg:w-auto">
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base font-semibold">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return null
                    }

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className="hover:text-emerald-700 transition-colors"
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base font-semibold">
                  Wholesale Collections
                </span>
                <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small">
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-emerald-700 transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base font-semibold">
                B2B Services
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="hover:text-emerald-700 transition-colors"
                  >
                    Wholesale Catalog
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="hover:text-emerald-700 transition-colors"
                  >
                    Corporate Portal
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="hover:text-emerald-700 transition-colors"
                  >
                    Request Quotation (RFQ)
                  </LocalizedClientLink>
                </li>
                <li>
                  <span className="text-emerald-700 font-medium">
                    Accepted Payments:
                  </span>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Telebirr • CBE Birr • Bank Wire • Net 30 Invoicing
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full py-6 border-t border-neutral-200 justify-between items-center gap-4 text-ui-fg-muted">
          <Text className="txt-compact-small text-neutral-600">
            © {new Date().getFullYear()} Addis B2B Wholesale PLC. Registered in Addis Ababa, Ethiopia. All rights reserved.
          </Text>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span>🇪🇹 Official ETB Pricing</span>
            <span>•</span>
            <span>VAT & TIN Invoice Ready</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
