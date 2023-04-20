import React from "react"
import { useTranslation } from "react-i18next"

import { TextField, Typography, TextFieldProps, Box } from "src/UILibrary"

interface AddornmentLabelFieldProps {
  value?: string | number
  // eslint-disable-next-line no-unused-vars
  handleChange?: (value: string) => void
}

export const AddornmentLabelField: React.FC<TextFieldProps & AddornmentLabelFieldProps> = ({
  label,
  type,
  children,
  sx,
  value,
  handleChange,
  ...rest
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: "flex" }}>
      <Typography.Action
        sx={{
          p: "0.375rem 1.25rem",
          fontWeight: 600,
          lineHeight: "1.25rem",
          letterSpacing: "2px",
          bgcolor: "info.dark",
          height: "1.25rem",
          flexShrink: 0,
        }}
      >
        {t(label as string)}
      </Typography.Action>
      {type === "input" || type === "select" ? (
        <TextField
          type={type}
          sx={{
            flexGrow: 1,
            "& input": {
              p: "0.375rem 1rem",
              height: "1rem",
              border: "2px solid",
              borderColor: "info.dark",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: 0,
                borderColor: "info.dark",
              },
            },
            "& .MuiSelect-select": {
              py: "0.25rem",
              lineHeight: "1.5rem",
            },
            ...sx,
          }}
          select={type === "select"}
          value={value}
          onChange={(e) => {
            !!handleChange && handleChange(e.target.value)
          }}
          {...rest}
        >
          {children}
        </TextField>
      ) : (
        <>{children}</>
      )}
    </Box>
  )
}
