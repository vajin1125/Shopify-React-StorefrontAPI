import React from "react"
import { FlexboxProps } from "@mui/system"
import { useNavigate } from "react-router-dom"

import { Image, Typography, Box, SxProps } from "src/UILibrary"
import { IProductSearchItem } from "src/types/product"
import { numberToUSDCurrency } from "src/modules/currency"
import ProductDefaultBG from "src/assets/imgs/productDefaultBG.png"

interface ProductItemProps {
  product?: IProductSearchItem
  sx?: SxProps & FlexboxProps
}

export const ProductItem: React.FC<ProductItemProps> = ({ product, sx }) => {
  const navigate = useNavigate()
  const { images, title, description, priceRange } = product || {}
  const image = images?.nodes[0]
  const { maxVariantPrice, minVariantPrice } = priceRange || {}
  const minValue = numberToUSDCurrency(parseFloat(minVariantPrice?.amount || "0"))
  const maxValue = numberToUSDCurrency(
    parseFloat(maxVariantPrice?.amount || minVariantPrice?.amount || "0")
  )

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "block" },
        height: { xs: "100%", md: "280px" },
        width: { xs: "100%", md: "220px" },
        bgcolor: "background.default",
        gap: 1.25,
        flexDirection: "column",
        "&:hover": {
          cursor: "pointer",
        },
        ...sx,
      }}
      onClick={() => product && navigate(`/product/${product.id.split("/").reverse()[0]}`)}
    >
      <Box
        sx={{
          flexShrink: 0,
          width: { xs: sx?.flexDirection === "row" ? 120 : "100%", md: "100%" },
        }}
      >
        <Image
          src={image?.url || ProductDefaultBG}
          alt={image?.altText || ""}
          sx={{ minHeight: { xs: "88px", md: "158px" } }}
        />
      </Box>
      <Box
        sx={{ flexGrow: 1, px: { xs: 0, md: 1.25 }, py: { xs: 0, md: 2 }, color: "text.primary" }}
      >
        <Typography.Description
          color="primary"
          sx={{
            fontWeight: "600",
            lineHeight: "1.25rem",
            mb: { xs: 0.5, md: 1 },
          }}
        >
          {title}
        </Typography.Description>
        <Typography.Description
          sx={{
            lineHeight: "1.25rem",
            mb: { xs: 0.5, md: 1 },
            maxLines: 2,
          }}
        >
          {description}
        </Typography.Description>
        <Typography.Description
          align="right"
          sx={{
            fontWeight: "600",
            px: 1,
          }}
        >
          ￥{minValue} - ￥{maxValue} (税込)
        </Typography.Description>
      </Box>
    </Box>
  )
}
