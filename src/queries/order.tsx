import { useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

import { getApiClient } from "src/modules/axios"

const getOrderDetail = (id: string, token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/orders/${id}`)
}

export const useGetOrderDetail = (id: string, token: string) => {
  return useQuery<AxiosResponse, AxiosError>(["getOrderDetail", id, token], () =>
    getOrderDetail(id, token)
  )
}
