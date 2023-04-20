import React, { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"

import { Typography, Dialog, DialogTitle, DialogContent, IconButton } from "src/UILibrary"
import { CloseIcon } from "src/assets/icons/CloseIcon"
import { Breakpoint } from "@mui/material"

export const Modal = ({
  open,
  title,
  children,
  handleClose,
  maxWidth,
}: PropsWithChildren<{
  open: boolean
  title?: string
  handleClose: () => void
  maxWidth?: Breakpoint
}>) => {
  const { t } = useTranslation()
  return (
    <Dialog
      PaperProps={{
        sx: {
          bgcolor: "background.default",
          borderRadius: "0.5rem",
        },
      }}
      onClose={handleClose}
      open={open}
      maxWidth={maxWidth}
    >
      {title && (
        <DialogTitle sx={{ m: 0, px: 2, py: 1.5 }}>
          <Typography.Title sx={{ color: "primary.main", textAlign: "center", lineHeight: "27px" }}>
            {t(title)}
          </Typography.Title>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon width="18" height="18" />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent
        sx={{
          width: "560px",
          px: "1.25rem",
          borderBottom: 0,
          borderTop: "1px solid",
          borderColor: "info.dark",
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
