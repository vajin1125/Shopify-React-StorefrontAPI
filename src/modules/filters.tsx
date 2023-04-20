import { IAdminProductListFilters } from "src/types/merchandise"
import { IAdminCustomerListFilters } from "src/types/user"

export const getOptimizedAdminProductListFilters = (
  params: IAdminProductListFilters
): Partial<IAdminProductListFilters> => {
  const result: Partial<IAdminProductListFilters> = { ...params }

  !params.productName && delete result.productName
  !params.isOnSale && delete result.isOnSale
  params.categoryKey === "all" && delete result.categoryKey
  !params.salesStartDate && delete result.salesStartDate
  !params.salesEndDate && delete result.salesEndDate
  !params.salesDepartments && delete result.salesDepartments

  return result
}

export const getOptimizedAdminCustomerListFilters = (
  params: IAdminCustomerListFilters
): Partial<IAdminCustomerListFilters> => {
  const result: Partial<IAdminCustomerListFilters> = { ...params }

  params.department === "all" && delete result.department
  params.school === "all" && delete result.school
  !params.grade && delete result.grade
  !params.classroom && delete result.classroom
  !params.fullName && delete result.fullName
  params.entranceYear === "all" && delete result.entranceYear

  return result
}
