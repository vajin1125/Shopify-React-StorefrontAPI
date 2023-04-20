import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Checkbox, CheckboxProps, SxProps } from "@mui/material"
import { Typography } from "./typography"

export const CheckboxItem = ({
  sx,
  label,
  labelSx,
  ...rest
}: CheckboxProps & { label: string; labelSx?: SxProps }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: "flex", mr: "1rem", alignItems: "center" }}>
      <Checkbox sx={{ p: 0, "& .MuiSvgIcon-root": { fontSize: "0.875rem" }, ...sx }} {...rest} />
      <Typography.Action sx={{ fontWeight: 400, lineHeight: "1.25rem", ml: "0.25rem", ...labelSx }}>
        {t(label)}
      </Typography.Action>
    </Box>
  )
}
