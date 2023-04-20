import React from "react"
import { Box, Checkbox } from "@mui/material"
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material"
import { useTranslation } from "react-i18next"

import { Image } from "src/UILibrary/image"
import { Typography } from "src/UILibrary/typography"
import { MainBadge } from "src/components/shared/mainBadge"

import PaymentStoreIcon from "src/assets/imgs/paymentStore.png"

interface ConveniencePaymentProps {
  selected?: boolean
  isMain?: boolean
  setDefault: Function
}

export const ConveniencePayment: React.FC<ConveniencePaymentProps> = ({
  isMain = false,
  setDefault,
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ mb: { xs: 3, md: 5 } }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.25 }}>
        <Checkbox
          icon={<CheckCircleIcon />}
          checkedIcon={<CheckCircleIcon />}
          sx={{ p: 0.5 }}
          checked={isMain}
          onChange={() => setDefault("konbini")}
        />
        <Typography.SubTitle
          sx={{ fontWeight: 600, letterSpacing: "2px", color: "text.primary", mr: 1 }}
        >
          {t("purchase.convenience_store_payment")}
        </Typography.SubTitle>
        {isMain && <MainBadge />}
      </Box>
      <Box sx={{ px: { xs: 0, md: 4 } }}>
        <Typography.Description sx={{ lineHeight: "20px", mb: { xs: 1, md: 2 } }}>
          {t("purchase.pay_at_following_stores")}
        </Typography.Description>
        <Image src={PaymentStoreIcon} alt="payment store icon" />
      </Box>
    </Box>
  )
}
