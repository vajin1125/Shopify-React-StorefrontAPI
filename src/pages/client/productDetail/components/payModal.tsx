import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import { useTranslation } from "react-i18next"

import { Typography } from "src/UILibrary/typography"
import { CloseIcon } from "src/assets/icons/CloseIcon"
import { RoundButton } from "src/components/client/roundButton"
import { IPaymentMethod } from "src/types/paymentMethod"

export const PayModal = ({
  open,
  handleOpen,
  openMethod,
  handleConfirm,
  paymentMethods,
  isLoading = false,
}: {
  open: boolean
  handleOpen: Function
  openMethod: Function
  handleConfirm: Function
  paymentMethods?: IPaymentMethod
  isLoading: boolean
}) => {
  const { t } = useTranslation()

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => handleOpen(false)}
      onOpen={() => handleOpen(true)}
      sx={{
        zIndex: 10001,
      }}
      PaperProps={{
        sx: { bgcolor: "background.default", bottom: 0, boxShadow: "none" },
      }}
    >
      <Box
        sx={{
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          bgcolor: "secondary.main",
          pr: 1,
        }}
      >
        <Typography.Action onClick={() => handleOpen(false)}>
          <CloseIcon width="18" height="18" color="#909090" />
        </Typography.Action>
      </Box>
      <Box sx={{ px: 2, display: "flex", flexDirection: "column", gap: "18px", my: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: paymentMethods ? "space-between" : "start",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography.Action
              sx={{
                fontWeight: 600,
                lineHeight: "20px",
                letterSpacing: "2px",
                py: 1,
                px: 3,
                minWidth: "130px",
                bgcolor: "secondary.main",
                mr: 2,
                boxSizing: "border-box",
                textAlign: "center",
              }}
            >
              {t("productDetail.payment_method")}
            </Typography.Action>
            {paymentMethods && (
              <Typography.Description
                sx={{ fontWeight: 600, lineHeight: "20px", letterSpacing: "2px" }}
              >
                {paymentMethods.defaultPaymentMethod}
              </Typography.Description>
            )}
          </Box>
          <RoundButton
            variant="contained"
            disableElevation
            sx={{ bgcolor: "text.secondary", lineHeight: "12px", fontSize: "0.75rem" }}
            onClick={() => openMethod()}
          >
            {t(`productDetail.${paymentMethods ? "change" : "setup"}`)}
          </RoundButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography.Action
            sx={{
              fontWeight: 600,
              lineHeight: "20px",
              letterSpacing: "2px",
              py: 1,
              px: 3,
              minWidth: "130px",
              bgcolor: "secondary.main",
              mr: 2,
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            {t("productDetail.total")}
          </Typography.Action>
          <Typography.Description
            sx={{ fontWeight: 600, lineHeight: "20px", letterSpacing: "2px" }}
          >
            ￥10,000 ({t("productDetail.tax_included")})
          </Typography.Description>
        </Box>
      </Box>
      <RoundButton
        variant="contained"
        color="primary"
        sx={{ mx: 2, py: 2, lineHeight: "12px", mb: 7 }}
        disabled={isLoading}
        onClick={() => handleConfirm()}
      >
        {t("productDetail.confirm_purchase")}
      </RoundButton>
    </SwipeableDrawer>
  )
}
