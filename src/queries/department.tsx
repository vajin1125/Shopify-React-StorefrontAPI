import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"

import { getApiClient } from "src/modules/axios"
import { useGetMutation } from "src/modules/mutation"
import { IDepartmentResponse } from "src/types/department"

const getDepartmentList = (perPage: number, pageNum: number, token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/customers/departments?perPage=${perPage}&pageNum=${pageNum}`)
}

export const useGetDepartmentList = (perPage: number, pageNum: number, token: string) => {
  return useQuery<AxiosResponse<IDepartmentResponse>, AxiosError>(
    ["getDepartmentList", perPage, pageNum, token],
    () => getDepartmentList(perPage, pageNum, token)
  )
}

const softDeleteDepartments = ({
  departmentIds,
  token,
}: {
  departmentIds: number[]
  token: string
}) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).delete(`/v1/customers/departments?departmentIDs=${departmentIds.join()}`)
}

export const useSoftDeleteDepartments = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(softDeleteDepartments, onSuccess, onError)
}
