import React from "react"
import { useTranslation } from "react-i18next"

import { Typography } from "src/UILibrary/typography"

export const MainBadge: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Typography.Action
      sx={{
        flexShrink: 0,
        color: "background.default",
        bgcolor: "primary.main",
        px: { xs: 1.5, md: 2 },
        py: { xs: 0.5, md: 0.75 },
        fontWeight: 600,
        borderRadius: 4,
      }}
    >
      {t("mypage.main")}
    </Typography.Action>
  )
}
