"use client"

import { MagnifyingGlassMini, XMark } from "@medusajs/icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const SearchInResults = ({ listName }: { listName?: string }) => {
  const placeholder = listName ? `Search in ${listName}...` : "Filter products..."
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentQ = searchParams?.get("q") || ""
  const [value, setValue] = useState(currentQ)

  useEffect(() => {
    setValue(currentQ)
  }, [currentQ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams?.toString() || "")
    if (value.trim()) {
      params.set("q", value.trim())
      params.delete("page") // reset pagination when searching
    } else {
      params.delete("q")
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleClear = () => {
    setValue("")
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.delete("q")
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="group relative text-sm p-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full text-xs p-2 pl-3 pr-8 bg-neutral-50 border border-neutral-200 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-none transition-all"
      />
      {value ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-4 flex items-center text-neutral-400 hover:text-neutral-700"
          title="Clear"
        >
          <XMark className="w-3.5 h-3.5" />
        </button>
      ) : (
        <button
          type="submit"
          className="absolute inset-y-0 right-4 flex items-center text-neutral-400 hover:text-emerald-700"
          title="Search"
        >
          <MagnifyingGlassMini className="w-4 h-4" />
        </button>
      )}
    </form>
  )
}

export default SearchInResults
