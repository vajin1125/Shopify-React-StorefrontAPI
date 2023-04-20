import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Typography } from "src/UILibrary"

export const OrderStatusCircle: React.FC<{
  status: string
  date?: string
  time?: string
  isCurrent?: boolean
  onClick?: () => void
}> = ({ status, date, time, isCurrent, onClick }) => {
  const { t } = useTranslation()
  return (
    <Box sx={{ maxWidth: "80px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Button
        variant="contained"
        disableElevation
        disableRipple
        disableTouchRipple
        sx={{
          width: "60px",
          height: "60px",
          borderRadius: "60px",
          padding: "0.625rem",
          fontSize: "0.75rem",
          bgcolor: date ? "primary.main" : "divider",
          color: "background.default",
        }}
      >
        {status}
      </Button>
      {date && time ? (
        <>
          <Typography.Action
            sx={{ fontSize: "11px", lineHeight: "13px", textAlign: "center", mt: "0.5rem" }}
          >
            {date}
          </Typography.Action>
          <Typography.Action sx={{ fontSize: "11px", lineHeight: "13px", textAlign: "center" }}>
            {time}
          </Typography.Action>
        </>
      ) : (
        isCurrent && (
          <Typography.Action
            sx={{
              fontSize: "11px",
              lineHeight: "13px",
              textAlign: "center",
              mt: "0.5rem",
              textDecoration: "underline",
              color: "primary.main",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => onClick && onClick()}
          >
            {t("admin.orderdetail.cancel_it")}
          </Typography.Action>
        )
      )}
    </Box>
  )
}
