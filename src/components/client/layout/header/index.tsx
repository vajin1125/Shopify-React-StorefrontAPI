import React from "react"
import { Header as MobileHeader } from "./mobile"
import { Header as LaptopHeader } from "./laptop"
import { ResponsiveUI } from "src/modules/responsiveUI"

interface HeaderProps {
  searchQuery?: string
  // eslint-disable-next-line no-unused-vars
  onChangeSearchQuery?: (query: string) => void
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onChangeSearchQuery }) => {
  return ResponsiveUI({
    mobile: <MobileHeader searchQuery={searchQuery} onChangeSearchQuery={onChangeSearchQuery} />,
    laptop: <LaptopHeader searchQuery={searchQuery} onChangeSearchQuery={onChangeSearchQuery} />,
  })
}
