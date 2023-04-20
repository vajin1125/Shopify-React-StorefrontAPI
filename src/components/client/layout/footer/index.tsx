import React from "react"
import { useLocation } from "react-router-dom"

import { ResponsiveUI } from "src/modules/responsiveUI"
import { Footer as MobileFooter } from "./mobile"
import { Footer as LaptopFooter } from "./laptop"

export const Footer = () => {
  const location = useLocation()
  const isPurchaseComplete = location.pathname.includes("purchase-complete")

  return ResponsiveUI({ mobile: <MobileFooter />, laptop: !isPurchaseComplete && <LaptopFooter /> })
}
