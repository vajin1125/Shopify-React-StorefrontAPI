import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Typography } from "src/UILibrary"

export const Navigation = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        pl: "30px",
        pr: "33px",
        display: "flex",
        mt: "1.5rem",
        width: "100%",
        boxSizing: "border-box",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "250px",
          minWidth: "154px",
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: "13px",
          border: "2px solid",
          borderColor: "primary.main",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Typography.SubTitle
          sx={{
            lineHeight: "1.5rem",
            color: "primary.main",
          }}
        >
          {t("auth.school_officials")}
        </Typography.SubTitle>
      </Box>
      <Box
        sx={{
          maxWidth: "250px",
          minWidth: "156px",
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: "0.8125rem",
          border: "2px solid",
          borderColor: "divider",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Typography.SubTitle
          sx={{
            lineHeight: "1.5rem",
            color: "divider",
          }}
        >
          {t("auth.related_traders")}
        </Typography.SubTitle>
      </Box>
    </Box>
  )
}
