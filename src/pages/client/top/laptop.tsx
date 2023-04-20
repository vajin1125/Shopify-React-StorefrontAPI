import React from "react"
import { useTranslation } from "react-i18next"

import { Box, CircularProgress } from "src/UILibrary"
import { PageContainer } from "src/components/client/pageContainer"
import { ProductItem } from "src/components/client/productItem"
import { IProductSearchItem } from "src/types/product"
import { LoadMore } from "src/components/shared/loadMore"

interface TopProps {
  products: IProductSearchItem[]
  loading: boolean
  onLoad: () => void
  isMore: boolean
}

export const Top: React.FC<TopProps> = ({ products, loading, onLoad, isMore }) => {
  const { t } = useTranslation()

  return (
    <PageContainer title={t("top_page.title")}>
      {!!products.length && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2.5rem",
          }}
        >
          {products.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </Box>
      )}
      {isMore && <LoadMore isLoading={loading} onLoad={onLoad} />}
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
    </PageContainer>
  )
}
