import React from "react"
import { useTranslation } from "react-i18next"

import { Box } from "src/UILibrary"
import { SidebarLabel } from "src/components/adminSidebar/components/sidebarLabel"
import { SIDEBAR_LABEL } from "src/constants/makerSidebar"

export const MakerSidebar = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        width: "250px",
        flexShrink: 0,
        mt: "5.25rem",
        boxShadow: "1px 1px 6px 1px rgba(231, 231, 231, 0.25)",
        minHeight: "calc(100vh - 85px)",
      }}
    >
      {SIDEBAR_LABEL.map(({ id, name, icon }) => {
        if (id === "setting") {
          return (
            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                bgcolor: "info.dark",
                width: "250px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                height: "40px",
                pl: 2.5,
                borderTop: "1px solid",
                borderColor: "primary.light",
              }}
            >
              <SidebarLabel
                Icon={icon}
                label={t(name)}
                iconProps={{ color: "#231F20" }}
                labelProps={{ sx: { color: "text.primary" } }}
              />
            </Box>
          )
        }
        return (
          <Box
            key={id}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "40px",
              pl: 2.5,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <SidebarLabel Icon={icon} label={t(name)} />
          </Box>
        )
      })}
    </Box>
  )
}
