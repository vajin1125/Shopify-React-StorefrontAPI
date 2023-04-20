import React from "react"

import { TextField, TextFieldProps } from "src/UILibrary"

export const DateInput: React.FC<TextFieldProps> = ({ sx, ...rest }) => {
  return (
    <TextField
      variant="standard"
      sx={{
        flexGrow: 1,
        "& input": {
          py: 0.5,
          px: 0.25,
          lineHeight: "2.5rem",
          fontSize: "0.875rem",
          fontWeight: 400,
        },
        "& .MuiInput-root": {
          "&:hover": {
            "&:before": {
              border: 0,
            },
          },
          "&:before": {
            border: 0,
          },
          "&:after": {
            border: 0,
          },
        },
        "& .MuiInputAdornment-root": {
          m: 0,
          pr: 1.25,
        },
        "& .MuiButtonBase-root": {
          p: 0.5,
        },
        ...sx,
      }}
      {...rest}
    />
  )
}
