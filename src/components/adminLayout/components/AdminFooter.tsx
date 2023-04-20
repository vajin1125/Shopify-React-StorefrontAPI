import React from "react"

import { FOOTER_CONSTANT } from "src/constants/footer"
import { Typography } from "src/UILibrary"

export const AdminFooter = () => {
  return (
    <Typography.Caption
      sx={{
        position: "fixed",
        width: "calc(100vw - 250px)",
        right: 0,
        bottom: 0,
        lineHeight: "1.5rem",
        textAlign: "center",
        bgcolor: "primary.dark",
        color: "background.default",
      }}
    >
      {FOOTER_CONSTANT}
    </Typography.Caption>
  )
}
