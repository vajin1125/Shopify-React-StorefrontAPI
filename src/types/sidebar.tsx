import React from "react"

import { IconProps } from "src/types/icon"

export type Label = {
  id: string
  name: string
  icon?: React.FC<IconProps>
  link?: string
  subLabels?: Label[]
}

export type SidebarAccordions =
  | "ordering_management"
  | "commodity_management"
  | "user_management"
  | "system_admin_management"
