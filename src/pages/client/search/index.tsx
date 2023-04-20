import React, { ChangeEvent, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@apollo/client"

import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Chip,
  SelectChangeEvent,
  CircularProgress,
  TextField,
} from "src/UILibrary"

import { ProductItem } from "src/components/client/productItem"
import { LoadMore } from "src/components/shared/loadMore"
import { makeQuery } from "src/modules/product"
import { useProductSearch } from "src/hooks/useProductSearch"
import { CATEGORY_ITEMS } from "src/constants/categories"
import { getProductList } from "src/queries/product"
import { IProductSearchItem, IProductsListWithoutCollection } from "src/types/product"
import { Sidebar } from "src/components/client/layout/sidebar"
import { Footer } from "src/components/client/layout/footer"
import { Header } from "src/components/client/layout/header"

export const Search: React.FC = () => {
  const { t } = useTranslation()
  const [data, setData] = useState<IProductSearchItem[]>([])
  const [cursor, setCursor] = useState<string | undefined>(undefined)
  const [hasNext, setHasNext] = useState<boolean>(true)
  const {
    searchInput,
    title,
    tags,
    categories,
    onChangeSearchInput,
    onSelectCategories,
    onDeleteCategoryChip,
    onDeleteTagChip,
    reset,
  } = useProductSearch()

  const {
    data: products,
    loading,
    error,
  } = useQuery<IProductsListWithoutCollection>(getProductList, {
    variables: {
      after: cursor,
      query: makeQuery({ categories, title, tags }),
    },
  })

  const handleSelectCategories = (e: SelectChangeEvent<unknown>) => {
    onSelectCategories(e.target.value as string[])
  }

  useEffect(() => {
    if (error) {
      setHasNext(false)
    }
  }, [error])

  useEffect(() => {
    if (products) {
      setData(
        cursor
          ? [...data, ...(products.products?.nodes || [])]
          : [...(products.products?.nodes || [])]
      )
      setHasNext(products.products?.pageInfo?.hasNextPage || false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  if (error) {
    return (
      <Typography.DetailHeading sx={{ textAlign: "center", color: "error.main" }}>
        {error.message}
      </Typography.DetailHeading>
    )
  }

  return (
    <Box>
      <Header searchQuery={searchInput} onChangeSearchQuery={onChangeSearchInput} />
      <Box sx={{ display: { md: "flex", xs: "block" } }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar />
        </Box>
        <Box sx={{ flexGrow: 1, mt: { md: 18, xs: 6 }, mb: 12.5, px: 2 }}>
          <Box sx={{ px: { xs: 0, md: 7 } }}>
            {title && (
              <Typography.Heading sx={{ color: "primary.main", mb: 3 }}>
                {`${title} ${t("search.search_result_of")}`}
              </Typography.Heading>
            )}
            <Box
              sx={{
                bgcolor: "background.paper",
                px: { xs: 2, md: 1.25 },
                py: { xs: 2.5, md: 3 },
                mb: 1,
              }}
            >
              <Typography.Description
                sx={{ color: "text.primary", fontWeight: 600, lineHeight: "1.25rem", mb: 1 }}
              >
                {t(searchInput[0] === "#" ? "search.tag" : "sidebar.category")}
              </Typography.Description>
              {searchInput[0] !== "#" ? (
                <Select
                  multiple
                  value={categories}
                  onChange={handleSelectCategories}
                  sx={{
                    width: "100%",
                    maxWidth: 430,
                    "& .MuiSelect-select": {
                      bgcolor: "background.default",
                    },
                  }}
                >
                  <MenuItem value="unspecified" disabled>
                    {t("search.unspecified")}
                  </MenuItem>
                  {Object.keys(CATEGORY_ITEMS).map((key) => (
                    <MenuItem key={key} value={key}>
                      {t(CATEGORY_ITEMS[key])}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <TextField
                  value={searchInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChangeSearchInput(e.target.value)
                  }
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-end", md: "center" },
                mb: 1.25,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {categories
                    .filter((c) => c !== "unspecified")
                    .map((value) => (
                      <Chip
                        key={value}
                        sx={{ bgcolor: "divider", color: "background.default" }}
                        label={t(CATEGORY_ITEMS[value])}
                        onDelete={() => onDeleteCategoryChip(value)}
                      />
                    ))}
                </Box>
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {tags.map((tag, index) => (
                    <Chip
                      key={`${tag}_${index}`}
                      sx={{ bgcolor: "divider", color: "background.default" }}
                      label={`#${tag}`}
                      onDelete={() => onDeleteTagChip(tag)}
                    />
                  ))}
                </Box>
              </Box>
              <Button
                sx={{
                  flexShrink: 0,
                  px: 0.5,
                  py: 0.25,
                  fontSize: "0.75rem",
                  lineHeight: "0.75rem",
                }}
                onClick={reset}
              >
                {t("search.reset_conditions")}
              </Button>
            </Box>
            {!!products?.products.nodes.length && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", md: "row" },
                  flexWrap: "wrap",
                  gap: 5,
                }}
              >
                {products?.products.nodes.map((product) => (
                  <ProductItem product={product} key={product.id} sx={{ flexDirection: "row" }} />
                ))}
              </Box>
            )}
            {loading && (
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  mt: { xs: 8, md: 20 },
                }}
              >
                <CircularProgress size="md" color="primary" />
              </Box>
            )}
            {hasNext && (
              <LoadMore
                isLoading={loading}
                onLoad={() => {
                  hasNext && setCursor(products?.products?.pageInfo.endCursor)
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
