import React from "react"

import { TextField, Typography, Box, TextFieldProps } from "src/UILibrary"

interface TextFieldWithLabelProps {
  label: string
  labelProps?: Record<string, any>
}

export const TextFieldWithLabel: React.FC<TextFieldProps & TextFieldWithLabelProps> = ({
  label,
  type,
  labelProps,
  ...rest
}) => {
  const { sx = {}, ...labelPropsRest } = labelProps || {}

  return (
    <Box>
      <Typography.Description
        sx={{
          fontWeight: 600,
          lineHeight: "1.25rem",
          letterSpacing: "2px",
          mb: "5px",
          ...sx,
        }}
        {...labelPropsRest}
      >
        {label}
      </Typography.Description>
      <TextField type={type} {...rest} />
    </Box>
  )
}
