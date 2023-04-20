import React from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { Box, Image, Typography } from "src/UILibrary"
import { OrderProduct } from "src/types/order"
import { numberToUSDCurrency } from "src/modules/currency"

import ProductDefaultBG from "src/assets/imgs/productDefaultBG.png"

export const OrderProductItem: React.FC<OrderProduct> = ({
  id,
  title,
  singlePrice,
  quantity,
  imageUrl,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box sx={{ display: "flex", mb: "1rem", alignItems: "center" }}>
      <Image src={imageUrl || ProductDefaultBG} sx={{ width: "132px", height: "84px" }} />
      <Box sx={{ flexGrow: 1, pl: "1rem" }}>
        <Typography.Description
          sx={{ fontWeight: 600, mb: "0.625rem", "&:hover": { cursor: "pointer" } }}
          onClick={() => navigate(`/product/${id}`)}
        >
          {title}
        </Typography.Description>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Action>
            {`${t("admin.orderdetail.unit_price")} ${numberToUSDCurrency(singlePrice)}${t(
              "admin.orderdetail.yen"
            )} ${t("admin.orderdetail.quantity")} ${quantity}${t(
              "admin.orderdetail.unit_of_item"
            )}`}
          </Typography.Action>
          <Typography.Title sx={{ lineHeight: "14px", mt: 1 }}>
            ￥{numberToUSDCurrency(singlePrice * quantity)}
            <Typography.Caption
              sx={{ display: "inline-block", fontWeight: 600, lineHeight: "14px" }}
            >
              ({t("productDetail.tax_included")})
            </Typography.Caption>
          </Typography.Title>
        </Box>
      </Box>
    </Box>
  )
}
