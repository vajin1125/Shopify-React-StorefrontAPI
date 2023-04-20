import { gql, useQuery as useApolloQuery } from "@apollo/client"
import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError, AxiosProgressEvent } from "axios"

import { getApiClient } from "src/modules/axios"
import { useGetMutation } from "src/modules/mutation"
import {
  IProduct,
  IAdminProductList,
  IAdminProductItem,
  IProductTags,
  IProductStyle,
  IProductStyles,
  IAdminProductVariants,
  IUpdateProductVariants,
  IProductMedias,
} from "src/types/product"
import { IAdminProductListFilters } from "src/types/merchandise"

const getProduct = gql`
  query ($id: ID!) {
    product(id: $id) {
      availableForSale
      description
      title
      totalInventory
      images(first: 10) {
        nodes {
          url
          altText
        }
      }
      collections(first: 5) {
        nodes {
          title
        }
      }
      options(first: 10) {
        id
        name
        values
      }
      variants(first: 50) {
        nodes {
          priceV2 {
            amount
            currencyCode
          }
          id
          title
          image {
            url
            altText
          }
          selectedOptions {
            name
            value
          }
          quantityAvailable
        }
      }
    }
  }
`

export const useGetProduct = (id: string) => {
  return useApolloQuery<IProduct>(getProduct, {
    variables: {
      id: `gid://shopify/Product/${id}`,
    },
  })
}

export const getProductList = gql`
  query ($after: String, $query: String) {
    products(first: 20, after: $after, query: $query) {
      nodes {
        id
        title
        description
        availableForSale
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          nodes {
            url
            altText
          }
        }
        collections(first: 5) {
          nodes {
            title
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

const getAdminProductList = (
  perPage: number,
  pageNum: number,
  filters: Partial<IAdminProductListFilters>,
  token: string
) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get("/v1/products", { params: { perPage, pageNum, ...filters } })
}

export const useGetAdminProductList = (
  perPage: number,
  pageNum: number,
  filters: Partial<IAdminProductListFilters>,
  token: string
) => {
  return useQuery<AxiosResponse<IAdminProductList>, AxiosError>(
    ["getAdminProductList", perPage, pageNum, filters, token],
    () => getAdminProductList(perPage, pageNum, filters, token)
  )
}

const getAdminProduct = (id: string, token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/products/${id}`)
}

export const useGetAdminProduct = (id: string, token: string) => {
  return useQuery<AxiosResponse<IAdminProductItem>, AxiosError>(
    ["getAdminProduct", id, token],
    () => getAdminProduct(id, token)
  )
}

const createAdminProduct = ({ token }: { token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).post("/v1/products")
}

export const useCreateAdminProduct = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(createAdminProduct, onSuccess, onError)
}

const updateAdminProduct = ({
  productId,
  data,
  token,
}: {
  productId: string
  data: IAdminProductItem
  token: string
}) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).put(`/v1/products/${productId}`, data)
}

export const useUpdateAdminProduct = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(updateAdminProduct, onSuccess, onError)
}

const deleteProduct = ({ productId, token }: { productId: string; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).delete(`/v1/products/${productId}`)
}

export const useDeleteProduct = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(deleteProduct, onSuccess, onError)
}

const getProductTags = (id: string, token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/products/${id}/tags`)
}

export const useGetProductTags = (id: string, token: string) => {
  return useQuery<AxiosResponse<IProductTags>, AxiosError>(["getProductTags", id, token], () =>
    getProductTags(id, token)
  )
}

const createProductTags = ({
  id,
  tagNames,
  token,
}: {
  id: string
  tagNames: string[]
  token: string
}) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).post(`/v1/products/${id}/tags`, { tagNames })
}

export const useCreateProductTags = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(createProductTags, onSuccess, onError)
}

const deleteProductTags = ({
  id,
  tagName,
  token,
}: {
  id: string
  tagName: string
  token: string
}) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).delete(`/v1/products/${id}/tags/${tagName}`)
}

export const useDeleteProductTags = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(deleteProductTags, onSuccess, onError)
}

const getProductStyles = (id: string, token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/products/${id}/styles`)
}

export const useGetProductStyles = (id: string, token: string) => {
  return useQuery<AxiosResponse<IProductStyles>, AxiosError>(["getProductStyles", id, token], () =>
    getProductStyles(id, token)
  )
}

const createProductStyles = ({
  id,
  style,
  token,
}: {
  id: string
  style: IProductStyle
  token: string
}) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).post(`/v1/products/${id}/styles`, { type: style.type, values: style.value })
}

export const useCreateProductStyles = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(createProductStyles, onSuccess, onError)
}

const updateProductStyles = ({
  id,
  style,
  token,
}: {
  id: string
  style: IProductStyle
  token: string
}) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).put(`/v1/products/${id}/styles`, { type: style.type, values: style.value })
}

export const useUpdateProductStyles = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(updateProductStyles, onSuccess, onError)
}

const deleteProductStyles = ({
  id,
  styleName,
  token,
}: {
  id: string
  styleName: string
  token: string
}) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).delete(`/v1/products/${id}/styles/${styleName}`)
}

export const useDeleteProductStyles = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(deleteProductStyles, onSuccess, onError)
}

const getProductVariants = (id: string, token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/products/${id}/styles`)
}

export const useGetProductVariants = (id: string, token: string) => {
  return useQuery<AxiosResponse<IAdminProductVariants>, AxiosError>(
    ["getProductVariants", id, token],
    () => getProductVariants(id, token)
  )
}

const updateProductVariants = ({
  id,
  data,
  token,
}: {
  id: string
  data: IUpdateProductVariants
  token: string
}) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).put(`/v1/products/${id}/styles`, data)
}

export const useUpdateProductVariants = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(updateProductVariants, onSuccess, onError)
}

const getProductMedias = (id: string, variantId: string, token: string) => {
  const url = variantId
    ? `/v1/products/${id}/variants/${variantId}/medias`
    : `/v1/products/${id}/medias`
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(url)
}

export const useGetProductMedias = (id: string, variantId: string, token: string) => {
  return useQuery<AxiosResponse<IProductMedias>, AxiosError>(
    ["getProductMedias", id, variantId, token],
    () => getProductMedias(id, variantId, token)
  )
}

const createProductMedia = ({
  id,
  variantId,
  image,
  token,
  setProgress,
}: {
  id: string
  variantId: string
  image: File
  token: string
  setProgress: Function
}) => {
  const url = variantId
    ? `/v1/products/${id}/variants/${variantId}/medias`
    : `/v1/products/${id}/medias`
  const formData = new FormData()
  formData.append("image", image)
  return getApiClient({
    "Content-Type": "multipart/form-data",
    Authorization: token ? `Bearer ${token}` : "",
  }).post(url, formData, {
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      setProgress(Math.round(progressEvent.loaded * 100) / (progressEvent.total || 1))
    },
  })
}

export const useCreateProductMedia = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(createProductMedia, onSuccess, onError)
}

const deleteProductMedias = ({
  id,
  variantId,
  mediaId,
  token,
}: {
  id: string
  variantId: string
  mediaId: string
  token: string
}) => {
  const url = variantId
    ? `/v1/products/${id}/variants/${variantId}/medias/${mediaId}`
    : `/v1/products/${id}/medias/${mediaId}`
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).delete(url)
}

export const useDeleteProductMedias = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(deleteProductMedias, onSuccess, onError)
}
