import React, { FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { PageContainer } from "src/components/client/pageContainer"
import { Typography, Box, Grid } from "src/UILibrary"
import { MypageIcon } from "src/assets/icons/MypageIcon"
import { CreditCardIcon } from "src/assets/icons/CreditcardIcon"
import { RingIcon } from "src/assets/icons/RingIcon"
import { IconProps } from "src/types/icon"

const CategoryItem = ({
  Icon,
  name,
  link,
}: {
  Icon: FC<IconProps>
  name: string
  link: string
}) => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "200px",
        p: "1.25rem 1.75rem",
        alignItems: "center",
        border: "2px solid",
        borderColor: "divider",
        borderRadius: "5px",
        mb: "1rem",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => navigate(link)}
    >
      <Icon width="67" height="80" />
      <Typography.Heading>{name}</Typography.Heading>
    </Box>
  )
}

export const MyPage = () => {
  const { t } = useTranslation()

  return (
    <PageContainer title={t("header.my_page")}>
      <Grid container columnSpacing={2.5} sx={{ mt: "0.5rem" }}>
        <Grid item md={4}>
          <CategoryItem
            Icon={MypageIcon}
            name={t("mypage.account_settings")}
            link="/mypage/account-settings"
          />
        </Grid>
        <Grid item md={4}>
          <CategoryItem
            Icon={CreditCardIcon}
            name={t("mypage.payment_method")}
            link="/mypage/payment-method"
          />
        </Grid>
        <Grid item md={4}>
          <CategoryItem Icon={RingIcon} name={t("mypage.notice")} link="/notification" />
        </Grid>
      </Grid>
    </PageContainer>
  )
}
