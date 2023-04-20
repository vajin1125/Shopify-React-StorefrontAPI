import React from "react"
import { useLocation } from "react-router-dom"

import { Box } from "src/UILibrary"
import { Header } from "./header"
import { Footer } from "./footer"
import { Sidebar } from "./sidebar"
import { Tabbar } from "./tabbar"

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation()
  const isSignIn =
    location.pathname.includes("signin") ||
    location.pathname.includes("forgot-password") ||
    location.pathname.includes("reset-password")
  const hideSidebar =
    isSignIn ||
    location.pathname.includes("purchase") ||
    location.pathname.includes("cart") ||
    location.pathname.includes("term-of-use") ||
    location.pathname.includes("privacy-policy") ||
    location.pathname.includes("act-on-transaction")

  return (
    <Box>
      <Header />
      <Box sx={{ display: { md: "flex", xs: "block" } }}>
        {!hideSidebar && (
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Sidebar />
          </Box>
        )}
        {children}
      </Box>
      {!isSignIn && <Footer />}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Tabbar />
      </Box>
    </Box>
  )
}
