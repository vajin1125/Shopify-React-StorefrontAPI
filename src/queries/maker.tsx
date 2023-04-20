import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"

import { getApiClient } from "src/modules/axios"
import { useGetMutation } from "src/modules/mutation"
import { IMakerResponse, Maker } from "src/types/maker"

const getMakerList = (perPage: number, pageNum: number, keyword: string, token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/products/makers?perPage=${perPage}&pageNum=${pageNum}&keyword=${keyword}`)
}

export const useGetMakerList = (
  perPage: number,
  pageNum: number,
  keyword: string,
  token: string
) => {
  return useQuery<AxiosResponse<IMakerResponse>, AxiosError>(
    ["getMakerList", perPage, pageNum, keyword, token],
    () => getMakerList(perPage, pageNum, keyword, token)
  )
}

const addMaker = ({ data, token }: { data: Maker; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).post(`/v1/products/makers`, data)
}

export const useAddMaker = ({ onSuccess, onError }: { onSuccess: Function; onError: Function }) => {
  return useGetMutation(addMaker, onSuccess, onError)
}

const editMaker = ({ id, data, token }: { id: number; data: Maker; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).put(`/v1/products/makers/${id}`, data)
}

export const useEditMaker = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(editMaker, onSuccess, onError)
}

const softDeleteMaker = ({ id, token }: { id: number[]; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).delete(`/v1/products/makers/${id}`)
}

export const useSoftDeleteMaker = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(softDeleteMaker, onSuccess, onError)
}
