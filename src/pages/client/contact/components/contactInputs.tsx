import React from "react"
import { useTranslation } from "react-i18next"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import { Typography, TextField, Box, Grid, MenuItem, Select, Button } from "src/UILibrary"
import * as Validator from "src/modules/validation"
import { ContactFormInput } from "src/types/contact"

const validationSchema = Yup.object().shape({
  fullName: Validator.fullNameSchema(),
  fullNameKatakana: Validator.fullNameKatakanaSchema(),
  email: Validator.emailSchema(),
  studentId: Validator.studentIdSchema(),
  inquiryType: Validator.inquiryTypeSchema(),
  inquiryDetail: Validator.inquiryDetailSchema(),
})

interface ContactInputsProps {
  initialValues: ContactFormInput
  setData: Function
  setStep: Function
}

export const ContactInputs: React.FC<ContactInputsProps> = ({
  initialValues,
  setData,
  setStep,
}) => {
  const { t } = useTranslation()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  const onSubmit = (data: ContactFormInput) => {
    setData(data)
    setStep(1)
  }

  return (
    <>
      <Typography.Heading sx={{ color: "primary.main", mb: 3 }}>
        {t("contact.contact_us")}
      </Typography.Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ bgcolor: "background.default", p: { xs: 2, md: 3 } }}>
          <Grid container spacing={{ xs: 1.25, md: 2 }} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "flex-start",
                  gap: { xs: 0.75, md: 2.75 },
                }}
              >
                <Typography.Description
                  sx={{
                    width: {
                      xs: "100%",
                      md: 176,
                    },
                    borderRadius: 1.25,
                    bgcolor: { xs: "transparent", md: "background.paper" },
                    textAlign: { xs: "left", md: "center" },
                    flexShrink: 0,
                    py: { xs: 0, md: 2.1875 },
                  }}
                >
                  {t("contact.full_name")}
                </Typography.Description>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={!!errors.fullName}
                      helperText={
                        errors.fullName ? t(`error.${errors.fullName.message}`) : undefined
                      }
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "flex-start",
                  gap: { xs: 0.75, md: 2.75 },
                }}
              >
                <Typography.Description
                  sx={{
                    width: {
                      xs: "100%",
                      md: 176,
                    },
                    borderRadius: 1.25,
                    bgcolor: { xs: "transparent", md: "background.paper" },
                    textAlign: { xs: "left", md: "center" },
                    flexShrink: 0,
                    py: { xs: 0, md: 2.1875 },
                  }}
                >
                  {t("contact.full_name_furigana")}
                </Typography.Description>
                <Controller
                  name="fullNameKatakana"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={!!errors.fullNameKatakana}
                      helperText={
                        errors.fullNameKatakana
                          ? t(`error.${errors.fullNameKatakana.message}`)
                          : undefined
                      }
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "flex-start",
                  gap: { xs: 0.75, md: 2.75 },
                }}
              >
                <Typography.Description
                  sx={{
                    width: {
                      xs: "100%",
                      md: 176,
                    },
                    borderRadius: 1.25,
                    bgcolor: { xs: "transparent", md: "background.paper" },
                    textAlign: { xs: "left", md: "center" },
                    flexShrink: 0,
                    py: { xs: 0, md: 2.1875 },
                  }}
                >
                  {t("contact.email")}
                </Typography.Description>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={!!errors.email}
                      helperText={errors.email ? t(`error.${errors.email.message}`) : undefined}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "flex-start",
                  gap: { xs: 0.75, md: 2.75 },
                }}
              >
                <Typography.Description
                  sx={{
                    width: {
                      xs: "100%",
                      md: 176,
                    },
                    borderRadius: 1.25,
                    bgcolor: { xs: "transparent", md: "background.paper" },
                    textAlign: { xs: "left", md: "center" },
                    flexShrink: 0,
                    py: { xs: 0, md: 2.1875 },
                  }}
                >
                  {t("contact.student_id_number")}
                </Typography.Description>
                <Controller
                  name="studentId"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={!!errors.studentId}
                      helperText={
                        errors.studentId ? t(`error.${errors.studentId.message}`) : undefined
                      }
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "flex-start",
                  gap: { xs: 0.75, md: 2.75 },
                }}
              >
                <Typography.Description
                  sx={{
                    width: {
                      xs: "100%",
                      md: 176,
                    },
                    borderRadius: 1.25,
                    bgcolor: { xs: "transparent", md: "background.paper" },
                    textAlign: { xs: "left", md: "center" },
                    flexShrink: 0,
                    py: { xs: 0, md: 2.1875 },
                  }}
                >
                  {t("contact.inquiry_type")}
                </Typography.Description>
                <Controller
                  name="inquiryType"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      onChange={onChange}
                      sx={{
                        width: { xs: "100%", md: 250 },
                        "& .MuiSelect-select": {
                          py: 1.375,
                          bgcolor: "background.default",
                          border: "2px solid",
                          borderColor: "divider",
                        },
                      }}
                    >
                      <MenuItem value="商品について">{"商品について"}</MenuItem>
                    </Select>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "flex-start",
                  gap: { xs: 0.75, md: 2.75 },
                }}
              >
                <Typography.Description
                  sx={{
                    width: {
                      xs: "100%",
                      md: 176,
                    },
                    borderRadius: 1.25,
                    bgcolor: { xs: "transparent", md: "background.paper" },
                    textAlign: { xs: "left", md: "center" },
                    flexShrink: 0,
                    py: { xs: 0, md: 2.1875 },
                  }}
                >
                  {t("contact.inquiry_details")}
                </Typography.Description>
                <Controller
                  name="inquiryDetail"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      multiline
                      error={!!errors.inquiryDetail}
                      helperText={
                        errors.inquiryDetail
                          ? t(`error.${errors.inquiryDetail.message}`)
                          : undefined
                      }
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                width: { xs: "100%", md: 350 },
                color: "background.default",
                letterSpacing: "2px",
                fontSize: "1rem",
                borderRadius: 5,
              }}
            >
              {t("contact.confirm_entry")}
            </Button>
          </Box>
        </Box>
      </form>
    </>
  )
}
