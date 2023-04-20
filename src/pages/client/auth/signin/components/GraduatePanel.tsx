import React from "react"
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"

import { TextFieldWithLabel } from "src/components/shared/textfieldWithLabel"
import { Typography, Box, Button } from "src/UILibrary"

export const GraduatePanel = () => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = () => {}

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "560px",
        minWidth: "372px",
        pl: "2rem",
        pr: "1.75rem",
        boxSizing: "border-box",
        mt: "1.625rem",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextFieldWithLabel
              label={t("auth.email_address")}
              fullWidth
              value={value}
              onChange={onChange}
              error={!!errors.email}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextFieldWithLabel
              label={t("auth.password")}
              type="password"
              fullWidth
              value={value}
              onChange={onChange}
              error={!!errors.password}
              labelProps={{ sx: { mt: "0.625rem" } }}
            />
          )}
        />
        <Typography.Description
          sx={{
            fontWeight: 400,
            lineHeight: "1.5rem",
            textAlign: "center",
            mt: "0.5rem",
            mb: "1.5rem",
          }}
        >
          {t("auth.click_here_if_forgot_your_password")}
        </Typography.Description>
        <Button
          type="submit"
          sx={{
            bgcolor: "primary.main",
            borderRadius: "1.5rem",
            width: "100%",
            px: "1.75rem",
            height: "44px",
            color: "background.default",
            mb: "5rem",
            "&:hover": {
              borderColor: "primary.main",
              border: "2px solid",
              bgcolor: "background.default",
              color: "primary.main",
            },
          }}
        >
          <Typography.Description sx={{ fontWeight: 600 }}>
            {t("header.login")}
          </Typography.Description>
        </Button>
      </form>
    </Box>
  )
}
