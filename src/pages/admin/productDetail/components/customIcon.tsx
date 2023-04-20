import React from "react"
import { useTranslation } from "react-i18next"

import { Typography, Box, Button } from "src/UILibrary"

export const CustomIcon = ({ errorMessage }: { errorMessage?: string }) => {
  const { t } = useTranslation()

  return (
    <Box mt={1}>
      <Typography.Description sx={{ mb: "0.5rem", color: "text.secondary", lineHeight: "1.25rem" }}>
        {t("admin.productdetail.or")}
      </Typography.Description>
      <Button
        sx={{
          color: "text.secondary",
          fontSize: "0.75rem",
          p: "0.375rem 1.25rem",
          bgcolor: "info.dark",
          fontWeight: 600,
        }}
      >
        {t("admin.productdetail.select_files")}
      </Button>
      {errorMessage && (
        <Typography.Description sx={{ color: "error.main" }}>{errorMessage}</Typography.Description>
      )}
    </Box>
  )
}
