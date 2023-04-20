export interface ICustomer {
  id: number
  fullName: string
  fullNameHiragana: string
  grade: number
  school: string
  classroom: number
  department: string
  studentId: number
  type: string
  entranceYear: number
}

export interface ICustomerResponse {
  customers: ICustomer[]
  totalCustomerNumber: number
}

export interface IAdminCustomerListFilters {
  department: string
  school: string
  grade: number
  classroom: number
  fullName: string
  entranceYear: string
}
