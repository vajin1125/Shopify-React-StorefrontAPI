import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Box, Image, Typography } from "src/UILibrary"

import { CUSTOMER_SIDEBAR } from "src/constants/customerSidebar"
import { useProductSearch } from "src/hooks/useProductSearch"

export const Sidebar: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { onSelectCategories } = useProductSearch()

  const handleClick = (category: string) => {
    if (location.pathname !== "/search") {
      navigate(`/search?categories=${category}`)
    } else {
      onSelectCategories([category])
    }
  }

  return (
    <Box
      sx={{
        width: "250px",
        flex: "none",
        mt: "5.25rem",
        boxShadow: "1px 1px 6px 1px rgba(231, 231, 231, 0.25)",
        minHeight: "calc(100vh - 83px)",
      }}
    >
      <Typography.SubTitle
        sx={{
          bgcolor: "#F1ECE0",
          lineHeight: "3rem",
          letterSpacing: "2px",
          color: "primary.main",
          pl: "19px",
        }}
      >
        {t("sidebar.category")}
      </Typography.SubTitle>

      {CUSTOMER_SIDEBAR.map((section) => (
        <Box
          key={section.label}
          sx={{
            pb: 1,
            borderBottom: section.hasBottom ? "1px solid" : 0,
            borderColor: "divider",
          }}
        >
          <Typography.SubTitle
            sx={{
              display: "flex",
              lineHeight: "3rem",
              fontWeight: 500,
              letterSpacing: "2px",
              pl: "19px",
            }}
          >
            <Image src={section.icon} alt="list-icon" sx={{ width: "1rem", mr: "0.5rem" }} />
            {t(section.label)}
          </Typography.SubTitle>
          {section.items.map((item) => (
            <Box
              key={item.label}
              sx={{
                display: "flex",
                alignItems: "center",
                pl: "1.875rem",
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                },
              }}
              onClick={() => handleClick(item.category)}
            >
              <Typography.Caption
                sx={{
                  width: "6px",
                  height: 0,
                  border: "1px solid",
                  borderColor: "primary.main",
                  mr: "0.5rem",
                }}
              />
              <Typography.SubTitle
                sx={{
                  lineHeight: "1.875rem",
                  fontWeight: 500,
                  letterSpacing: "2px",
                }}
              >
                {t(item.label)}
              </Typography.SubTitle>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}
