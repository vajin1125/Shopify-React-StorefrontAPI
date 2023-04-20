import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useCartItemCount } from "src/modules/cartItemCountProvider"

import { IconProps } from "src/types/icon"
import { Typography, Box, Badge } from "src/UILibrary"

export const TabItem: React.FC<{
  Icon: React.FC<IconProps>
  label: string
  link: string
  disabled?: boolean
}> = ({ Icon, label, link, disabled }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const cartItemCount = useCartItemCount()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onClick={() => navigate(link)}
    >
      {link === "/cart" ? (
        <Badge
          badgeContent={cartItemCount?.value || 0}
          sx={{
            "& .MuiBadge-badge": {
              right: -6,
              top: 4,
              color: !disabled ? "primary.main" : "text.secondary",
              bgcolor: "background.default",
              width: "10px",
              fontSize: "0.625rem",
            },
          }}
        >
          <Icon width="23" height="25" color={!disabled ? "#E8244D" : "#919191"} />
        </Badge>
      ) : (
        <Icon width="23" height="25" color={!disabled ? "#E8244D" : "#919191"} />
      )}
      <Typography.Caption
        color={disabled ? "divider" : "primary.main"}
        sx={{
          fontWeight: "600",
          letterSpacing: "0.125rem",
          align: "center",
        }}
      >
        {t(label)}
      </Typography.Caption>
    </Box>
  )
}
