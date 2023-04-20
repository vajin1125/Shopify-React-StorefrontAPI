import { IPaymentMethod } from "./paymentMethod"

export interface ICheckoutProduct {
  productName: string
  singlePrice: number
  quantity: number
  productID: string
}

export interface ICheckout {
  paymentMethod: IPaymentMethod
  products: ICheckoutProduct[]
}
