import React from "react"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import { Box, SxProps } from "@mui/material"
import { TextField } from "./textfield"

export const Date = ({
  sx,
  value,
  onChange,
  ...rest
}: {
  sx?: SxProps
  value?: string
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | null, key?: string | undefined) => void
} & Record<string, any>) => {
  return (
    <Box sx={{ height: "40px", display: "flex", alignItems: "center" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              sx={{
                "& input": {
                  py: "0.75rem",
                  lineHeight: "1.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                },
                "& .MuiInputAdornment-root": {
                  ml: "-0.3rem",
                },
                ...sx,
              }}
              {...params}
              {...rest}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  )
}
