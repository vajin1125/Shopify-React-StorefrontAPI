import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Typography } from "src/UILibrary"

export const SectionTitle = ({ label, sx }: { label: string; sx?: Record<string, any> }) => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "60px",
        px: "1rem",
        ...sx,
      }}
    >
      <Typography.Title sx={{ fontWeight: 600, lineHeight: "1.25rem", letterSpacing: "2px" }}>
        {t(label)}
      </Typography.Title>
    </Box>
  )
}
