import React from "react"
import { Box, Dialog, Button } from "@mui/material"
import { useTranslation } from "react-i18next"

import { Typography } from "src/UILibrary/typography"

interface ConfirmDialogProps {
  open: boolean
  setOpen: Function
  label: string | React.ReactNode
  confirmLabel: string
  onConfirm?: Function
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  setOpen,
  label,
  confirmLabel,
  onConfirm,
}) => {
  const { t } = useTranslation()

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ bgcolor: "background.default", px: 3, py: 3.5 }}>
        {typeof label === "string" ? (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
            <Typography.SubTitle sx={{ color: "text.primary", textAlign: "center" }}>
              {label}
            </Typography.SubTitle>
          </Box>
        ) : (
          label
        )}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
          <Button
            sx={{ width: 140, color: "text.secondary", p: 1, borderRadius: 8, fontWeight: 600 }}
            onClick={() => setOpen(false)}
          >
            {t("mypage.cancel")}
          </Button>
          <Button
            variant="contained"
            sx={{ width: 140, color: "background.default", p: 1, borderRadius: 8, fontWeight: 600 }}
            onClick={() => !!onConfirm && onConfirm()}
          >
            {confirmLabel}
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
