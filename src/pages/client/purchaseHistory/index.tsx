import React from "react"
import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"

import { Typography } from "src/UILibrary/typography"
import { CheckboxItem } from "src/UILibrary/checkboxItem"
import { Orders } from "./components/orders"

export const PurchaseHistory: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Box sx={{ flexGrow: 1, mt: { md: 18, xs: 6 }, mb: 12.5, px: 2 }}>
      <Box sx={{ px: { xs: 0, md: 9 } }}>
        <Typography.Heading sx={{ color: "primary.main", mb: 3 }}>
          {t("purchase_history.purchase_history")}
        </Typography.Heading>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.75 }}>
          <CheckboxItem label={"purchase_history.all"} />
          <CheckboxItem label={"purchase_history.ordering"} />
          <CheckboxItem label={"purchase_history.before_order"} />
        </Box>
        <Orders />
        <Orders />
      </Box>
    </Box>
  )
}
