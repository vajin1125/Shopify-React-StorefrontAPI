import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Image, Typography } from "src/UILibrary"

export const MobileCategoryItem: React.FC<{ icon: string; label: string; onClick: () => void }> = ({
  icon,
  label,
  onClick,
}) => {
  const { t } = useTranslation()
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid",
        borderColor: "divider",
        height: "165px",
      }}
    >
      <Image src={icon} alt={label} />
      <Typography.SubTitle
        color="primary.main"
        sx={{
          fontWeight: "500",
          mt: "1rem",
          lineHeight: "0.875rem",
          letterSpacing: "0.125rem",
          align: "center",
        }}
      >
        {t(label)}
      </Typography.SubTitle>
    </Box>
  )
}
