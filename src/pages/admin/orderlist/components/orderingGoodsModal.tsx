import React from "react"
import { useTranslation } from "react-i18next"

import { Modal } from "src/components/modal"
import { InputField } from "src/pages/admin/makerlist/components/inputField"
import { TextField, Box, Button, Date } from "src/UILibrary"

export const OrderingGoodsModal = ({
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
    <Modal handleClose={handleClose} open={open} title="admin.orderlist.ordering_goods">
      <Box mt={3} py={3} px={10}>
        <InputField label="admin.orderlist.student_number">
          <TextField
            disabled
            sx={{ "& input": { height: "20px", py: "0.75rem" } }}
            placeholder="000000/111111/222222/333333/444444"
          />
        </InputField>
        <InputField label="admin.orderlist.ordering_date">
          <Date
            value="01/23/2023"
            onChange={(val, key) => {
              console.log(val, key)
            }}
            fullWidth
          />
        </InputField>
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
          {t("admin.share.completion")}
        </Button>
      </Box>
    </Modal>
  )
}
