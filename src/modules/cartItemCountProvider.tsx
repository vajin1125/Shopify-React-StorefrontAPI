import React, { useState, useEffect } from "react"

import { Box, CircularProgress } from "src/UILibrary"

import { useGetCartItemCount } from "src/queries/cart"
import { ICartItemState } from "src/types/cart"

const ShopifyCartItemCountContext = React.createContext<ICartItemState | null>(null)

export const ShopifyCartItemCount = ({ children }: { children: React.ReactNode }) => {
  const cartId = localStorage.getItem("shopifyCartId") || ""
  const [value, setValue] = useState<number>(0)

  const { data: cart, loading } = useGetCartItemCount(cartId)

  useEffect(() => {
    setValue((cart?.cart?.lines.nodes || []).reduce((prev, curr) => prev + curr.quantity, 0))
  }, [cart])

  if (loading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "primary.main" }} />
      </Box>
    )
  }

  return (
    <ShopifyCartItemCountContext.Provider value={{ value, setValue }}>
      {children}
    </ShopifyCartItemCountContext.Provider>
  )
}

export const useCartItemCount = () => {
  const cartItemCount = React.useContext(ShopifyCartItemCountContext)
  return cartItemCount
}
