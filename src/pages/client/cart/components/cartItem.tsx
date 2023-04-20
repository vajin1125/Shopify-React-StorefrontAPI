import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Image, Typography } from "src/UILibrary"
import { AddToCart } from "./addToCart"

import { ICartLine } from "src/types/cart"

interface CartItemProps {
  cartLine: ICartLine
  onUpdateCartLines: Function
  onRemoveCartLines: Function
}

export const CartItem: React.FC<CartItemProps> = ({
  cartLine,
  onUpdateCartLines,
  onRemoveCartLines,
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: "flex", maxHeight: { xs: "88px", md: "54px" }, gap: 2, height: "100%" }}>
      <Image
        src={cartLine.merchandise.product.images.nodes[0].url}
        alt={cartLine.merchandise.product.images.nodes[0].altText || "Product"}
        sx={{ width: { xs: "120px", md: "74px" } }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 1 }}>
        <Typography.Description
          sx={{ fontSize: { xs: "0.875rem", md: "1rem" }, fontWeight: 600, lineHeight: "21px" }}
        >
          {cartLine.merchandise.product.title}
        </Typography.Description>
        <Typography.Title sx={{ lineHeight: "14px", display: { xs: "block", md: "none" }, mb: 1 }}>
          {`￥${cartLine.merchandise.priceV2.amount}`}
          <Typography.Caption sx={{ display: "inline-block", fontWeight: 600, lineHeight: "14px" }}>
            ({t("purchase.tax_included")})
          </Typography.Caption>
        </Typography.Title>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <AddToCart
            id={cartLine.id}
            count={cartLine.quantity}
            totalCount={cartLine.merchandise.quantityAvailable}
            onUpdateCartLines={onUpdateCartLines}
            onRemoveCartLines={onRemoveCartLines}
          />
        </Box>
      </Box>
    </Box>
  )
}
