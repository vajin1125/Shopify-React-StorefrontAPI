import React from "react"
import { Box, SwipeableDrawer } from "@mui/material"
import { useTranslation } from "react-i18next"

import { Typography } from "src/UILibrary/typography"
//import { AddCreditCard } from "../../purchase/components/addCreditCard"
//import { ConveniencePayment } from "../../purchase/components/conveniencePayment"
//import { PaymentMethodItem } from "../../purchase/components/paymentMethodItem"
//import { PaypayPayment } from "../../purchase/components/paypay"
import { MainBadge } from "src/components/shared/mainBadge"
import { CreditCardItem } from "src/components/shared/creditCardItem"
import { AddCreditCard } from "src/components/shared/creditCardForm"
import { ConveniencePayment } from "src/components/shared/conveniencePayment"
import { PaypayPayment } from "../../mypage/paymentMethod/components/paypayPayment"
import { CloseIcon } from "src/assets/icons/CloseIcon"
import { RoundButton } from "src/components/client/roundButton"
import { IPaymentMethod, DefaultPaymentMethod } from "src/types/paymentMethod"
import { AxiosError } from "axios"

export const SetMethodModal = ({
  open,
  handleOpen,
  paymentMethods,
  error,
  setDefaultPaymentMethod,
  setDefaultCard,
  setChangePaymentMethodDialogOpen,
  setChangeCreditCardDialogOpen,
}: {
  open: boolean
  handleOpen: Function
  paymentMethods?: IPaymentMethod
  error?: AxiosError | null
  setDefaultCard: Function
  setDefaultPaymentMethod: Function
  setChangePaymentMethodDialogOpen: Function
  setChangeCreditCardDialogOpen: Function
}) => {
  const { t } = useTranslation()

  const onDefaultPaymentChange = (newPaymentMethod: DefaultPaymentMethod, newCard = null) => {
    setDefaultPaymentMethod(newPaymentMethod)
    if (newCard) {
      setDefaultCard(newCard)
      setChangeCreditCardDialogOpen(true)
      return
    }
    setChangePaymentMethodDialogOpen(true)
  }

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => handleOpen(false)}
      onOpen={() => handleOpen(true)}
      sx={{
        zIndex: 10001,
      }}
      PaperProps={{
        sx: { bgcolor: "background.default", bottom: 0, boxShadow: "none" },
      }}
    >
      <Box
        sx={{
          height: "30px",
          minHeight: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          bgcolor: "secondary.main",
          pr: 1,
        }}
      >
        <Typography.Action onClick={() => handleOpen(false)}>
          <CloseIcon width="18" height="18" color="#909090" />
        </Typography.Action>
      </Box>
      <Box sx={{ px: 2, display: "flex", flexDirection: "column", gap: "24px", mt: 3, mb: 8 }}>
        {/* <Box>
          <Typography.Action>{t("purchase.pay_by_credit_card")}</Typography.Action>
          <PaymentMethodItem serial="****8888" date="09/22" selected />
          <PaymentMethodItem serial="****4444" date="01/25" />
          <Box mt={1}>
            <AddCreditCard />
          </Box>
        </Box>
        <Box>
          <ConveniencePayment selected />
        </Box>
        <Box>
          <PaypayPayment />
        </Box> */}
        <Box sx={{ px: { xs: 0, md: 9 } }}>
          <Typography.Heading sx={{ color: "primary.main", mb: 3 }}>
            {t("mypage.payment_method")}
          </Typography.Heading>
          <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 1, md: 2 }, gap: 1 }}>
            <Typography.SubTitle sx={{ color: "text.primary" }}>
              {t("mypage.credit_cards")}
            </Typography.SubTitle>
            {paymentMethods?.defaultPaymentMethod === "card" && <MainBadge />}
          </Box>
          {error ? (
            <Typography.Description color="error" sx={{ textAlign: "center" }}>
              {error?.message}
            </Typography.Description>
          ) : paymentMethods?.creditcard.cards.length ? (
            paymentMethods?.creditcard.cards.map((creditcard) => {
              return (
                <CreditCardItem
                  key={creditcard.paymentMethodId}
                  last4Number={creditcard.last4}
                  expiredDate={`${creditcard.expMonth}/${creditcard.expYear}`}
                  data={creditcard}
                  selected={paymentMethods.creditcard.defaultCardId === creditcard.paymentMethodId}
                  setDefault={onDefaultPaymentChange}
                />
              )
            })
          ) : (
            <Typography.Description sx={{ textAlign: "center", py: 2 }}>
              {t("mypage.no_cards_found")}
            </Typography.Description>
          )}
          <Box sx={{ pr: { xs: 0, md: 5 }, mb: { xs: 3, md: 5 } }}>
            <AddCreditCard />
          </Box>
          <ConveniencePayment
            isMain={paymentMethods?.defaultPaymentMethod === "konbini"}
            setDefault={onDefaultPaymentChange}
          />
          <PaypayPayment
            isMain={paymentMethods?.defaultPaymentMethod === "paypay"}
            isLinked={paymentMethods?.paypay.isConnected}
            setDefault={onDefaultPaymentChange}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <RoundButton variant="contained" color="primary" onClick={() => handleOpen(false)}>
            {t("productDetail.use_payment_method")}
          </RoundButton>
          <RoundButton
            onClick={() => handleOpen(false)}
            variant="outlined"
            sx={{ color: "text.secondary", border: "2px solid", borderColor: "text.secondary" }}
          >
            {t("productDetail.go_back")}
          </RoundButton>
        </Box>
      </Box>
    </SwipeableDrawer>
  )
}
