import { Label } from "src/types/sidebar"
import { CycleArrowIcon } from "src/assets/icons/CycleArrowIcon"
import { BagIcon } from "src/assets/icons/BagIcon"
import { SettingIcon } from "src/assets/icons/SettingIcon"
import { PersonIcon } from "src/assets/icons/PersonIcon"

export const SIDEBAR_LABEL: Label[] = [
  {
    id: "ordering_management",
    name: "admin.sidebar.ordering_management",
    icon: CycleArrowIcon,
    subLabels: [
      {
        id: "order_management",
        name: "admin.sidebar.order_management",
        link: "/",
      },
      {
        id: "withdrawal_record",
        name: "admin.sidebar.withdrawal_record",
        link: "/",
      },
      {
        id: "teaching_materials_sales_event",
        name: "admin.sidebar.teaching_materials_sales_event",
        link: "/",
      },
    ],
  },
  {
    id: "commodity_management",
    name: "admin.sidebar.commodity_management",
    icon: BagIcon,
    subLabels: [
      {
        id: "products",
        name: "admin.sidebar.products",
        link: "/admin/product",
      },
      {
        id: "manufacturers",
        name: "admin.sidebar.manufacturers",
        link: "/admin/maker",
      },
    ],
  },
  {
    id: "user_management",
    name: "admin.sidebar.user_management",
    icon: PersonIcon,
    subLabels: [
      {
        id: "user",
        name: "admin.sidebar.user",
        link: "/admin/user",
      },
      {
        id: "department",
        name: "admin.sidebar.department",
        link: "/admin/department",
      },
    ],
  },
  {
    id: "system_admin_management",
    name: "admin.sidebar.system_admin_management",
    icon: SettingIcon,
    subLabels: [
      {
        id: "system_admin",
        name: "admin.sidebar.system_admin",
        link: "/",
      },
    ],
  },
]
