import React from "react"
import { useTranslation } from "react-i18next"

import { OrderState } from "src/types/order"

import { Box, Typography } from "src/UILibrary"

export const StateLabel = ({ state }: { state: OrderState }) => {
  const { t } = useTranslation()
  const getColor = () => {
    switch (state) {
      case "handed_over":
        return "success"
      case "deposited":
        return "info"
      case "new_reception":
        return "warning"
      default:
        break
    }
  }
  const getLabel = () => {
    switch (state) {
      case "handed_over":
        return "admin.orderlist.handed_over"
      case "deposited":
        return "admin.orderlist.deposited"
      case "new_reception":
        return "admin.orderlist.new_reception"
      default:
        return ""
    }
  }
  return (
    <Box
      sx={{
        width: "90px",
        height: "30px",
        border: "2px solid",
        borderColor: `${getColor()}.main`,
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography.Action
        sx={{
          lineHeight: "1.25rem",
          letterSpacing: "2px",
          fontWeight: 600,
          color: `${getColor()}.main`,
        }}
      >
        {t(getLabel())}
      </Typography.Action>
    </Box>
  )
}
