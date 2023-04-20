import React from "react"
import { useTranslation } from "react-i18next"

import { Typography, Box, Button } from "src/UILibrary"

import { ContactFormInput } from "src/types/contact"

interface ConfirmInputsProps {
  data: ContactFormInput
  handleSubmit: React.FormEventHandler
  isSending: boolean
}

export const ConfirmInputs: React.FC<ConfirmInputsProps> = ({ data, handleSubmit, isSending }) => {
  const { t } = useTranslation()

  return (
    <>
      <Typography.Heading sx={{ color: "primary.main", mb: 3 }}>
        {t("contact.contact_us")}
      </Typography.Heading>
      <form onSubmit={handleSubmit}>
        <input type="hidden" id="fullName" name="fullName" value={data.fullName} />
        <input
          type="hidden"
          id="fullNameKatakana"
          name="fullNameKatakana"
          value={data.fullNameKatakana}
        />
        <input type="hidden" id="email" name="email" value={data.email} />
        <input type="hidden" id="studentId" name="studentId" value={data.studentId} />
        <input type="hidden" id="inquiryType" name="inquiryType" value={data.inquiryType} />
        <input type="hidden" id="inquiryDetail" name="inquiryDetail" value={data.inquiryDetail} />
        <Box sx={{ bgcolor: "background.default", p: { xs: 2, md: 3 }, color: "text.primary" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              borderWidth: "0 0 2px 0",
              borderStyle: "solid",
              borderColor: "divider",
              mb: { xs: 1, md: 1.5 },
              px: 1.5,
              gap: { xs: 0, md: 3 },
            }}
          >
            <Typography.Description
              sx={{
                flexShrink: 0,
                width: { xs: "100%", md: 176 },
                py: { xs: 0, md: 1.5 },
              }}
            >
              {t("contact.full_name")}
            </Typography.Description>
            <Typography.Description
              sx={{
                flexGrow: 1,
                py: { xs: 1, md: 1.5 },
              }}
            >
              {data.fullName}
            </Typography.Description>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              borderWidth: "0 0 2px 0",
              borderStyle: "solid",
              borderColor: "divider",
              mb: { xs: 1, md: 1.5 },
              px: 1.5,
              gap: { xs: 0, md: 3 },
            }}
          >
            <Typography.Description
              sx={{
                flexShrink: 0,
                width: { xs: "100%", md: 176 },
                py: { xs: 0, md: 1.5 },
              }}
            >
              {t("contact.full_name_furigana")}
            </Typography.Description>
            <Typography.Description
              sx={{
                flexGrow: 1,
                py: { xs: 1, md: 1.5 },
              }}
            >
              {data.fullNameKatakana}
            </Typography.Description>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              borderWidth: "0 0 2px 0",
              borderStyle: "solid",
              borderColor: "divider",
              mb: { xs: 1, md: 1.5 },
              px: 1.5,
              gap: { xs: 0, md: 3 },
            }}
          >
            <Typography.Description
              sx={{
                flexShrink: 0,
                width: { xs: "100%", md: 176 },
                py: { xs: 0, md: 1.5 },
              }}
            >
              {t("contact.email")}
            </Typography.Description>
            <Typography.Description
              sx={{
                flexGrow: 1,
                py: { xs: 1, md: 1.5 },
              }}
            >
              {data.email}
            </Typography.Description>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              borderWidth: "0 0 2px 0",
              borderStyle: "solid",
              borderColor: "divider",
              mb: { xs: 1, md: 1.5 },
              px: 1.5,
              gap: { xs: 0, md: 3 },
            }}
          >
            <Typography.Description
              sx={{
                flexShrink: 0,
                width: { xs: "100%", md: 176 },
                py: { xs: 0, md: 1.5 },
              }}
            >
              {t("contact.student_id_number")}
            </Typography.Description>
            <Typography.Description
              sx={{
                flexGrow: 1,
                py: { xs: 1, md: 1.5 },
              }}
            >
              {data.studentId}
            </Typography.Description>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              borderWidth: "0 0 2px 0",
              borderStyle: "solid",
              borderColor: "divider",
              mb: { xs: 1, md: 1.5 },
              px: 1.5,
              gap: { xs: 0, md: 3 },
            }}
          >
            <Typography.Description
              sx={{
                flexShrink: 0,
                width: { xs: "100%", md: 176 },
                py: { xs: 0, md: 1.5 },
              }}
            >
              {t("contact.inquiry_type")}
            </Typography.Description>
            <Typography.Description
              sx={{
                flexGrow: 1,
                py: { xs: 1, md: 1.5 },
              }}
            >
              {data.inquiryType}
            </Typography.Description>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              borderWidth: "0 0 2px 0",
              borderStyle: "solid",
              borderColor: "divider",
              mb: { xs: 2.5, md: 5 },
              px: 1.5,
              gap: { xs: 0, md: 3 },
            }}
          >
            <Typography.Description
              sx={{
                flexShrink: 0,
                width: { xs: "100%", md: 176 },
                py: { xs: 0, md: 1.5 },
              }}
            >
              {t("contact.inquiry_details")}
            </Typography.Description>
            <Typography.Description
              sx={{
                flexGrow: 1,
                py: { xs: 1, md: 1.5 },
              }}
            >
              {data.inquiryDetail}
            </Typography.Description>
          </Box>
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
              disabled={isSending}
            >
              {t("contact.send_contact_form")}
            </Button>
          </Box>
        </Box>
      </form>
    </>
  )
}
