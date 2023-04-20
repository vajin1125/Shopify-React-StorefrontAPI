import React from "react"
import { Grid, Box } from "@mui/material"

import { Typography } from "src/UILibrary/typography"

interface PaymentItemProps {
  value: string
  label: string
  selected: string
  setSelected: Function
}

export const PaymentItem: React.FC<PaymentItemProps> = ({
  value,
  label,
  selected,
  setSelected,
}) => {
  return (
    <Grid item xs={6}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: value === selected ? "primary.main" : "divider",
          borderRadius: 1.25,
          px: { xs: 2.5, md: 3.75 },
          py: { xs: 1.25, md: 2.5 },
          cursor: "pointer",
          "&:hover": {
            borderColor: "primary.main",
            transition: "all 0.2s ease-in",
          },
        }}
        onClick={() => setSelected(value)}
      >
        <Box sx={{ width: 20, height: 20, bgcolor: "gray", mb: { xs: 0.5, md: 0 } }} />
        <Typography.Action
          sx={{
            fontWeight: 600,
            ml: { xs: 0, md: 1.25 },
            color: value === selected ? "primary.main" : "text.secondary",
          }}
        >
          {label}
        </Typography.Action>
      </Box>
    </Grid>
  )
}
