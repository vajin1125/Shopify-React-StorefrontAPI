import React, { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"

import { Image, Box, OutlinedInput } from "src/UILibrary"
import Logo from "src/assets/icons/logo.svg"
import { SearchIcon } from "src/assets/icons/SearchIcon"

interface HeaderProps {
  searchQuery?: string
  // eslint-disable-next-line no-unused-vars
  onChangeSearchQuery?: (query: string) => void
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onChangeSearchQuery }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchMode, setSearchMode] = useState<boolean>(pathname === "/search")

  const login =
    location.pathname !== "/signin" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/forgot-password" &&
    location.pathname !== "/reset-password"

  const handleClickSearch = () => {
    setSearchMode(!searchMode)
  }

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        height: "85px",
      }}
    >
      <Image
        src={Logo}
        alt="Logo"
        sx={{ m: "2rem auto", mb: "1rem", display: searchMode ? "none" : "block" }}
      />
      <OutlinedInput
        placeholder={t("header.search_placeholder")}
        sx={{
          borderRadius: "22px",
          m: "2rem 3rem 1rem 0.75rem ",
          height: "2.25rem",
          width: "100%",
          display: searchMode ? "block" : "none",
          bgcolor: "background.default",
        }}
        inputProps={{
          sx: { p: "0.5rem 1rem" },
        }}
        value={searchQuery}
        onChange={handleChange}
      />
      <Box onClick={handleClickSearch}>
        <SearchIcon
          width="24"
          height="24"
          sx={{
            position: "absolute",
            right: "1rem",
            top: "2.35rem",
            display: login ? "block" : "none",
          }}
        />
      </Box>
    </Box>
  )
}
