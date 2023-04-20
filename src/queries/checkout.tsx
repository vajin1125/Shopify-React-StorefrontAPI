import { getApiClient } from "src/modules/axios"
import { useGetMutation } from "src/modules/mutation"
import { ICheckout } from "src/types/checkout"

const doCheckout = ({ data, token }: { data: ICheckout; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).post(`/v1/billing/checkout`, data)
}

export const useDoCheckout = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(doCheckout, onSuccess, onError)
}
