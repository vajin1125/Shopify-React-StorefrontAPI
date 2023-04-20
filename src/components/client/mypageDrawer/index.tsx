import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Typography, Box, SwipeableDrawer } from "src/UILibrary"
import { CloseIcon } from "src/assets/icons/CloseIcon"

const Item = ({ label, link, noBorder }: { label: string; link: string; noBorder?: boolean }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
        borderBottom: !noBorder ? "2px solid" : "none",
        borderColor: "divider",
        bgcolor: "background.default",
      }}
      onClick={() => navigate(link)}
    >
      <Typography.Title sx={{ color: "primary.main" }}>{t(label)}</Typography.Title>
    </Box>
  )
}

export const MypageDrawer = ({ open, handleOpen }: { open: boolean; handleOpen: Function }) => {
  const { t } = useTranslation()
  return (
    <SwipeableDrawer
      anchor="top"
      open={open}
      onClose={() => handleOpen(false)}
      onOpen={() => handleOpen(true)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: "9px",
          bgcolor: "primary.main",
        }}
      >
        <Typography.Title />
        <Typography.Title sx={{ lineHeight: "2.25rem", color: "background.default" }}>
          {t("header.my_page")}
        </Typography.Title>
        <Typography.Action onClick={() => handleOpen()}>
          <CloseIcon width="18" height="18" />
        </Typography.Action>
      </Box>
      <Item label="mypage.account_settings" link="/mypage/account-settings" />
      <Item label="mypage.payment_method" link="/mypage/payment-method" />
      <Item label="mypage.notice" noBorder link="/notification" />
    </SwipeableDrawer>
  )
}
