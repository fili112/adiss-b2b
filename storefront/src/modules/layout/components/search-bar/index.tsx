"use client"

import { MagnifyingGlassMini, XMark } from "@medusajs/icons"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function SearchBar() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const countryCode = (params?.countryCode as string) || "et"
  
  const currentQ = searchParams?.get("q") || ""
  const [searchTerm, setSearchTerm] = useState(currentQ)

  useEffect(() => {
    setSearchTerm(currentQ)
  }, [currentQ])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchTerm.trim()
    if (trimmed) {
      router.push(`/${countryCode}/store?q=${encodeURIComponent(trimmed)}`)
    } else {
      router.push(`/${countryCode}/store`)
    }
  }

  const handleClear = () => {
    setSearchTerm("")
    if (currentQ) {
      router.push(`/${countryCode}/store`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative hidden small:inline-flex items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products (e.g. Laptop, Webcam)..."
        className="bg-neutral-100 text-neutral-900 text-xs px-3.5 py-2 pl-9 pr-8 rounded-full border border-neutral-200 focus:border-emerald-600 focus:bg-white focus:outline-none transition-all w-60 lg:w-72 shadow-xs"
      />
      <div className="absolute left-3 flex items-center pointer-events-none text-neutral-500">
        <MagnifyingGlassMini className="w-4 h-4" />
      </div>
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 flex items-center text-neutral-400 hover:text-neutral-700"
          title="Clear search"
        >
          <XMark className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  )
}
