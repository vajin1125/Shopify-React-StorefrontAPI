export interface Department {
  id: string
  group_name: string
  memberNumber: number
}

export interface IDepartmentResponse {
  departments: Department[]
  totalCount: number
}
