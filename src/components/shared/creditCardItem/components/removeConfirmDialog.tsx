import React from "react"
import { Box, Dialog, Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { Typography } from "src/UILibrary/typography"
import { ICard } from "src/types/paymentMethod"
import { useCustomerSession } from "src/modules/customerSessionProvider"
import { useDeleteCreditCard } from "src/queries/paymentMethod"
import { useErrorHandler } from "src/hooks/useErrorHandler"

interface RemoveConfirmDialogProps {
  open: boolean
  setOpen: Function
  creditCard?: ICard
}

export const RemoveConfirmDialog: React.FC<RemoveConfirmDialogProps> = ({
  open,
  setOpen,
  creditCard,
}) => {
  const { t } = useTranslation()
  const session = useCustomerSession()
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  const { mutate: deleteCreditCard, isLoading: isDeleting } = useDeleteCreditCard({
    onSuccess: () => {
      setOpen(false)
      queryClient.invalidateQueries(["getPaymentMethods"])
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
      handleError(err)
    },
  })

  const handleDelete = () => {
    deleteCreditCard({
      id: creditCard?.paymentMethodId || "",
      token: session?.value.writeCustomerAccessToken || "",
    })
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ bgcolor: "background.default", px: 3, py: 3.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
          <Typography.SubTitle
            sx={{ color: "primary.main" }}
          >{`${creditCard?.brand.toUpperCase()}****${creditCard?.last4}`}</Typography.SubTitle>
          <Typography.SubTitle sx={{ color: "text.primary" }}>
            {t("mypage.sure_delete")}
          </Typography.SubTitle>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
          <Button
            sx={{ width: 140, color: "text.secondary", p: 1, borderRadius: 8, fontWeight: 600 }}
            onClick={() => setOpen(false)}
          >
            {t("mypage.cancel")}
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            disabled={isDeleting}
            sx={{ width: 140, color: "background.default", p: 1, borderRadius: 8, fontWeight: 600 }}
          >
            {t("mypage.set")}
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
