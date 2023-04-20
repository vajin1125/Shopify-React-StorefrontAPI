import React from "react"

import { Box } from "src/UILibrary"
import { AdminHeader } from "src/components/adminLayout/components/AdminHeader"
import { MakerSidebar } from "./components/MakerSidebar"
import { AdminFooter } from "../adminPageContainer/components/AdminFooter"

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box>
      <AdminHeader />
      <Box sx={{ display: "flex" }}>
        <MakerSidebar />
        {children}
      </Box>
      <AdminFooter />
    </Box>
  )
}
