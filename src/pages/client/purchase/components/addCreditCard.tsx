import React from "react"
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"

import {
  Typography,
  TextField,
  Image,
  Select,
  MenuItem,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ExpandMoreIcon,
  Box,
} from "src/UILibrary"
import CardBrand from "src/assets/imgs/card_5brand.png"
import { InputField } from "src/pages/client/purchase/components/inputField"
import { RoundButton } from "src/components/client/roundButton"

export const AddCreditCard = () => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      number: "",
      expirationYear: "",
      expirationMonth: "",
      name: "",
      securityCode: "",
    },
  })

  const onSubmit = () => {}

  return (
    <Accordion elevation={0} square disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: "1rem", color: "#000" }} />}>
        <Typography.SubTitle sx={{ fontWeight: 400 }}>
          {t("purchase.register_new_credit_card")}
        </Typography.SubTitle>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Image src={CardBrand} alt="card-5brand" sx={{ width: { sm: "270px", md: "335px" } }} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="number"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputField label="purchase.credit_card_number">
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    error={!!errors.number}
                    placeholder={t("purchase.single_byte_numbers_only")}
                  />
                </InputField>
              )}
            />
            <InputField label="purchase.expiration_date">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Controller
                  name="expirationYear"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Select
                        fullWidth
                        value={value}
                        sx={{
                          minWidth: "120px",
                          mr: "0.5rem",
                          "& .MuiSelect-select": {
                            bgcolor: "background.default",
                          },
                        }}
                        onChange={onChange}
                      >
                        {new Array(5).fill(0).map((_, i) => (
                          <MenuItem
                            key={`year-option-${i}`}
                            value={i + new Date().getFullYear() - 2000}
                          >
                            {i + new Date().getFullYear()}
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography.Description
                        sx={{
                          fontWeight: 600,
                          letterSpacing: "2px",
                          lineHeight: "20px",
                          mr: "0.5rem",
                        }}
                      >
                        年
                      </Typography.Description>
                    </>
                  )}
                />
                <Controller
                  name="expirationMonth"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Select
                        fullWidth
                        value={value}
                        sx={{
                          minWidth: "120px",
                          mr: "0.5rem",
                          "& .MuiSelect-select": {
                            bgcolor: "background.default",
                          },
                        }}
                        onChange={onChange}
                      >
                        {new Array(12).fill(0).map((_, i) => (
                          <MenuItem key={`month-option-${i}`} value={i + 1}>
                            {i > 8 ? i + 1 : `0${i + 1}`}
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography.Description
                        sx={{
                          fontWeight: 600,
                          letterSpacing: "2px",
                          lineHeight: "20px",
                          ml: "0.75rem",
                          mr: "1rem",
                        }}
                      >
                        月
                      </Typography.Description>
                    </>
                  )}
                />
              </Box>
            </InputField>
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputField label="purchase.credit_card_name">
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    error={!!errors.name}
                    placeholder="TARO BELBEL"
                  />
                </InputField>
              )}
            />
            <Controller
              name="securityCode"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputField label="purchase.security_code">
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    error={!!errors.securityCode}
                    sx={{ width: "100px" }}
                  />
                </InputField>
              )}
            />
            <Box sx={{ mt: 3, display: "flex", alignItems: "center", flexDirection: "column" }}>
              <RoundButton variant="contained" sx={{ bgcolor: "text.secondary", width: "294px" }}>
                {t("purchase.register")}
              </RoundButton>
              <RoundButton
                variant="outlined"
                sx={{
                  width: "294px",
                  mt: "1rem",
                  border: "2px solid",
                  borderColor: "text.secondary",
                  color: "text.secondary",
                }}
              >
                {t("purchase.return")}
              </RoundButton>
            </Box>
          </form>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
