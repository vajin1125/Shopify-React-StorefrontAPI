import React, { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"

import { Typography, Box } from "src/UILibrary"

export const InputField = ({ label, children }: PropsWithChildren<{ label: string }>) => {
  const { t } = useTranslation()
  return (
    <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
      <Typography.Description
        sx={{
          fontWeight: 600,
          lineHeight: "1.25rem",
          letterSpacing: "2px",
          mb: "0.5rem",
        }}
      >
        {t(label)}
      </Typography.Description>
      {children}
    </Box>
  )
}
