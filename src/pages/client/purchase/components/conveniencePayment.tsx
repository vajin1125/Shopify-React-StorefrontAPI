import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Image, Typography } from "src/UILibrary"
import CheckIcon from "src/assets/icons/check.svg"
import DisabledCheckIcon from "src/assets/icons/disabledCheck.svg"
import PaymentStoreIcon from "src/assets/imgs/paymentStore.png"

export const ConveniencePayment = ({ selected }: { selected?: boolean }) => {
  const { t } = useTranslation()
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Image
          src={selected ? CheckIcon : DisabledCheckIcon}
          alt="check icon"
          sx={{ width: "18px", height: "20px", mr: 1 }}
        />
        <Typography.Action
          sx={{ fontWeight: 600, letterSpacing: "2px", lineHeight: "20px", color: "text.primary" }}
        >
          {t("purchase.convenience_store_payment")}
        </Typography.Action>
      </Box>
      <Typography.Description sx={{ lineHeight: "20px" }}>
        {t("purchase.pay_at_following_stores")}
      </Typography.Description>
      <Image src={PaymentStoreIcon} alt="payment store icon" sx={{ mt: 1 }} />
    </>
  )
}
