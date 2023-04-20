import { atom } from "recoil"

export const isCreateProductState = atom<boolean>({
  key: "isCreateProduct",
  default: false,
})
