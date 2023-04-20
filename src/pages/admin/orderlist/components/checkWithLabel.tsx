import React from "react"

import { CheckIcon } from "src/assets/icons/CheckIcon"
import { Box, Typography } from "src/UILibrary"

export const CheckWithLabel = ({
  label,
  checked,
  onClick,
}: {
  label: string
  checked?: boolean
  onClick?: () => void
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {checked ? (
        <CheckIcon width="10" height="8" />
      ) : (
        <Box
          sx={{
            bgcolor: "primary.main",
            width: "12px",
            height: "12px",
            "&:hover": { cursor: "pointer" },
          }}
          onClick={onClick}
        />
      )}
      <Typography.Action sx={{ fontWeight: 400, lineHeight: "1.25rem", ml: "0.25rem" }}>
        {label}
      </Typography.Action>
    </Box>
  )
}
