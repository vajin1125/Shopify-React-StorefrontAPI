import React from "react"

import { Box, Typography, SxProps } from "src/UILibrary"
import { AdminFooter } from "src/components/adminPageContainer/components/AdminFooter"

export const PageContainer: React.FC<
  React.PropsWithChildren<{
    title?: string
    toolbar?: React.ReactNode
    sx?: SxProps
  }>
> = ({ children, title, toolbar, sx, ...rest }) => {
  return (
    <Box sx={{ p: "5.25rem 4.625rem 0 2.5rem", flexGrow: 1, ...sx }} {...rest}>
      <Box sx={{ maxWidth: { lg: 975, xl: "auto" }, minWidth: 975, width: "100%" }}>
        {(title || toolbar) && (
          <Box
            sx={{
              display: "flex",
              pt: "2.5rem",
              pb: "1rem",
              alignItems: "center",
            }}
          >
            <Typography.Heading
              sx={{
                fontSize: "1.5rem",
                lineHeight: "2rem",
                color: "black",
              }}
            >
              {title}
            </Typography.Heading>

            <Box sx={{ ml: "1.5rem", flexGrow: 1 }}>{toolbar}</Box>
          </Box>
        )}
        {children}
      </Box>
      <AdminFooter />
    </Box>
  )
}
