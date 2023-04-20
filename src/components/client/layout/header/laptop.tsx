import React, { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { Image, Typography, AppBar, Badge, Box, Button, Input, Toolbar } from "src/UILibrary"

import { useCartItemCount } from "src/modules/cartItemCountProvider"

import CartIcon from "src/assets/icons/whitecart.svg"
import DoorIcon from "src/assets/icons/door.svg"
import LogoImage from "src/assets/icons/logo.svg"
import { SearchIcon } from "src/assets/icons/SearchIcon"

interface HeaderProps {
  searchQuery?: string
  // eslint-disable-next-line no-unused-vars
  onChangeSearchQuery?: (query: string) => void
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onChangeSearchQuery }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const cartItemCount = useCartItemCount()

  const login =
    location.pathname !== "/signin" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/forgot-password" &&
    location.pathname !== "/reset-password"

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeSearchQuery && onChangeSearchQuery(e.target.value)
    const firstChar = e.target.value[0]
    if (firstChar) {
      if (firstChar !== "#") {
        location.pathname !== "/search" && navigate(`/search?title=${firstChar}`)
      } else {
        location.pathname !== "/search" && navigate("/search?tags=")
      }
    }
  }

  return (
    <AppBar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        bgcolor: "background.default",
        height: "83px",
        flexDirection: "row",
        alignContent: "center",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Image
        src={LogoImage}
        alt="Logo"
        sx={{
          width: "210px",
          ml: "1.4375rem",
          "&:hover": { cursor: "pointer" },
        }}
        onClick={() => navigate("/")}
      />
      <Toolbar sx={{ padding: 0, flexGrow: 1, display: login ? "block" : "none" }}>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
            mx: "2.5rem",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              position: "relative",
            }}
          >
            <Input
              fullWidth
              startAdornment={<SearchIcon sx={{ p: 1 }} width="20" height="20" />}
              placeholder={t("header.search_placeholder")}
              value={searchQuery || ""}
              onChange={handleChange}
              autoFocus
              sx={{
                height: "2.25rem",
                p: "8px 10px",
                borderRadius: "22px",
                bgcolor: "background.paper",
                "&&&:before": {
                  borderBottom: "none",
                },
                "&&:after": {
                  borderBottom: "none",
                },
              }}
            />
          </Box>
          <Box>
            <Button
              sx={{
                color: "#000",
                letterSpacing: "2px",
                my: "1.25rem",
                ml: "2.5rem",
                fontSize: "1rem",
                "&:hover": { bgcolor: "transparent", color: "primary.main" },
              }}
            >
              {t("header.my_page")}
            </Button>
            <Button
              sx={{
                color: "#000",
                letterSpacing: "2px",
                my: "1.25rem",
                ml: "2.5rem",
                fontSize: "1rem",
                "&:hover": { bgcolor: "transparent", color: "primary.main" },
              }}
            >
              {t("header.history")}
            </Button>
          </Box>
        </Box>
      </Toolbar>
      <Box>
        {login ? (
          <Box
            sx={{
              width: "83px",
              height: "100%",
              bgcolor: "primary.main",
              display: "flex",
              p: "4px",
              boxSizing: "border-box",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              cursor: "pointer",
            }}
            onClick={() => navigate("/cart")}
          >
            <Badge
              badgeContent={cartItemCount?.value || 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: -3,
                  top: 1,
                  color: "primary.main",
                  bgcolor: "background.default",
                },
              }}
            >
              <Image src={CartIcon} alt="cart" />
            </Badge>
            <Typography.Description sx={{ letterSpacing: "2px", color: "background.default" }}>
              {t("header.cart")}
            </Typography.Description>
          </Box>
        ) : (
          <Box
            sx={{
              width: "83px",
              height: "100%",
              bgcolor: "primary.main",
              display: "flex",
              p: "4px",
              boxSizing: "border-box",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image src={DoorIcon} alt="Door" />
            <Typography.Description
              sx={{ letterSpacing: "2px", mt: "0.625rem", color: "background.default" }}
            >
              {t("header.login")}
            </Typography.Description>
          </Box>
        )}
      </Box>
    </AppBar>
  )
}
