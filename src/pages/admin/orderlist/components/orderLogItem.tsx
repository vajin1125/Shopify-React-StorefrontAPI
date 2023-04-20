import React from "react"

import { Box, Typography } from "src/UILibrary"

export const OrderLogItem: React.FC<{
  date: string
  description: string
}> = ({ date, description }) => {
  return (
    <Box sx={{ display: "flex", mb: "0.5rem" }}>
      <Typography.Description
        sx={{
          lineHeight: "1.125rem",
          mt: "0.25rem",
          minWidth: "120px",
          flexShrink: 0,
          mr: "1rem",
        }}
      >
        {date}
      </Typography.Description>
      <Typography.Description sx={{ lineHeight: "1.125rem", mt: "0.25rem", flexGrow: 1 }}>
        {description}
      </Typography.Description>
    </Box>
  )
}
