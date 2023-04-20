import React from "react"
import { Box } from "@mui/material"

import { Typography } from "src/UILibrary/typography"
import { Image } from "src/UILibrary/image"

import ProductImage from "src/assets/imgs/productDefaultBG.png"

export const OrderItem: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Image src={ProductImage} alt="Product" sx={{ width: { xs: 100, md: 120 } }} />
      <Box sx={{ flexGrow: 1, ml: { xs: 2, md: 3 }, color: "text.primary" }}>
        <Typography.Description sx={{ fontWeight: 600, mb: { xs: 0.5, md: 1 } }}>
          {"株式会社RBサポート / 就職テキスト"}
        </Typography.Description>
        <Typography.Action sx={{ mb: 0.75 }}>{"注文時の価格 ￥2,200（税込）"}</Typography.Action>
        <Typography.Action>{"(単体価格 550円 / 個数 3点)"}</Typography.Action>
      </Box>
    </Box>
  )
}
