import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Typography } from "src/UILibrary"

export const Group = ({ label, children }: { label: string; children?: React.ReactNode }) => {
  const { t } = useTranslation()
  return (
    <Box sx={{ px: "1.75rem" }}>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Typography.Action sx={{ fontWeight: 600, lineHeight: "1.25rem", px: 4 }}>
          {t(label)}
        </Typography.Action>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", flexDirection: "column", py: 1, mb: 1 }}
      >
        {children}
      </Box>
    </Box>
  )
}
