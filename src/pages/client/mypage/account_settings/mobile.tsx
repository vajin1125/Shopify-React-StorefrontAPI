import React from "react"
import { useTranslation } from "react-i18next"

import { Image, Box, Typography, SxProps } from "src/UILibrary"
import { PageContainer } from "src/components/client/pageContainer"
import ChromeLogo from "src/assets/imgs/chrome.png"

const DetailItem = ({
  title,
  description,
  sx,
  ...rest
}: {
  title: string
  description: string
  sx?: SxProps
}) => {
  return (
    <Box sx={{ height: "62px", ...sx }} {...rest}>
      <Typography.Description
        sx={{
          lineHeight: "2rem",
          fontWeight: 600,
          px: "0.625rem",
          bgcolor: "background.paper",
          letterSpacing: "2px",
        }}
      >
        {title}
      </Typography.Description>
      <Typography.Description
        sx={{
          lineHeight: "1.25rem",
          px: "0.625rem",
          pt: "0.625rem",
          letterSpacing: "2px",
        }}
      >
        {description}
      </Typography.Description>
    </Box>
  )
}

export const AccountSettings = () => {
  const { t } = useTranslation()

  return (
    <PageContainer title={t("mypage.account_settings")}>
      <DetailItem title={t("mypage.full_name")} description="吉田 慎太郎" sx={{ mb: "1.5rem " }} />
      <DetailItem
        title={t("mypage.email_address")}
        description="shintaro.yoshida@viven.inc"
        sx={{ mb: "1.5rem " }}
      />
      <DetailItem title={t("mypage.subject")} description="美容科" sx={{ mb: "1.5rem " }} />
      <DetailItem title={t("mypage.grade")} description="1年" sx={{ mb: "1.5rem " }} />
      <DetailItem title={t("mypage.student_number")} description="7897015" sx={{ mb: "1.5rem " }} />
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          alignItems: "center",
          width: "200px",
          height: "44px",
          px: "1.25rem",
          mb: "1.5rem",
          borderRadius: "22px",
          filter: "drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.168))",
        }}
      >
        <Image src={ChromeLogo} alt="Chrome Logo" />
        <Typography.Description
          sx={{
            fontWeight: 600,
            color: "text.secondary",
            pl: "0.5rem",
          }}
        >
          {t("mypage.edit_with_google")}
        </Typography.Description>
      </Box>
    </PageContainer>
  )
}
