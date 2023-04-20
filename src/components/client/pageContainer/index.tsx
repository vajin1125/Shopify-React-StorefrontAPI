import React from "react"

import { Typography, Box, SxProps } from "src/UILibrary"

export const PageContainer: React.FC<
  React.PropsWithChildren<{
    title?: string
    toolbar?: React.ReactNode
    sx?: SxProps
    // rest?: Record<string, any>
  }>
> = ({ children, title, toolbar, sx, ...rest }) => {
  return (
    <Box sx={{ p: { xs: "0 0.875rem", md: "84px 110px 40px 80px" }, flexGrow: 1, ...sx }} {...rest}>
      {(title || toolbar) && (
        <Box
          sx={{
            display: "flex",
            pt: { xs: "3.125rem", md: "2.75rem" },
            pb: "1rem",
            alignItems: "center",
          }}
        >
          <Typography.Heading
            color="primary"
            sx={{
              fontSize: { xs: "1.125rem", md: "1.5rem" },
              lineHeight: { xs: "100%", md: "2rem" },
            }}
          >
            {title}
          </Typography.Heading>

          <Box sx={{ ml: "1.5rem" }}>{toolbar}</Box>
        </Box>
      )}
      {children}
    </Box>
  )
}
