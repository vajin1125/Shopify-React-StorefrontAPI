import React, { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"

import { Typography, Box } from "src/UILibrary"

export const InputField: React.FC<PropsWithChildren<{ label: string; editMode?: boolean }>> = ({
  label,
  editMode = false,
  children,
}) => {
  const { t } = useTranslation()

  const commonStyles = {
    fontWeight: 600,
    lineHeight: "1.25rem",
    letterSpacing: "2px",
    mb: "0.375rem",
    width: "178px",
    textAlign: "center",
    flexShrink: 0,
  }

  const labelStyles = editMode
    ? {
        ...commonStyles,
        width: { xs: "100%", md: 180 },
        py: { xs: 0, md: 1.5 },
        textAlign: { xs: "left", md: "center" },
        color: "text.primary",
        bgcolor: { xs: "background.default", md: "background.paper" },
        borderRadius: 1.25,
      }
    : {
        ...commonStyles,
        mr: 2.5,
        textAlign: { xs: "left", md: "center" },
      }

  const containerStyles = editMode
    ? {
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        gap: { xs: 0.75, md: 2.5 },
        mb: 1.5,
      }
    : {
        mt: 1.5,
        display: { sm: "block", md: "flex" },
        alignItems: "center",
      }

  return (
    <Box sx={containerStyles}>
      <Typography.Description sx={labelStyles}>{t(label)}</Typography.Description>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          ...(editMode
            ? {
                px: 2.5,
                py: 0.75,
                width: "100%",
              }
            : {}),
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
