import React from "react"
import { useTranslation } from "react-i18next"
import { RoundButton } from "src/components/client/roundButton"

import { Box, Typography } from "src/UILibrary"

export const PurchaseCard = ({ itemCount, subtotal }: { itemCount: number; subtotal: number }) => {
  const { t } = useTranslation()
  return (
    <Box sx={{ bgcolor: "secondary.main", py: 4, px: 1.25 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          pb: 1.5,
          borderBottom: "2px solid",
          borderColor: "divider",
        }}
      >
        <Typography.SubTitle
          sx={{ lineHeight: "1.25rem", letterSpacing: "2px", color: "text.primary" }}
        >
          {t("purchase.number_of_items")}
        </Typography.SubTitle>
        <Box display="flex">
          <Typography.Heading
            sx={{ lineHeight: "1.25rem", letterSpacing: "2px", color: "text.primary" }}
          >
            {itemCount}
          </Typography.Heading>
          <Typography.Description
            sx={{
              lineHeight: "1.5rem",
              fontWeight: 600,
              letterSpacing: "2px",
              color: "text.primary",
            }}
          >
            {t("purchase.unit_of_item")}
          </Typography.Description>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          mt: 2,
        }}
      >
        <Typography.SubTitle
          sx={{ lineHeight: "1.25rem", letterSpacing: "2px", color: "text.primary", flexShrink: 0 }}
        >
          {`${t("purchase.subtotal")} (${t("purchase.tax_included")})`}
        </Typography.SubTitle>
        <Box display="flex">
          <Typography.Description
            sx={{ lineHeight: "1.5rem", letterSpacing: "2px", color: "primary.main" }}
          >
            ￥
          </Typography.Description>
          <Typography.Heading
            sx={{
              lineHeight: "1.25rem",
              fontWeight: 600,
              letterSpacing: "2px",
              color: "primary.main",
            }}
          >
            {subtotal}
          </Typography.Heading>
        </Box>
      </Box>
      <RoundButton variant="contained" color="primary" sx={{ mt: 3, width: "100%" }}>
        {t("purchase.purchase")}
      </RoundButton>
    </Box>
  )
}
