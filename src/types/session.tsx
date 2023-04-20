export interface ICustomerSession {
  id: number
  fullName: string
  fullNameHiragana: string
  grade: number
  classroom: number
  subCourse: string
  type: string
  readCustomerAccessToken: string
  writeCustomerAccessToken: string
  shopifyStoreFrontAccessToken: string
  isLINEConnected: boolean
}

export interface ICustomerSessionState {
  value: ICustomerSession
  setValue: Function
}

export interface IAdminSession {
  id: number
  type: string
  readAdminAccessToken: string
  writeAdminAccessToken: string
}

export interface IAdminSessionState {
  value: IAdminSession
  setValue: Function
}
