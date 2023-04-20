import React from "react"

import { AccountSettings as DesktopAccountSettings } from "./desktop"
import { AccountSettings as MobileAccountSettings } from "./mobile"
import { ResponsiveUI } from "src/modules/responsiveUI"

export const AccountSettings = () => {
  return <ResponsiveUI mobile={<MobileAccountSettings />} laptop={<DesktopAccountSettings />} />
}
