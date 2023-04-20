import React, { useState } from "react"
import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"

import { Typography } from "src/UILibrary/typography"
import { MainBadge } from "src/components/shared/mainBadge"
import { CreditCardItem } from "src/components/shared/creditCardItem"
import { AddCreditCard } from "src/components/shared/creditCardForm"
import { ConveniencePayment } from "src/components/shared/conveniencePayment"
import { LoadingModal } from "src/components/shared/loadingModal"
import { PaypayPayment } from "./components/paypayPayment"
import { PrimaryPaymentMethodConfirmDialog } from "./components/primaryPaymentMethodConfirmDialog"
import { PrimaryCreditCardConfirmDialog } from "./components/primaryCreditCardConfirmDialog"
import { useCustomerSession } from "src/modules/customerSessionProvider"
import { useGetPaymentMethods } from "src/queries/paymentMethod"
import { DefaultPaymentMethod, ICard } from "src/types/paymentMethod"

export const PaymentMethod: React.FC = () => {
  const { t } = useTranslation()
  const [changePaymentMethodDialogOpen, setChangePaymentMethodDialogOpen] = useState<boolean>(false)
  const [changeCreditCardDialogOpen, setChangeCreditCardDialogOpen] = useState<boolean>(false)
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<DefaultPaymentMethod>("card")
  const [defaultCard, setDefaultCard] = useState<ICard | null>(null)

  const session = useCustomerSession()

  const {
    data: paymentMethods,
    isLoading,
    error,
  } = useGetPaymentMethods(session?.value.readCustomerAccessToken || "")

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
    <Box sx={{ flexGrow: 1, mt: { md: 18, xs: 6 }, mb: 12.5, px: 2 }}>
      <Box sx={{ px: { xs: 0, md: 9 } }}>
        <Typography.Heading sx={{ color: "primary.main", mb: 3 }}>
          {t("mypage.payment_method")}
        </Typography.Heading>
        <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 1, md: 2 }, gap: 1 }}>
          <Typography.SubTitle sx={{ color: "text.primary" }}>
            {t("mypage.credit_cards")}
          </Typography.SubTitle>
          {paymentMethods?.data.defaultPaymentMethod === "card" && <MainBadge />}
        </Box>
        {error ? (
          <Typography.Description color="error" sx={{ textAlign: "center" }}>
            {error?.message}
          </Typography.Description>
        ) : paymentMethods?.data.creditcard.cards.length ? (
          paymentMethods?.data.creditcard.cards.map((creditcard) => {
            return (
              <CreditCardItem
                key={creditcard.paymentMethodId}
                last4Number={creditcard.last4}
                expiredDate={`${creditcard.expMonth}/${creditcard.expYear}`}
                data={creditcard}
                canEdit
                selected={
                  paymentMethods.data.creditcard.defaultCardId === creditcard.paymentMethodId
                }
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
          isMain={paymentMethods?.data.defaultPaymentMethod === "konbini"}
          setDefault={onDefaultPaymentChange}
        />
        <PaypayPayment
          isMain={paymentMethods?.data.defaultPaymentMethod === "paypay"}
          isLinked={paymentMethods?.data.paypay.isConnected}
          setDefault={onDefaultPaymentChange}
        />
      </Box>
      <PrimaryPaymentMethodConfirmDialog
        open={changePaymentMethodDialogOpen}
        setOpen={setChangePaymentMethodDialogOpen}
        paymentMethod={defaultPaymentMethod}
      />
      <PrimaryCreditCardConfirmDialog
        open={changeCreditCardDialogOpen}
        setOpen={setChangeCreditCardDialogOpen}
        creditCard={defaultCard}
      />
      <LoadingModal open={isLoading} />
    </Box>
  )
}
