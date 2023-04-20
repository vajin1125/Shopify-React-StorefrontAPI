import React from "react"

import { Box, Image, Typography } from "src/UILibrary"
import ProductDefaultBG from "src/assets/imgs/productDefaultBG.png"

interface PaginationItemProps {
  src?: string
  alt?: string | null
  description?: string
}

export const PaginationItem: React.FC<PaginationItemProps> = ({ alt, src, description }) => {
  return (
    <Box position="relative" pb="1.875rem">
      <Image
        src={src || ProductDefaultBG}
        alt={alt || "ProductDefaultImage"}
        sx={{ "& img": { width: "100%" } }}
      />
      {description && (
        <Typography.Description
          sx={{
            boxSizing: "border-box",
            position: "absolute",
            fontWeight: "600",
            lineHeight: "1.875rem",
            pl: "0.375rem",
            bgcolor: "primary.main",
            bottom: "1.875rem",
            left: 0,
            color: "background.default",
            width: "100%",
          }}
        >
          {description}
        </Typography.Description>
      )}
    </Box>
  )
}
