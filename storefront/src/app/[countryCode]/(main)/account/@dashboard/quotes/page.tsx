import { fetchQuotes } from "@/lib/data/quotes"
import { Heading } from "@medusajs/ui"
import QuotesOverview from "./components/quotes-overview"

export default async function Quotes() {
  const data = await fetchQuotes().catch(() => null)
  const quotes = data?.quotes || []

  return (
    <div className="w-full" data-testid="quotes-page-wrapper">
      <div className="mb-4">
        <Heading>Quotes</Heading>
      </div>

      <div>
        <QuotesOverview quotes={quotes} />
      </div>
    </div>
  )
}
