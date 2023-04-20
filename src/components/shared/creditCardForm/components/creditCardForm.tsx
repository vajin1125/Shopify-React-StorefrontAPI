import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import * as Validator from "src/modules/validation"

import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Box,
  Button,
  FormControl,
  FormHelperText,
} from "src/UILibrary"
import { InputField } from "./inputField"
import { RoundButton } from "src/components/client/roundButton"
import { ICard } from "src/types/paymentMethod"
import { useCustomerSession } from "src/modules/customerSessionProvider"
import { useAddCreditCard, useUpdateCreditCard } from "src/queries/paymentMethod"
import { usePushAlerts } from "src/hooks/alerts"
import { useErrorHandler } from "src/hooks/useErrorHandler"

interface CreditCardFormProps {
  editMode?: boolean
  creditCard?: ICard
  setOpen?: Function
  setExpanded?: Function
}

const editformContainerStyle = {
  bgcolor: "background.default",
  px: { xs: 2, md: 6 },
  py: 3,
  color: "text.primary",
}

const validationSchema = Yup.object().shape({
  cardNumber: Validator.creditCardSchema(),
  expYear: Validator.expYearSchema(),
  expMonth: Validator.expMonthSchema(),
  cardHolderName: Validator.holderNameSchema(),
  cvc: Validator.cvcSchema(),
})

export const CreditCardForm: React.FC<CreditCardFormProps> = ({
  editMode = false,
  creditCard,
  setOpen,
  setExpanded,
}) => {
  const { t } = useTranslation()

  const session = useCustomerSession()
  const queryClient = useQueryClient()
  const pushAlerts = usePushAlerts()
  const handleError = useErrorHandler()

  const { mutate: addCreditCard, isLoading: isAdding } = useAddCreditCard({
    onSuccess: () => {
      pushAlerts({ message: t("mypage.create_a_credit_card_successfully"), color: "success" })
      queryClient.invalidateQueries(["getPaymentMethods"])
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
      handleError(err)
    },
  })

  const { mutate: updateCreditCard, isLoading: isEditing } = useUpdateCreditCard({
    onSuccess: () => {
      if (setOpen) {
        !!setOpen && setOpen(false)
      }
      queryClient.invalidateQueries(["getPaymentMethods"])
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
      handleError(err)
    },
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      cardNumber: creditCard ? `****${creditCard?.last4}` : "",
      expYear: creditCard?.expYear || "",
      expMonth: creditCard?.expMonth || "",
      cardHolderName: creditCard?.cardHolderName || "",
      cvc: "",
    },
  })

  const onSubmit = (data: any) => {
    if (editMode) {
      updateCreditCard({
        id: creditCard?.paymentMethodId || "",
        data: data,
        token: session?.value.writeCustomerAccessToken || "",
      })
    } else {
      addCreditCard({
        data: data,
        token: session?.value.writeCustomerAccessToken || "",
      })
    }
  }

  useEffect(() => {
    reset({
      cardNumber: creditCard ? `****${creditCard?.last4}` : "",
      expYear: creditCard?.expYear || "",
      expMonth: creditCard?.expMonth || "",
      cardHolderName: creditCard?.cardHolderName || "",
      cvc: "",
    })
  }, [reset, creditCard])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={editMode ? editformContainerStyle : {}}>
        {editMode && (
          <Typography.SubTitle
            sx={{ textAlign: { xs: "left", md: "center" }, mb: 3, color: "primary.main" }}
          >
            {t("mypage.credit_card_edit")}
          </Typography.SubTitle>
        )}

        <Controller
          name="cardNumber"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputField label="purchase.credit_card_number" editMode={editMode}>
              <TextField
                fullWidth
                value={value}
                onChange={onChange}
                placeholder={t("purchase.single_byte_numbers_only")}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber && t(`error.required`)}
                disabled={editMode}
                sx={{
                  backgroundColor: "transparent",
                  "& input": { backgroundColor: "#fff" },
                }}
              />
            </InputField>
          )}
        />
        <InputField label="purchase.expiration_date" editMode={editMode}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Controller
              name="expYear"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <FormControl
                    error={!!errors.expYear}
                    sx={{
                      minWidth: "100px",
                      mr: "0.5rem",
                      "& .MuiSelect-select": {
                        bgcolor: "background.default",
                      },
                    }}
                  >
                    <Select
                      fullWidth
                      value={value}
                      sx={{
                        "& .MuiSelect-select": {
                          bgcolor: "background.default",
                        },
                      }}
                      onChange={onChange}
                    >
                      {new Array(5).fill(0).map((_, i) => (
                        <MenuItem
                          key={`year-option-${i}`}
                          value={`${i + new Date().getFullYear() - 2000}`}
                        >
                          {i + new Date().getFullYear()}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.expYear && <FormHelperText>{t(`error.required`)}</FormHelperText>}
                  </FormControl>
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
              name="expMonth"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <FormControl sx={{ minWidth: "100px", mr: "0.5rem" }} error={!!errors.expMonth}>
                    <Select
                      fullWidth
                      value={value}
                      sx={{
                        "& .MuiSelect-select": {
                          bgcolor: "background.default",
                        },
                      }}
                      onChange={onChange}
                    >
                      {new Array(12).fill(0).map((_, i) => (
                        <MenuItem key={`month-option-${i}`} value={`${i + 1}`}>
                          {(i + 1).toString().padStart(2, "0")}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.expMonth && <FormHelperText>{t(`error.required`)}</FormHelperText>}
                  </FormControl>
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
          name="cardHolderName"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputField label="purchase.credit_card_name" editMode={editMode}>
              <TextField
                fullWidth
                value={value}
                onChange={onChange}
                error={!!errors.cardHolderName}
                helperText={errors.cardHolderName && t(`error.required`)}
                placeholder="TARO BELBEL"
                sx={{
                  backgroundColor: "transparent",
                  "& input": { backgroundColor: "#fff" },
                }}
              />
            </InputField>
          )}
        />
        <Controller
          name="cvc"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputField label="purchase.security_code" editMode={editMode}>
              <TextField
                fullWidth
                value={value}
                onChange={onChange}
                error={!!errors.cvc}
                helperText={errors.cvc && t(`error.required`)}
                sx={{
                  backgroundColor: "transparent",
                  width: 140,
                  "& input": { backgroundColor: "#fff" },
                }}
              />
            </InputField>
          )}
        />
        {editMode ? (
          <Box
            sx={{ mt: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
          >
            <Button
              sx={{ width: 140, color: "text.secondary", p: 1, borderRadius: 8, fontWeight: 600 }}
              onClick={() => !!setOpen && setOpen(false)}
            >
              {t("mypage.cancel")}
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: 140,
                color: "background.default",
                p: 1,
                borderRadius: 8,
                fontWeight: 600,
              }}
              disabled={isEditing}
            >
              {t("mypage.save")}
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 3, display: "flex", alignItems: "center", flexDirection: "column" }}>
            <RoundButton
              variant="contained"
              sx={{ bgcolor: "text.secondary", width: "294px" }}
              disabled={isAdding}
              type="submit"
            >
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
              onClick={() => (setExpanded ? setExpanded(false) : {})}
            >
              {t("purchase.return")}
            </RoundButton>
          </Box>
        )}
      </Box>
    </form>
  )
}
