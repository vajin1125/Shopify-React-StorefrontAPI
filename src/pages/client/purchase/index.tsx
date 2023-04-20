import React from "react"
import { useTranslation } from "react-i18next"

import { PageContainer } from "src/components/client/pageContainer"
import { Typography, Box, Grid } from "src/UILibrary"
import { CreditCardItem } from "./components/creditCardItem"
import { AddCreditCard } from "./components/addCreditCard"
import { ConveniencePayment } from "./components/conveniencePayment"
import { PaypayPayment } from "./components/paypay"
import { PurchaseCard } from "./components/purchaseCard"

export const Purchase = () => {
  const { t } = useTranslation()

  return (
    <PageContainer
      title={t("purchase.payment_information")}
      sx={{ pr: { md: 15 }, pl: { md: 18 }, pb: { md: 10 } }}
    >
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={8}>
          <Box mt={3}>
            <Typography.Action sx={{ color: "text.primary", mb: 1 }}>
              {t("purchase.pay_by_credit_card")}
            </Typography.Action>
            <CreditCardItem last4Number="8888" expiredDate="09/22" />
            <CreditCardItem last4Number="4444" expiredDate="01/25" />
            <AddCreditCard />
          </Box>
          <ConveniencePayment />
          <PaypayPayment />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box sx={{ mt: { sm: 5, md: 0 }, mb: 2 }}>
            <PurchaseCard itemCount={1} subtotal={2200} />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  )
}
