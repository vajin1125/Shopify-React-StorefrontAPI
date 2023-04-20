import React from "react"
import { useTranslation } from "react-i18next"

import { PageContainer } from "src/components/client/pageContainer"
import { PurchaseCard } from "src/components/client/purchaseCard"
import { Box, Typography } from "src/UILibrary"
import { CartTable } from "./components/cartTable"
import { ProductItem } from "./components/productItem"
import { LoadingModal } from "src/components/shared/loadingModal"

import { ICart } from "src/types/cart"

interface CartProps {
  cart: ICart
  onUpdateCartLines: Function
  onRemoveCartLines: Function
  isChanging: boolean
}

export const Cart: React.FC<CartProps> = ({
  cart,
  onUpdateCartLines,
  onRemoveCartLines,
  isChanging,
}) => {
  const { t } = useTranslation()

  return (
    <PageContainer
      title={t("cart.items_in_cart")}
      sx={{ pr: { md: 18 }, pl: { md: 15 }, pb: { md: 10 } }}
    >
      <Box sx={{ display: "flex", gap: "30px" }}>
        <CartTable
          cartLines={cart.cart.lines.nodes}
          onUpdateCartLines={onUpdateCartLines}
          onRemoveCartLines={onRemoveCartLines}
        />
        <Box sx={{ width: "315px", flexShrink: 0 }}>
          <PurchaseCard
            itemCount={cart.cart.totalQuantity}
            subtotal={cart.cart.cost.totalAmount.amount}
            buttonLabel="cart.go_to_checkout"
          />
          <Box mt={3.5} mb={5}>
            <Typography.Title color="primary" mb={3}>
              {t("cart.related_products")}
            </Typography.Title>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <ProductItem />
              <ProductItem />
            </Box>
          </Box>
        </Box>
      </Box>
      <LoadingModal open={isChanging} />
    </PageContainer>
  )
}
