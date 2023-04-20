import React from "react"
import { Box } from "@mui/material"

import { Typography } from "src/UILibrary/typography"

interface FormInputProps {
  label: string
}

export const FormInput: React.FC<React.PropsWithChildren<FormInputProps>> = ({
  label,
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        gap: { xs: 0.75, md: 2.5 },
        mb: 1.5,
      }}
    >
      <Typography.Description
        sx={{
          flexShrink: 0,
          width: { xs: "100%", md: 180 },
          py: { xs: 0, md: 1.5 },
          textAlign: { xs: "left", md: "center" },
          color: "text.primary",
          bgcolor: { xs: "background.default", md: "background.paper" },
          borderRadius: 1.25,
        }}
      >
        {label}
      </Typography.Description>
      <Box sx={{ flexGrow: 1, width: "100%" }}>{children}</Box>
    </Box>
  )
}
