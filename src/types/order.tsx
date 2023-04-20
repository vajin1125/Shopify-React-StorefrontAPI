export type OrderState = "handed_over" | "deposited" | "new_reception"
export interface Order {
  id: string
  product_name: string
  student_number: string
  order_date: string
  deposit_date: string
  ordering_date: string
  delivery_date: string
  handover_date: string
  state: OrderState
}

export interface OrderProduct {
  id: string
  quantity: number
  singlePrice: number
  title: string
  imageUrl: string
}

export interface OrderLog {
  id: number
  date: string
  isCancelled: boolean
  type: "order" | "payment" | "makerOrder" | "submit" | "handOver" | "cancel"
}

export interface OrderDetail {
  name: string
  orderedDate: string
  handedOverDate: string
  makerOrderedDate: string
  submitDate: string
  paymentDate: string
  paymentMethod: "creditCard" | "konbini" | "paypay"
  products: OrderProduct[]
  logs: OrderLog[]
}
