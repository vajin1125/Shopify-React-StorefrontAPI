import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"

import { getApiClient } from "src/modules/axios"
import { useGetMutation } from "src/modules/mutation"
import { ICard, IDefaultPaymentBody, IPaymentMethod } from "src/types/paymentMethod"

const getPaymentMethods = (token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/billing/paymentMethods`)
}

export const useGetPaymentMethods = (token: string) => {
  return useQuery<AxiosResponse<IPaymentMethod>, AxiosError>(["getPaymentMethods", token], () =>
    getPaymentMethods(token)
  )
}

const addCreditCard = ({ data, token }: { data: ICard; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).post(`/v1/billing/creditcards`, data)
}

export const useAddCreditCard = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(addCreditCard, onSuccess, onError)
}

const updateCreditCard = ({ id, data, token }: { id: string; data: ICard; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).put(`/v1/billing/creditcards/${id}`, data)
}

export const useUpdateCreditCard = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(updateCreditCard, onSuccess, onError)
}

const deleteCreditCard = ({ id, token }: { id: string; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).delete(`/v1/billing/creditcards/${id}`)
}

export const useDeleteCreditCard = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(deleteCreditCard, onSuccess, onError)
}

const updateDefaultPaymentMethod = ({
  customerId,
  defaultCardId,
  data,
  token,
}: {
  customerId: string
  defaultCardId: string
  data: IDefaultPaymentBody
  token: string
}) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).put(`/v1/customers/${customerId}?defaultCardId=${defaultCardId}`, data)
}

export const useUpdateDefaultPaymentMethod = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(updateDefaultPaymentMethod, onSuccess, onError)
}
