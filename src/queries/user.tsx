import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"

import { getApiClient } from "src/modules/axios"
import { IAdminCustomerListFilters, ICustomerResponse } from "src/types/user"

const getUserList = (
  perPage: number,
  pageNum: number,
  filters: Partial<IAdminCustomerListFilters>,
  token: string
) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get("/v1/customers", {
    params: { perPage, pageNum, ...filters },
  })
}

export const useGetUserList = (
  perPage: number,
  pageNum: number,
  filters: Partial<IAdminCustomerListFilters>,
  token: string
) => {
  return useQuery<AxiosResponse<ICustomerResponse>, AxiosError>(
    ["getUserList", perPage, pageNum, filters, token],
    () => getUserList(perPage, pageNum, filters, token)
  )
}
