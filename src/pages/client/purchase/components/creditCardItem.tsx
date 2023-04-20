import React from "react"

import { Box, Image, Typography } from "src/UILibrary"
import CheckIcon from "src/assets/icons/check.svg"
import DisabledCheckIcon from "src/assets/icons/disabledCheck.svg"
import VisaIcon from "src/assets/imgs/visa.png"

interface CreditCardItemProps {
  selected?: boolean
  last4Number: string
  expiredDate: string
}
export const CreditCardItem = ({ selected, last4Number, expiredDate }: CreditCardItemProps) => {
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        display: "flex",
        gap: 3,
        alignItems: "center",
        pl: 1.25,
        py: 1.5,
        mt: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Image src={selected ? CheckIcon : DisabledCheckIcon} alt="check" sx={{ height: "20px" }} />
        <Image
          src={VisaIcon}
          alt="visa"
          sx={{ width: "80px", height: "26px", ml: { sm: 1, md: 2 } }}
        />
      </Box>
      <Typography.SubTitle sx={{ fontWeight: 400, letterSpacing: "2px" }}>
        {`****${last4Number}`}
      </Typography.SubTitle>
      <Typography.SubTitle sx={{ fontWeight: 400, letterSpacing: "2px" }}>
        {expiredDate}
      </Typography.SubTitle>
    </Box>
  )
}
