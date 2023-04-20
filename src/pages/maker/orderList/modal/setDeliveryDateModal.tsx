import React from "react"
import { useTranslation } from "react-i18next"

import { TextField, Box, Button, Typography } from "src/UILibrary"
import { Modal } from "src/components/modal"
import { TextFieldWithLabel } from "src/components/shared/textfieldWithLabel"

export const SetDeliveryDateModal = ({
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
    <Modal handleClose={handleClose} open={open} title="maker.orderlist.set_delivery_date">
      <Box sx={{ py: 3, px: 10, mt: 3, bgcolor: "#FAFAFA" }}>
        <Typography.SubTitle sx={{ fontWeight: 400, lineHeight: "1.25rem", mb: 5 }}>
          {t("maker.orderlist.notify_delivery_date")}
        </Typography.SubTitle>
        <TextFieldWithLabel
          label={t("maker.orderlist.product")}
          sx={{
            "& input": { py: "0.75rem", height: "1.25rem" },
            "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "info.dark" } },
            bgcolor: "info.dark",
          }}
          placeholder="商品 AA (A個), 商品 BB(B個)"
        />
        <Box sx={{ my: "0.625rem" }}>
          <Typography.Description
            sx={{ fontWeight: 600, lineHeight: "1.25rem", letterSpacing: "2px", mb: "0.375rem" }}
          >
            {t("maker.orderlist.delivery_date")}
          </Typography.Description>
          <Box sx={{ height: "44px", display: "flex", alignItems: "center" }}>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="MM/DD/YYYY"
                value="10/11/2022"
                onChange={() => {}}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      width: "180px",
                      "& input": {
                        p: "0.75rem 1rem",
                        lineHeight: "2.5rem",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                      },
                    }}
                    {...params}
                  />
                )}
              />
              <Typography.Description sx={{ fontWeight: 600, mx: "0.875rem" }}>
                ~
              </Typography.Description>
              <DesktopDatePicker
                inputFormat="MM/DD/YYYY"
                value="10/11/2022"
                onChange={() => {}}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      width: "180px",
                      "& input": {
                        p: "0.75rem 1rem",
                        lineHeight: "2.5rem",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                      },
                    }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider> */}
          </Box>
        </Box>
        <TextFieldWithLabel
          sx={{
            "& input": { py: "0.75rem", height: "1.25rem" },
            "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "info.dark" } },
          }}
          label={t("maker.orderlist.message")}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          paddingTop: "1.5rem",
          paddingBottom: "2.625rem",
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
          {t("admin.productdetail.cancel")}
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
          {t("maker.orderlist.confirm")}
        </Button>
      </Box>
    </Modal>
  )
}
