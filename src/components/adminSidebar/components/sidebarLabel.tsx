import React from "react"
import { useNavigate } from "react-router-dom"

import { Box, Typography } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const SidebarLabel = ({
  label,
  Icon,
  link,
  iconProps,
  labelProps,
}: {
  label: string
  Icon?: React.FC<IconProps>
  link?: string
  iconProps?: Record<string, any>
  labelProps?: Record<string, any>
}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    !!link && navigate(link)
  }
  const { sx: iconSx, ...iconRestProps } = iconProps || {}
  const { sx: labelSx, ...labelRestProps } = labelProps || {}

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderColor: "divider",
        "&:hover": {
          cursor: "pointer",
          "& p": {
            color: "primary.main",
          },
        },
      }}
      onClick={handleClick}
    >
      {!!Icon && (
        <Icon
          width="18"
          height="18"
          sx={{ width: "1.125rem", height: "1.125rem", mr: "0.5rem", ...iconSx }}
          {...iconRestProps}
        />
      )}
      <Typography.Description
        sx={{
          lineHeight: "2rem",
          fontWeight: 500,
          pl: !Icon ? "1.75rem" : 0,
          letterSpacing: "2px",
          color: "text.secondary",
          ...labelSx,
        }}
        {...labelRestProps}
      >
        {label}
      </Typography.Description>
    </Box>
  )
}
