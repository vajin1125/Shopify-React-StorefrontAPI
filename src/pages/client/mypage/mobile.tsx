import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Box, Image, Typography } from "src/UILibrary"
import { PageContainer } from "src/components/client/pageContainer"
import { MypageDrawer } from "src/components/client/mypageDrawer"
import GridIcon from "src/assets/icons/grid.svg"
import { MypageIcon } from "src/assets/icons/MypageIcon"
import { CreditCardIcon } from "src/assets/icons/CreditcardIcon"
import { RingIcon } from "src/assets/icons/RingIcon"
import { IconProps } from "src/types/icon"

const CategoryItem = ({
  Icon,
  name,
  link,
}: {
  Icon: React.FC<IconProps>
  name: string
  link: string
}) => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: "flex",
        height: "100px",
        p: "1.25rem 1.75rem",
        alignItems: "center",
        border: "2px solid",
        borderColor: "divider",
        borderRadius: "5px",
        mb: "1rem",
      }}
      onClick={() => navigate(link)}
    >
      <Icon width="55" height="64" sx={{ p: 1 }} />
      <Typography.Title sx={{ letterSpacing: "2px", ml: "1.125rem" }}>{name}</Typography.Title>
    </Box>
  )
}

export const MyPage = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <PageContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: "1rem",
          mx: "-0.875rem",
          bgcolor: "primary.main",
          alignItems: "center",
        }}
      >
        <Typography.Title />
        <Typography.Title sx={{ lineHeight: "2.25rem", color: "background.default" }}>
          {t("header.my_page")}
        </Typography.Title>
        <Image
          src={GridIcon}
          alt="Grid view"
          sx={{ width: "18px", height: "18px" }}
          onClick={() => setOpen(true)}
        />
      </Box>
      <Box sx={{ mt: "1.875rem" }}>
        <CategoryItem
          Icon={MypageIcon}
          name={t("mypage.account_settings")}
          link="/mypage/account-settings"
        />
        <CategoryItem
          Icon={CreditCardIcon}
          name={t("mypage.payment_method")}
          link="/mypage/payment-method"
        />
        <CategoryItem Icon={RingIcon} name={t("mypage.notice")} link="/notification" />
      </Box>
      <MypageDrawer open={open} handleOpen={setOpen} />
    </PageContainer>
  )
}
