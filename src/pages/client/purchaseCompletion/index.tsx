import React from "react"
import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Typography } from "src/UILibrary/typography"
import { RoundButton } from "src/components/client/roundButton"
import { PageContainer } from "src/components/client/pageContainer"

import { FOOTER_CONSTANT } from "src/constants/footer"

export const PurchaseCompletion = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <PageContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: { xs: 6.25, md: 10 },
        }}
      >
        <Typography.Heading
          color="primary"
          sx={{ fontSize: { xs: "1.125rem", md: "1.5rem" }, letterSpacing: 0 }}
        >
          {t("purchaseCompletion.purchase_completed")}
        </Typography.Heading>
        <Typography.Action sx={{ color: "#000", lineHeight: "1.25rem", mt: { xs: 1, md: 3 } }}>
          {t("purchaseCompletion.wait_til_product_arrive")}
        </Typography.Action>
        <RoundButton
          variant="contained"
          sx={{ mt: { xs: 5, md: 10 }, lineHeight: "2rem" }}
          onClick={() => navigate("/")}
        >
          {t("purchaseCompletion.return_to_top")}
        </RoundButton>
        <Typography.Caption
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            lineHeight: "1.5rem",
            textAlign: "center",
            bgcolor: "primary.dark",
            mt: "0.5rem",
            width: "100%",
            color: "background.default",
            display: { xs: "none", md: "block" },
          }}
        >
          {FOOTER_CONSTANT}
        </Typography.Caption>
      </Box>
    </PageContainer>
  )
}
