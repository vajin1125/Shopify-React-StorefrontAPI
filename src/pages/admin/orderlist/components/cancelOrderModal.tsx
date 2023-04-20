import React from "react"
import { useTranslation } from "react-i18next"
import { Box, Button } from "@mui/material"

import { Modal } from "src/components/modal"
import { TextField, Typography } from "src/UILibrary"

export const CancelOrderModal = ({
  open,
  handleOpen,
}: {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleOpen: (open: boolean) => void
}) => {
  const { t } = useTranslation()

  const handleClose = () => {
    handleOpen(false)
  }

  return (
    <Modal handleClose={handleClose} open={open}>
      <Box mt={4} mb={3.5}>
        <Typography.SubTitle textAlign="center" sx={{ letterSpacing: "2px" }}>
          {t("admin.orderlist.cancel_order_question_part1")}
        </Typography.SubTitle>
        <Typography.SubTitle textAlign="center" sx={{ letterSpacing: "2px" }}>
          {t("admin.orderlist.cancel_order_question_part2")}
        </Typography.SubTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography.Description
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              lineHeight: "1.25rem",
              textAlign: "center",
              mt: "0.625rem",
              mb: "0.375rem",
            }}
          >
            {t("admin.orderlist.student_number")}
          </Typography.Description>
          <TextField
            disabled
            sx={{
              "& input": {
                height: "20px",
                py: "0.75rem",
                bgcolor: "info.dark",
                textAlign: "center",
              },
            }}
            placeholder="000000/111111/222222/333333/444444"
          />
        </Box>
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
          onClick={handleClose}
        >
          {t("admin.orderlist.cancel")}
        </Button>
      </Box>
    </Modal>
  )
}
