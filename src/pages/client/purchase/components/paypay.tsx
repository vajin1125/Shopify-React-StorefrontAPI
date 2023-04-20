import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Image, Typography } from "src/UILibrary"
import CheckIcon from "src/assets/icons/check.svg"
import DisabledCheckIcon from "src/assets/icons/disabledCheck.svg"

export const PaypayPayment = ({ selected, linked }: { selected?: boolean; linked?: boolean }) => {
  const { t } = useTranslation()
  return (
    <Box sx={{ display: { sm: "block", md: "flex" } }}>
      <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
        {linked && (
          <Image
            src={selected ? CheckIcon : DisabledCheckIcon}
            alt="check icon"
            sx={{ width: "18px", height: "20px", mr: 1 }}
          />
        )}
        <Typography.Action
          sx={{ fontWeight: 600, letterSpacing: "2px", lineHeight: "20px", color: "text.primary" }}
        >
          Paypay{t("purchase.payment")}{" "}
          {linked && `${t("purchase.balance")}2,350${t("purchase.yen")}`}
        </Typography.Action>
      </Box>
      {!linked && (
        <Typography.Description sx={{ lineHeight: "24px", fontWeight: 400, mb: 0.25 }}>
          {t("purchase.paypay_link_requirement")}
        </Typography.Description>
      )}
    </Box>
  )
}
