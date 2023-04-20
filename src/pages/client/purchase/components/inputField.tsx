import React, { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"

import { Typography, Box } from "src/UILibrary"

export const InputField = ({ label, children }: PropsWithChildren<{ label: string }>) => {
  const { t } = useTranslation()
  return (
    <Box sx={{ mt: 1.5, display: { sm: "block", md: "flex" }, alignItems: "center" }}>
      <Typography.Description
        sx={{
          fontWeight: 600,
          lineHeight: "1.25rem",
          letterSpacing: "2px",
          mb: "0.375rem",
          width: "178px",
          mr: 2.5,
          textAlign: { sm: "left", md: "center" },
          flexShrink: 0,
        }}
      >
        {t(label)}
      </Typography.Description>
      {children}
    </Box>
  )
}
