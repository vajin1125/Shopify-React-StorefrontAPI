import React from "react"
import { useTranslation } from "react-i18next"

import { PageContainer } from "src/components/client/pageContainer"
import ChromeLogo from "src/assets/imgs/chrome.png"
import { Image, Box, Typography, SxProps } from "src/UILibrary"

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
    <Box sx={{ height: "44px", display: "flex", alignItems: "center", ...sx }} {...rest}>
      <Typography.Description
        sx={{
          lineHeight: "44px",
          fontWeight: 600,
          bgcolor: "background.paper",
          letterSpacing: "2px",
          minWidth: "178px",
          textAlign: "center",
        }}
      >
        {title}
      </Typography.Description>
      <Typography.Description
        sx={{
          lineHeight: "1.25rem",
          ml: "1.25rem",
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

  const toolbar = () => {
    return (
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          alignItems: "center",
          width: "200px",
          height: "44px",
          px: "1.25rem",
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
    )
  }

  return (
    <PageContainer title={t("mypage.account_settings")} toolbar={toolbar()}>
      <DetailItem
        title={t("mypage.full_name")}
        description="吉田 慎太郎"
        sx={{ mb: "1.5rem ", mt: "0.5rem" }}
      />
      <DetailItem
        title={t("mypage.email_address")}
        description="shintaro.yoshida@viven.inc"
        sx={{ mb: "1.5rem " }}
      />
      <DetailItem title={t("mypage.subject")} description="美容科" sx={{ mb: "1.5rem " }} />
      <DetailItem title={t("mypage.grade")} description="1年" sx={{ mb: "1.5rem " }} />
      <DetailItem title={t("mypage.student_number")} description="7897015" sx={{ mb: "1.5rem " }} />
    </PageContainer>
  )
}
