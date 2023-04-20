import { Label } from "src/types/sidebar"
import { CycleArrowIcon } from "src/assets/icons/CycleArrowIcon"
import { SettingIcon } from "src/assets/icons/SettingIcon"
import { PersonIcon } from "src/assets/icons/PersonIcon"

export const SIDEBAR_LABEL: Label[] = [
  {
    id: "order",
    name: "maker.sidebar.order",
    icon: CycleArrowIcon,
  },
  {
    id: "administrator",
    name: "maker.sidebar.administrator",
    icon: PersonIcon,
  },
  {
    id: "setting",
    name: "maker.sidebar.setting",
    icon: SettingIcon,
  },
]
