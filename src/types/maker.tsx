type OrderRecipientEmail = {
  orderRecipientEmail: string
}
export interface Maker {
  id: number
  name: string
  representativeName: string
  representativeEmail: string
  accountingDepartmentEmail: OrderRecipientEmail[] | string
}

export interface IMakerResponse {
  makers: Maker[]
  totalMakerNumber: number
}
