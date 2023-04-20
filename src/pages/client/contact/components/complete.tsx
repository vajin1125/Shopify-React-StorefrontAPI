import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Box, Button, Typography } from "src/UILibrary"

export const Complete: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        maxWidth: 486,
        width: "100%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography.Heading sx={{ color: "primary.main", textAlign: "center", mb: 3 }}>
        {t("contact.contact_us")}
      </Typography.Heading>
      <Typography.Action sx={{ color: "text.primary", textAlign: "center", lineHeight: "1.25rem" }}>
        {t("contact.inquiry_complete_detail_1")}
      </Typography.Action>
      <Typography.Action
        sx={{
          color: "text.primary",
          textAlign: "center",
          lineHeight: "1.25rem",
          mb: { xs: 5, md: 7.5 },
        }}
      >
        {t("contact.inquiry_complete_detail_2")}
      </Typography.Action>
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: { xs: "100%", md: 350 },
          color: "background.default",
          letterSpacing: "2px",
          fontSize: "1rem",
          borderRadius: 5,
        }}
        onClick={() => navigate("/")}
      >
        {t("contact.return_to_ec_top")}
      </Button>
    </Box>
  )
}
