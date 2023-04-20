import React, { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"

import { Top as MobileTop } from "./mobile"
import { Top as LaptopTop } from "./laptop"
import { ResponsiveUI } from "src/modules/responsiveUI"
import { IProductSearchItem, IProductsListWithoutCollection } from "src/types/product"
import { getProductList } from "src/queries/product"
import { Typography } from "src/UILibrary"

export const Top = () => {
  const [data, setData] = useState<IProductSearchItem[]>([])
  const [cursor, setCursor] = useState<string | undefined>(undefined)
  const [hasNext, setHasNext] = useState<boolean>(true)

  const {
    data: products,
    loading,
    error,
  } = useQuery<IProductsListWithoutCollection>(getProductList, {
    variables: {
      after: cursor,
    },
  })

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

  return ResponsiveUI({
    mobile: <MobileTop />,
    laptop: (
      <LaptopTop
        products={products?.products.nodes || []}
        loading={loading}
        onLoad={() => {
          hasNext && setCursor(products?.products?.pageInfo.endCursor)
        }}
        isMore={hasNext}
      />
    ),
  })
}
