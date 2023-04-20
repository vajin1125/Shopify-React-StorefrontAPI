import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"
import { getApiClient } from "src/modules/axios"
import { useGetMutation } from "src/modules/mutation"
import { IAdminResponse, ChangableAdmin } from "src/types/admin"

const getAdminList = (perPage: number, pageNum: number, keyword: string, token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/admins?perPage=${perPage}&pageNum=${pageNum}&keyword=${keyword}`)
}
export const useGetAdminList = (
  perPage: number,
  pageNum: number,
  keyword: string,
  token: string
) => {
  return useQuery<AxiosResponse<IAdminResponse>, AxiosError>(
    ["getAdminList", perPage, pageNum, keyword, token],
    () => getAdminList(perPage, pageNum, keyword, token)
  )
}

const addAdminList = ({ data, token }: { data: ChangableAdmin; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).post(`/v1/admins`, data)
}

export const useAddAdmin = ({ onSuccess, onError }: { onSuccess: Function; onError: Function }) => {
  return useGetMutation(addAdminList, onSuccess, onError)
}

const updateAdminList = ({
  adminID,
  data,
  token,
}: {
  adminID: number
  data: ChangableAdmin
  token: string
}) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).put(`/v1/admins/${adminID}`, data)
}

export const useEditAdmin = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(updateAdminList, onSuccess, onError)
}

const removeAdminList = ({ adminId, token }: { adminId: number; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).delete(`/v1/admins/${adminId}`)
}

export const useDeleteAdmins = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(removeAdminList, onSuccess, onError)
}
