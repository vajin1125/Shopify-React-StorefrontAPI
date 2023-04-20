import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const useProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchInput, setSearchInput] = useState<string>(() => {
    const title = searchParams.get("title")
    if (title) {
      return title
    }
    const tags = searchParams.getAll("tags")
    return tags.map((tag) => `#${tag}`).join(" ")
  })

  const tags = searchParams.getAll("tags")
  const categories = searchParams.getAll("categories")
  const title = searchParams.get("title") || ""

  const onChangeSearchInput = useCallback((searchQuery: string) => {
    setSearchInput(searchQuery)
  }, [])

  const onSelectCategories = (newCategories: string[]) => {
    searchParams.delete("categories")
    searchParams.delete("tags")
    newCategories.forEach((category) => searchParams.append("categories", category))
    setSearchParams(searchParams)
  }

  const onDeleteCategoryChip = (chip: string) => {
    const cats = categories.filter((c) => c !== chip)
    searchParams.delete("categories")
    cats.forEach((category) => searchParams.append("categories", category))
    setSearchParams(searchParams)
  }

  const onDeleteTagChip = (tag: string) => {
    onChangeSearchInput(
      tags
        .filter((t) => t !== tag)
        .map((t) => `#${t}`)
        .join(" ")
    )
  }

  const reset = () => {
    setSearchParams({})
  }

  const getFilterBySearchInput = (searchInput: string): string | string[] => {
    if (searchInput[0] === "#") {
      if (searchInput.length > 1) {
        const tags = searchInput
          .slice(1)
          .split("#")
          .map((tag) => tag.trim())
        return tags
      } else {
        return []
      }
    } else {
      return searchInput
    }
  }

  useEffect(() => {
    const option = getFilterBySearchInput(searchInput)
    if (Array.isArray(option)) {
      searchParams.delete("title")
      searchParams.delete("categories")
      searchParams.delete("tags")
      option.map((tag) => searchParams.append("tags", tag))
      setSearchParams(searchParams)
    } else {
      if (location.pathname === "/search") {
        searchParams.delete("tags")
        searchParams.set("title", option)
        setSearchParams(searchParams)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  return {
    searchInput,
    searchParams,
    title,
    tags,
    categories,
    reset,
    onChangeSearchInput,
    onSelectCategories,
    onDeleteCategoryChip,
    onDeleteTagChip,
  }
}
