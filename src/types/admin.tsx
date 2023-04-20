export interface Admin {
  id: number
  fullName: string
  googleWorkspaceAccountId?: string
  school: string
  type: AdminType
  email: string
}
export type AdminType =
  | "school"
  | "teacher"
  | "system_department_in_head_quarter"
  | "academic_affair_department_in_head_quarter"

export type AdminTypeLabels = Record<AdminType, string>

export interface IAdminResponse {
  admins: Admin[]
  totalAdminNumber: number
}

export type ChangableAdmin = Pick<Admin, "email" | "type">
