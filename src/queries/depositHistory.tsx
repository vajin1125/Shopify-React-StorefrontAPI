import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"

import { getApiClient } from "src/modules/axios"
import { IDepositHistoryResponse } from "src/types/depositHistory"

const getDepositHistoryList = (perPage: number, pageNum: number, token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/billing/deposit?perPage=${perPage}&pageNum=${pageNum}`)
}

export const useGetDepositHistoryList = (perPage: number, pageNum: number, token: string) => {
  return useQuery<AxiosResponse<IDepositHistoryResponse>, AxiosError>(
    ["getDepositHistoryList", perPage, pageNum, token],
    () => getDepositHistoryList(perPage, pageNum, token)
  )
}
