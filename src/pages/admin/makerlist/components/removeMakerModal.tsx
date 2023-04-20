import React from "react"
import { useTranslation } from "react-i18next"
import { Box, Button } from "@mui/material"

import { Modal } from "src/components/modal"
import { Maker } from "src/types/maker"
import { Typography } from "src/UILibrary"

export const RemoveMakerModal = ({
  open,
  handleOpen,
  maker,
  onConfirm,
}: {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleOpen: (open: boolean) => void
  maker?: Maker
  onConfirm?: () => void
}) => {
  const { t } = useTranslation()

  const handleClose = () => {
    handleOpen(false)
  }

  const name = `${maker?.name}/${maker?.representativeName}`
  const of = t("admin.share.of")
  const msg = `${t("admin.share.remove")}${t("admin.share.will_you_do?")}`

  return (
    <Modal handleClose={handleClose} open={open}>
      <Box mt={4} mb={3.5}>
        <Typography.SubTitle textAlign="center" sx={{ letterSpacing: "2px" }}>
          <Typography.SubTitle
            color="primary"
            sx={{ display: "inline-block", letterSpacing: "2px" }}
          >
            {name}
          </Typography.SubTitle>
          {of}
        </Typography.SubTitle>
        <Typography.SubTitle textAlign="center" sx={{ letterSpacing: "2px" }}>
          {msg}
        </Typography.SubTitle>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          mt: 3,
          mb: 2.5,
        }}
      >
        <Button
          sx={{
            color: "text.secondary",
            width: "150px",
            height: "44px",
            "&:hover": {
              color: "text.primary",
            },
          }}
          onClick={handleClose}
        >
          {t("admin.share.cancel")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "150px",
            height: "44px",
            color: "background.default",
            borderRadius: 0,
          }}
          onClick={() => !!onConfirm && onConfirm()}
        >
          {t("admin.share.remove")}
        </Button>
      </Box>
    </Modal>
  )
}
