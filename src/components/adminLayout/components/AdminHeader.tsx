import React from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { AppBar, Box, Toolbar, Image, Typography } from "src/UILibrary"
import LogoImage from "src/assets/icons/logo_default.svg"

export const AdminHeader: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <AppBar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        height: "83px",
        flexDirection: "row",
        alignContent: "center",
        boxShadow: "1px 1px 6px 3px rgba(188, 187, 187, 0.15)",
      }}
    >
      <Image
        src={LogoImage}
        alt="Logo"
        sx={{
          width: "210px",
          ml: "1.4375rem",
          mt: "1.75rem",
          "&:hover": { cursor: "pointer" },
          "& img": { width: "100%" },
        }}
        onClick={() => navigate("/admin")}
      />
      <Toolbar sx={{ p: { xs: 0 }, flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
            mx: "0.875rem",
          }}
        >
          <Typography.SubTitle sx={{ pt: "0.875rem" }}>
            {t("admin.header.management_screen")}
          </Typography.SubTitle>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
