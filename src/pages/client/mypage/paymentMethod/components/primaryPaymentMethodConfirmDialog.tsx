import React from "react"
import { Box, Dialog, Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { Typography } from "src/UILibrary/typography"
import { useCustomerSession } from "src/modules/customerSessionProvider"
import { useUpdateDefaultPaymentMethod } from "src/queries/paymentMethod"
import { useErrorHandler } from "src/hooks/useErrorHandler"

interface PrimaryPaymentMethodConfirmDialogProps {
  open: boolean
  setOpen: Function
  paymentMethod: string
}

export const PrimaryPaymentMethodConfirmDialog: React.FC<
  PrimaryPaymentMethodConfirmDialogProps
> = ({ open, setOpen, paymentMethod }) => {
  const { t } = useTranslation()
  const session = useCustomerSession()
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  const { mutate: updateDefaultPaymentMethod, isLoading: isEditing } =
    useUpdateDefaultPaymentMethod({
      onSuccess: () => {
        setOpen(false)
        queryClient.invalidateQueries(["getPaymentMethods"])
      },
      onError: (err: AxiosError) => {
        console.error(err.response)
        handleError(err)
      },
    })

  const handleUpdatePaymentMethod = () => {
    updateDefaultPaymentMethod({
      customerId: session?.value.id || "",
      defaultCardId: "",
      data: { defaultPaymentMethod: paymentMethod },
      token: session?.value.writeCustomerAccessToken || "",
    })
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        zIndex: 10002,
      }}
    >
      <Box sx={{ bgcolor: "background.default", px: 3, py: 3.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 0.5 }}>
          <Typography.SubTitle sx={{ color: "primary.main" }}>{paymentMethod}</Typography.SubTitle>
          <Typography.SubTitle sx={{ color: "text.primary" }}>{t("mypage.of")}</Typography.SubTitle>
        </Box>
        <Typography.SubTitle sx={{ color: "text.primary", textAlign: "center", mb: 3 }}>
          {t("mypage.set_as_primary_payment_method")}
        </Typography.SubTitle>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
          <Button
            sx={{ width: 140, color: "text.secondary", p: 1, borderRadius: 8, fontWeight: 600 }}
            onClick={() => setOpen(false)}
          >
            {t("mypage.cancel")}
          </Button>
          <Button
            variant="contained"
            disabled={isEditing}
            onClick={handleUpdatePaymentMethod}
            sx={{ width: 140, color: "background.default", p: 1, borderRadius: 8, fontWeight: 600 }}
          >
            {t("mypage.set")}
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
