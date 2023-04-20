import React from "react"

import { Box, Image, Typography } from "src/UILibrary"
import ProductDefaultBG from "src/assets/imgs/productDefaultBG.png"

export const ProductItem = () => {
  return (
    <Box sx={{ height: "270px", width: "280px", bgcolor: "background.default" }}>
      <Image src={ProductDefaultBG} alt="ProductImage" sx={{ height: "200px" }} />
      <Box sx={{ p: "1rem 0.625rem 0.5rem 0.625rem" }}>
        <Typography.Description
          color="primary"
          sx={{
            fontWeight: "600",
            lineHeight: "21px",
            mb: "0.5rem",
            letterSpacing: "0.1rem",
          }}
        >
          アイラッシュ 修了証 発行料
        </Typography.Description>
        <Typography.Description
          align="right"
          sx={{
            fontWeight: "600",
            pr: "0.5rem",
          }}
        >
          ￥2,200 (税込)
        </Typography.Description>
      </Box>
    </Box>
  )
}
