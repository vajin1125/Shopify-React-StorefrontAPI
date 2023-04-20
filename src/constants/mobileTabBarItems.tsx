import { CartIcon } from "src/assets/icons/CartIcon"
import { HomeIcon } from "src/assets/icons/HomeIcon"
import { MypageIcon } from "src/assets/icons/MypageIcon"
import { SearchIcon } from "src/assets/icons/SearchIcon"

export const MOBILE_TABBAR_ITEMS = [
  { label: "tabbar.home", icon: HomeIcon, link: "/" },
  { label: "tabbar.cart", icon: CartIcon, link: "/cart" },
  { label: "tabbar.search", icon: SearchIcon, link: "/search" },
  { label: "tabbar.my_page", icon: MypageIcon, link: "/mypage" },
]
