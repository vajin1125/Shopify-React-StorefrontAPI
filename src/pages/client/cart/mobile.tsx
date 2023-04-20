import React from "react"
import { useTranslation } from "react-i18next"

import { PageContainer } from "src/components/client/pageContainer"
import { ProductSlide } from "src/components/client/productsSlide"
import { PurchaseCard } from "src/components/client/purchaseCard"
import { Box, Typography } from "src/UILibrary"
import { CartItem } from "./components/cartItem"
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
    <PageContainer title={t("cart.items_in_cart")}>
      <PurchaseCard
        itemCount={cart.cart.totalQuantity}
        subtotal={cart.cart.cost.totalAmount.amount}
        buttonLabel="cart.go_to_checkout"
      />
      <Box sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 3 }}>
        {cart.cart.lines.nodes.map((cartLine) => (
          <CartItem
            key={cartLine.merchandise.id}
            cartLine={cartLine}
            onUpdateCartLines={onUpdateCartLines}
            onRemoveCartLines={onRemoveCartLines}
          />
        ))}
        {!cart.cart.lines.nodes.length && (
          <Typography.Description>{t("cart.no_items")}</Typography.Description>
        )}
      </Box>
      <Box mt={7} mb={5}>
        <Typography.Title color="primary" mb={3}>
          {t("cart.related_products")}
        </Typography.Title>
        <ProductSlide />
      </Box>
      <LoadingModal open={isChanging} />
    </PageContainer>
  )
}
