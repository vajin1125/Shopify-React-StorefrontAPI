import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { CreditCardForm } from "./components/creditCardForm"
import {
  Typography,
  Image,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ExpandMoreIcon,
  Box,
} from "src/UILibrary"
import CardBrand from "src/assets/imgs/card_5brand.png"

export const AddCreditCard: React.FC = () => {
  const { t } = useTranslation()

  const [expanded, setExpanded] = useState(false)

  return (
    <Accordion elevation={0} square disableGutters expanded={expanded}>
      <AccordionSummary
        onClick={() => setExpanded(!expanded)}
        expandIcon={<ExpandMoreIcon sx={{ fontSize: "1rem", color: "#000" }} />}
      >
        <Typography.SubTitle sx={{ fontWeight: 400 }}>
          {t("purchase.register_new_credit_card")}
        </Typography.SubTitle>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Image src={CardBrand} alt="card-5brand" sx={{ width: { sm: "270px", md: "335px" } }} />
          <CreditCardForm setExpanded={setExpanded} />
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
