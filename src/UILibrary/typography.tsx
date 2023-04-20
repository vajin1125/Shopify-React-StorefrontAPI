import React from "react"

import { Typography as MuiTypography, TypographyProps } from "@mui/material"

const TypographyComponentWithStyles = (defaultStyles: TypographyProps) => {
  const TextComponent = ({ children, ...rest }: TypographyProps) => {
    return (
      <MuiTypography {...defaultStyles} {...rest}>
        {children}
      </MuiTypography>
    )
  }

  return TextComponent
}

export const Typography = {
  Large: TypographyComponentWithStyles({
    fontSize: { xs: "1.75rem", md: "2rem" },
    lineHeight: { xs: "1.75rem", md: "2rem" },
    fontWeight: 600,
  }),

  Heading: TypographyComponentWithStyles({
    fontSize: { xs: "1.125rem", md: "1.5rem" },
    lineHeight: { xs: "1.125rem", md: "1.5rem" },
    letterSpacing: "2px",
    fontWeight: 600,
  }),

  SubHead: TypographyComponentWithStyles({
    fontSize: "1.25rem",
    lineHeight: "1.25rem",
    letterSpacing: "2px",
    fontWeight: 600,
  }),

  Title: TypographyComponentWithStyles({
    fontSize: { xs: "0.875rem", md: "1.125rem" },
    lineHeight: { xs: "1.25rem", md: "1.75rem" },
    fontWeight: 600,
  }),

  SubTitle: TypographyComponentWithStyles({
    fontSize: { xs: "0.875rem", md: "1rem" },
    lineHeight: { xs: "1.25rem", md: "1.5rem" },
    fontWeight: 600,
  }),

  Description: TypographyComponentWithStyles({
    fontSize: "0.875rem",
    lineHeight: "0.875rem",
    fontWeight: 500,
  }),

  DetailHeading: TypographyComponentWithStyles({
    fontSize: { xs: "0.75rem", md: "0.875rem" },
    lineHeight: { xs: "0.75rem", md: "0.875rem" },
    fontWeight: 600,
  }),

  Action: TypographyComponentWithStyles({
    fontSize: "0.75rem",
    lineHeight: "0.75rem",
    fontWeight: 500,
  }),

  Caption: TypographyComponentWithStyles({
    fontSize: "0.625rem",
    lineHeight: "0.625rem",
    fontWeight: 500,
  }),
}
