export interface ICard {
  paymentMethodId: string
  cardHolderName: string
  expYear: string
  expMonth: string
  last4: string
  brand: string
}

export interface ICreditCard {
  cards: ICard[]
  defaultCardId: string
  totalCardNumber: number
}

export interface IPaypay {
  isConnected: boolean
  cashBalance: number
}

export type DefaultPaymentMethod = "card" | "konbini" | "paypay"

export interface IPaymentMethod {
  defaultPaymentMethod: DefaultPaymentMethod
  creditcard: ICreditCard
  paypay: IPaypay
}

export interface IDefaultPaymentBody {
  defaultPaymentMethod: DefaultPaymentMethod
}
