import { listProductsWithSort } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import ProductPreview from "@/modules/products/components/product-preview"
import { Pagination } from "@/modules/store/components/pagination"
import { SortOptions } from "@/modules/store/components/refinement-list/sort-products"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { B2BCustomer } from "@/types"
import { Container } from "@medusajs/ui"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  customer_group_id?: string
  q?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  customer,
  searchQuery,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  customer?: B2BCustomer | null
  searchQuery?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  } else if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  if (searchQuery) {
    queryParams["q"] = searchQuery
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  // Client-side fallback filter if Medusa backend does not apply text matching on q directly
  if (searchQuery && products.length === 0) {
    const allProductsResult = await listProductsWithSort({
      page: 1,
      queryParams: { limit: 100 },
      sortBy,
      countryCode,
    })
    const queryLower = searchQuery.toLowerCase()
    const matching = allProductsResult.response.products.filter((p) =>
      p.title?.toLowerCase().includes(queryLower) ||
      p.description?.toLowerCase().includes(queryLower) ||
      p.handle?.toLowerCase().includes(queryLower)
    )
    if (matching.length > 0) {
      products = matching.slice((page - 1) * PRODUCT_LIMIT, page * PRODUCT_LIMIT)
      count = matching.length
    }
  }

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <div className="flex flex-col w-full gap-4">
      {searchQuery && (
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-neutral-200 text-xs text-neutral-700 shadow-xs">
          <span>
            Search results for <strong className="text-neutral-950 font-bold">&ldquo;{searchQuery}&rdquo;</strong>{" "}
            <span className="text-neutral-500">({count} product{count === 1 ? "" : "s"} found)</span>
          </span>
          <LocalizedClientLink
            href="/store"
            className="text-emerald-700 hover:text-emerald-800 font-semibold underline"
          >
            Clear Search
          </LocalizedClientLink>
        </div>
      )}

      <ul
        className="grid grid-cols-1 w-full small:grid-cols-3 medium:grid-cols-4 gap-3"
        data-testid="products-list"
      >
        {products.length > 0 ? (
          products.map((p) => {
            return (
              <li key={p.id}>
                <ProductPreview product={p} region={region} />
              </li>
            )
          })
        ) : (
          <Container className="text-center text-sm text-neutral-500 col-span-full py-12">
            {searchQuery
              ? `No products found matching "${searchQuery}". Try searching with different keywords.`
              : "No products found for this category."}
          </Container>
        )}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}
