import React from "react"
import { useLocation } from "react-router-dom"

import { Grid } from "src/UILibrary"
import { MOBILE_TABBAR_ITEMS } from "src/constants/mobileTabBarItems"
import { TabItem } from "./components/tabItem"

export const Tabbar = () => {
  const location = useLocation()

  const checkBeforeLogin = () => {
    return (
      location.pathname === "/signin" ||
      location.pathname === "/signup" ||
      location.pathname === "/forgot-password" ||
      location.pathname === "/reset-password"
    )
  }
  const logged = !checkBeforeLogin()

  return (
    <Grid
      container
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        height: "54px",
        bgcolor: "background.default",
        boxSizing: "content-box",
        pb: "21px",
        zIndex: 10000,
        borderTop: "0.5px solid",
        borderColor: "divider",
      }}
    >
      {MOBILE_TABBAR_ITEMS.map(({ label, icon, link }) => (
        <Grid
          item
          key={`mobile-tabbar_${label}`}
          xs={3}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <TabItem Icon={icon} label={label} disabled={!logged} link={link} />
        </Grid>
      ))}
    </Grid>
  )
}
