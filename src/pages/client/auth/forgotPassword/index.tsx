import React from "react"
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"

import { TextFieldWithLabel } from "src/components/shared/textfieldWithLabel"
import { PageContainer } from "src/components/client/pageContainer"
import { FOOTER_CONSTANT } from "src/constants/footer"
import { Typography, Box, Button } from "src/UILibrary"

export const ForgotPassword = () => {
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
    <PageContainer
      sx={{
        bgcolor: "background.paper",
        height: { xs: "calc(100vh - 85px)", md: "calc(100vh - 124px)" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography.SubTitle
          sx={{
            fontWeight: { xs: 600, md: 700 },
            fontSize: { xs: "1.125rem", md: "1.5rem" },
            lineHeight: "1.5rem",
            mt: "6.375rem",
            color: "primary.main",
          }}
        >
          {t("auth.reset_password")}
        </Typography.SubTitle>
        <Typography.Description
          sx={{
            lineHeight: "1.5rem",
            fontWeight: 400,
            pr: "1rem",
            pl: "1.125rem",
            mt: { xs: "1rem", md: "2.5rem" },
            mb: "1.125rem",
          }}
        >
          {t("auth.password_reset_url_sent_to_email")}
        </Typography.Description>
        <Box
          sx={{
            pr: "1rem",
            pl: "1.125rem",
            mb: "1.5rem",
            width: "100%",
            boxSizing: "border-box",
            maxWidth: "534px",
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
                  sx={{
                    mb: "1.5rem",
                  }}
                />
              )}
            />
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
                {t("auth.send")}
              </Typography.Description>
            </Button>
          </form>
        </Box>
        <Typography.Caption
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            lineHeight: "1.5rem",
            textAlign: "center",
            bgcolor: "primary.dark",
            mt: "0.5rem",
            width: "100%",
            color: "background.default",
            display: { xs: "none", md: "block" },
          }}
        >
          {FOOTER_CONSTANT}
        </Typography.Caption>
      </Box>
    </PageContainer>
  )
}
