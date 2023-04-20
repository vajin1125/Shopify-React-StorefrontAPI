import React from "react"
import { Box, Checkbox, Button } from "@mui/material"
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material"
import { useTranslation } from "react-i18next"

import { MainBadge } from "src/components/shared/mainBadge"
import { Typography } from "src/UILibrary/typography"

interface PaypayPaymentProps {
  isLinked?: boolean
  isMain?: boolean
  setDefault: Function
}

export const PaypayPayment: React.FC<PaypayPaymentProps> = ({
  isLinked = false,
  isMain = false,
  setDefault,
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ mb: { xs: 3, md: 5 } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 1, md: 10 },
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.25 }}>
          {isLinked && (
            <Checkbox
              icon={<CheckCircleIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={isMain}
              onChange={() => setDefault("paypay")}
              sx={{ p: 0.5 }}
            />
          )}
          <Typography.SubTitle
            sx={{ fontWeight: 600, letterSpacing: "2px", color: "text.primary", mr: 1 }}
          >
            {t("purchase.paypay_payment")}
          </Typography.SubTitle>
          {isMain && (
            <Box sx={{ mr: 1 }}>
              <MainBadge />
            </Box>
          )}

          {isLinked && (
            <Typography.SubTitle
              sx={{ fontWeight: 600, letterSpacing: "2px", color: "text.primary", mr: 1 }}
            >
              {`${t("purchase.balance")}2,350${t("purchase.yen")}`}
            </Typography.SubTitle>
          )}
        </Box>
        {isLinked && (
          <Typography.SubTitle
            sx={{ flexShrink: 0, color: "secondary.contrastText", fontWeight: 400 }}
          >
            {t("mypage.linked")}
          </Typography.SubTitle>
        )}
      </Box>
      {!isLinked && (
        <>
          <Typography.Description
            sx={{ color: "text.primary", mb: { xs: 1, md: 1.5 }, lineHeight: "1.5rem" }}
          >
            {t("mypage.paypay_link_help")}
          </Typography.Description>
          <Button
            color="primary"
            variant="outlined"
            sx={{
              fontSize: "0.875rem",
              lineHeight: "0.875rem",
              px: 4,
              py: 1.5,
              borderRadius: 8,
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
              },
            }}
          >
            {t("mypage.work_together")}
          </Button>
        </>
      )}
    </Box>
  )
}
