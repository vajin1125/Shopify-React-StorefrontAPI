import { styled } from "@mui/material"

import { Button } from "src/UILibrary"

export const RoundButton = styled(Button)(({ theme }) => ({
  borderRadius: "24px",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: theme.palette.background.default,
  p: "0.75rem 1.25rem",
  "&:hover": {
    borderWidth: "2px",
  },
}))
