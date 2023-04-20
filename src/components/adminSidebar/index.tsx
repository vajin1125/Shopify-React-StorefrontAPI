import React from "react"

import { Box } from "src/UILibrary"
import { SidebarAccordions } from "src/types/sidebar"
import { SIDEBAR_LABEL } from "src/constants/adminSidebar"
import { SidebarAccordion } from "./components/sidebarAccordion"

export const Sidebar = () => {
  const [expanded, setExpanded] = React.useState<Record<SidebarAccordions, boolean>>({
    ordering_management: true,
    commodity_management: true,
    user_management: true,
    system_admin_management: false,
  })

  const handleChange = (panel: SidebarAccordions) => () => {
    setExpanded((expanded) => ({
      ...expanded,
      [panel]: !expanded[panel],
    }))
  }

  return (
    <Box
      sx={{
        width: "250px",
        flex: "none",
        mt: "5.25rem",
        boxShadow: "1px 1px 6px 1px rgba(231, 231, 231, 0.25)",
        minHeight: "calc(100vh - 85px)",
      }}
    >
      {SIDEBAR_LABEL.map(({ id, name, icon, subLabels }) => (
        <SidebarAccordion
          key={id}
          expanded={expanded[id as SidebarAccordions]}
          handleChange={handleChange(id as SidebarAccordions)}
          label={name}
          labelIcon={icon}
          sublist={subLabels}
        />
      ))}
    </Box>
  )
}
