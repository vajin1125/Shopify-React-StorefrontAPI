import React from "react"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"

import { Box, TextField, Typography } from "src/UILibrary"

interface DatePickerProps {
  startDate?: string
  endDate?: string
  isStartDateDifferent?: boolean
  isEndDateDifferent?: boolean
  onStartDateChange?: Function
  onEndDateChange?: Function
}

export const DatePicker: React.FC<DatePickerProps> = ({
  startDate,
  endDate,
  isStartDateDifferent,
  isEndDateDifferent,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <Box sx={{ height: "40px", display: "flex", alignItems: "center" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          inputFormat="YYYY/MM/DD"
          value={startDate || ""}
          onChange={(value: Dayjs | null) =>
            !!onStartDateChange && onStartDateChange(value ? value.format("YYYY/MM/DD") : "")
          }
          renderInput={(params) => (
            <TextField
              sx={{
                maxWidth: "180px",
                "& input": {
                  p: "0.375rem 1rem",
                  lineHeight: "2rem",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                },
                "& .MuiInputAdornment-root": {
                  ml: "-0.3rem",
                },
              }}
              {...params}
            />
          )}
        />
        {!!isStartDateDifferent && (
          <Typography.Description sx={{ fontWeight: 600, color: "primary.main", ml: 0.5 }}>
            *
          </Typography.Description>
        )}
        <Typography.Description sx={{ fontWeight: 600, mx: 1.5 }}>~</Typography.Description>
        <DesktopDatePicker
          inputFormat="YYYY/MM/DD"
          value={endDate || ""}
          onChange={(value: Dayjs | null) =>
            !!onEndDateChange && onEndDateChange(value ? value.format("YYYY/MM/DD") : "")
          }
          renderInput={(params) => (
            <TextField
              sx={{
                maxWidth: "180px",
                "& input": {
                  p: "0.375rem 1rem",
                  lineHeight: "2rem",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                },
                "& .MuiInputAdornment-root": {
                  ml: "-0.3rem",
                },
              }}
              {...params}
            />
          )}
        />
        {!!isEndDateDifferent && (
          <Typography.Description sx={{ fontWeight: 600, color: "primary.main", ml: 0.5 }}>
            *
          </Typography.Description>
        )}
      </LocalizationProvider>
    </Box>
  )
}
