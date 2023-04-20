import React from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

import { Box, Image, Typography } from "src/UILibrary"
import { FOOTER_CONSTANT, FOOTER_ITEMS } from "src/constants/footer"
import Logo from "src/assets/icons/logo_default.svg"

export const Footer = () => {
  const { t } = useTranslation()
  const location = useLocation()

  if (location.pathname === "/search") {
    return null
  }

  return (
    <Box
      sx={{
        p: "2rem 1rem 0 1.625rem",
        bgcolor: "primary.main",
        mb: "4.6875rem",
      }}
    >
      {FOOTER_ITEMS.map(({ title, items }, index) => {
        return (
          <Box key={index}>
            <Typography.SubTitle
              sx={{
                lineHeight: "1.125rem",
                color: "background.default",
                mb: "0.5rem",
              }}
            >
              {t(title)}
            </Typography.SubTitle>
            {items.map((translateKey, index) => (
              <Typography.Description
                key={index}
                sx={{
                  lineHeight: "1.125rem",
                  color: "background.default",
                  mt: "0.5rem",
                }}
              >
                {t(translateKey)}
              </Typography.Description>
            ))}
            {index !== FOOTER_ITEMS.length - 1 && (
              <Box
                sx={{
                  border: "0.125rem solid",
                  borderColor: "background.default",
                  width: "5rem",
                  height: 0,
                  m: "2rem 0",
                }}
              />
            )}
          </Box>
        )
      })}
      <Image
        src={Logo}
        alt="Logo"
        sx={{
          display: "flex",
          justifyContent: "end",
          mt: "5rem",
          mb: "1.5rem",
          "& img": {
            p: "0.5rem 1rem",
            boxSizing: "border-box",
            bgcolor: "background.default",
            width: "172px",
            height: "38px",
            objectFit: "contain",
          },
        }}
      />
      <Typography.Caption
        align="center"
        sx={{
          lineHeight: "1.5rem",
          bgcolor: "primary.dark",
          color: "background.default",
          m: "0 -1rem 0 -1.625rem",
        }}
      >
        {FOOTER_CONSTANT}
      </Typography.Caption>
    </Box>
  )
}
