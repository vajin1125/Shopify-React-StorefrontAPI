import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"

import { getApiClient } from "src/modules/axios"
import { useGetMutation } from "src/modules/mutation"

import { IGoogleLoginInputs, ILineTokenInputs } from "src/types/login"
import { ICustomerSession, IAdminSession } from "src/types/session"

const googleCodeLogin = ({ data }: { data: IGoogleLoginInputs }) => {
  const url =
    data.userType === "admin"
      ? "/v1/admins/auth/login"
      : data.userType === "customer"
      ? "/v1/customers/auth/login"
      : ""
  return getApiClient({
    "Content-Type": "application/json",
  }).post(url, { code: data.code })
}

export const useGoogleCodeLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(googleCodeLogin, onSuccess, onError)
}

const logout = ({ userType }: { userType: string }) => {
  const url =
    userType === "admin"
      ? "/v1/admins/logout"
      : userType === "customer"
      ? "/v1/customers/logout"
      : ""
  return getApiClient({
    "Content-Type": "application/json",
  }).post(url)
}

export const useLogout = ({ onSuccess, onError }: { onSuccess: Function; onError: Function }) => {
  return useGetMutation(logout, onSuccess, onError)
}

const refresh = (userType: string) => {
  const url =
    userType === "admin"
      ? "/v1/admins/auth/refresh"
      : userType === "customer"
      ? "/v1/customers/auth/refresh"
      : ""
  return getApiClient({
    "Content-Type": "application/json",
  }).post(url)
}

export const useRefresh = (userType: string) => {
  return useQuery<AxiosResponse<ICustomerSession | IAdminSession>, AxiosError>(
    ["getLoggedInInfo", userType],
    () => {
      return refresh(userType)
    }
  )
}

const lineToken = ({ data }: { data: ILineTokenInputs }) => {
  return getApiClient({
    "Content-Type": "application/json",
  }).post("/v1/customers/auth/line", data)
}

export const useLineToken = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(lineToken, onSuccess, onError)
}

const lineLogout = () => {
  return getApiClient({
    "Content-Type": "application/json",
  }).delete("/v1/customers/auth/line")
}

export const useLineLogout = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(lineLogout, onSuccess, onError)
}
