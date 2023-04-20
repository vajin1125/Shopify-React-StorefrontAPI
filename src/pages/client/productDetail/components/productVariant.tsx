import React from "react"
import { Box, SxProps } from "@mui/material"

import { Image } from "src/UILibrary/image"
import { Typography } from "src/UILibrary/typography"
import { useTranslation } from "react-i18next"
import ProductDefaultBG from "src/assets/imgs/productDefaultBG.png"

import { IProductVariant } from "src/types/product"

interface ProductVariantProps {
  variant: IProductVariant
  selected?: boolean
  sx?: SxProps
  onClick?: Function
}

export const ProductVariant: React.FC<ProductVariantProps> = ({
  variant,
  selected,
  sx,
  onClick,
}) => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{ bgcolor: "background.default", cursor: "pointer", ...sx }}
      onClick={() => !!onClick && onClick()}
    >
      <Image
        src={variant.image?.url || ProductDefaultBG}
        alt="ProductImage"
        sx={{
          minHeight: "95px",
          minWidth: "100%",
          height: "100px",
          border: selected ? "1px solid" : "none",
          borderColor: "primary.main",
          "& img": {
            objectFit: "fill",
            maxWidth: "100%",
            height: "100%",
            width: "100%",
          },
        }}
      />
      <Box sx={{ py: 1, display: "flex", alignItems: "center" }}>
        <Typography.Description sx={{ flexGrow: 1, color: "#000" }}>
          {variant.title}
        </Typography.Description>
        {selected && (
          <Typography.Caption color="primary" sx={{ flexShrink: 0 }}>
            {t("productDetail.selected")}
          </Typography.Caption>
        )}
      </Box>
    </Box>
  )
}
