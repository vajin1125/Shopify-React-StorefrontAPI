import React from "react"
import { TextField as MuiTextField, TextFieldProps } from "@mui/material"

export const TextField = ({ children, sx, ...rest }: TextFieldProps) => {
  return (
    <MuiTextField
      sx={{
        backgroundColor: "background.default",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "divider",
            borderRadius: "5px",
          },
          "&.MuiInputBase-multiline": {
            p: "0.375rem, 0.5rem",
          },
        },
        "& input": {
          fontSize: { md: "0.75rem", xs: "0.875rem" },
          lineHeight: "1.25rem",
          letterSpacing: "2px",
          p: { md: "1rem 1rem", xs: "0.8125rem 0.9375rem 0.6875rem 0.9375rem" },
          fontWeight: 600,
          color: "text.primary",
        },
        "& textarea": {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontWeight: 600,
          color: "text.primary",
          p: "0.375rem 0.5rem",
        },
        "& .MuiInputBase-adornedStart": {
          pl: "0.5rem",
          "& input": {
            pl: "0.125rem",
          },
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiTextField>
  )
}
