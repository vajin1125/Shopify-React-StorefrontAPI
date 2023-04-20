import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Typography } from "src/UILibrary"

export const SectionField = ({
  label,
  subLabel,
  children,
  sx,
  ...rest
}: {
  label: string
  subLabel?: string
  children?: React.ReactNode
  sx?: any
  rest?: Record<string, any>
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: "1rem", ...sx }} {...rest}>
      <Typography.Description
        sx={{
          fontWeight: 400,
          lineHeight: "1.25rem",
          letterSpacing: "2px",
          width: "100%",
          maxWidth: 85,
        }}
      >
        {t(label)}
        {subLabel && (
          <Typography.Caption sx={{ fontWeight: 400, color: "text.secondary", flexShrink: 0 }}>
            {t(subLabel)}
          </Typography.Caption>
        )}
      </Typography.Description>
      {children}
    </Box>
  )
}
