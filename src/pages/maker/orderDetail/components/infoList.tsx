import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Typography } from "src/UILibrary"

export const InfoList = ({ label, value }: { label: string; value: any }) => {
  const { t } = useTranslation()
  return (
    <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center", mb: 1 }}>
      <Typography.SubTitle
        sx={{
          minWidth: "100px",
          width: "150px",
          lineHeight: "2rem",
          letterSpacing: "2px",
          fontWeight: 400,
          bgcolor: "info.dark",
          textAlign: "center",
        }}
      >
        {t(label)}
      </Typography.SubTitle>
      <Typography.SubTitle sx={{ fontWeight: 400 }}>{value}</Typography.SubTitle>
    </Box>
  )
}
