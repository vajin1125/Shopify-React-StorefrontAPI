export interface MerchandiseManagement {
  id: string
  name: string
  is_on_sale: string
  category: string
  sales_period: string
  for_sale: string
}

export interface IAdminProductListFilters {
  productName: string
  isOnSale: boolean
  categoryKey: string
  salesStartDate: string
  salesEndDate: string
  salesDepartments: string
}
