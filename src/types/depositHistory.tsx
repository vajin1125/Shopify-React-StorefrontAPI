export interface IDepositHistory {
  id: number
  date: string
  paymentGateway: string
  amount: number
}

export interface IDepositHistoryResponse {
  depositHistories: IDepositHistory[]
  totalHistoryNumber: number
}
