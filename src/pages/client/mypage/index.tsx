import React from "react"

import { MyPage as DesktopMyPage } from "./desktop"
import { MyPage as MobileMyPage } from "./mobile"
import { ResponsiveUI } from "src/modules/responsiveUI"

export const MyPage = () => {
  return <ResponsiveUI mobile={<MobileMyPage />} laptop={<DesktopMyPage />} />
}
