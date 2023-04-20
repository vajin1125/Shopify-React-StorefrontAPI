import React from "react"
import { Box } from "@mui/material"

import { Typography } from "src/UILibrary"

interface SectionProps {
  label: string
}

export const Section: React.FC<React.PropsWithChildren<SectionProps>> = ({ label, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "flex-start",
        gap: { xs: 1.25, md: 2.5 },
        mb: { xs: 3, md: 1.5 },
      }}
    >
      <Typography.Description
        sx={{
          fontWeight: 600,
          color: "text.primary",
          bgcolor: "background.paper",
          lineHeight: "1.25rem",
          width: { xs: "100%", md: 180 },
          py: { xs: 0.75, md: 1.5 },
          px: 1.25,
          borderRadius: 1.25,
          textAlign: { xs: "left", md: "center" },
          boxSizing: "border-box",
        }}
      >
        {label}
      </Typography.Description>
      <Box sx={{ flexGrow: 1, width: "100%" }}>{children}</Box>
    </Box>
  )
}
