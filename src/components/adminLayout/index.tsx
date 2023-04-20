import React from "react"
import { useLocation } from "react-router-dom"

import { AdminHeader } from "./components/AdminHeader"
import { Box } from "src/UILibrary"
import { Sidebar } from "src/components/adminSidebar"
import { AdminFooter } from "../adminPageContainer/components/AdminFooter"

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation()
  const hideSidebar = location.pathname.includes("signin")
  return (
    <Box>
      <AdminHeader />
      <Box sx={{ display: "flex" }}>
        {!hideSidebar && <Sidebar />}
        {children}
      </Box>
      <AdminFooter />
    </Box>
  )
}
