import { gql, useQuery as useApolloQuery, useMutation as useApolloMutation } from "@apollo/client"

import { ICartItemCount, ICart } from "src/types/cart"

const getCartItemCount = gql`
  query ($id: ID!) {
    cart(id: $id) {
      lines(first: 50) {
        nodes {
          quantity
          merchandise {
            ... on ProductVariant {
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`

export const useGetCartItemCount = (cartId: string) => {
  return useApolloQuery<ICartItemCount>(getCartItemCount, {
    variables: {
      id: cartId,
    },
  })
}

const cartCreate = gql`
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`

export const useCartCreate = ({
  onCompleted,
  onError,
}: {
  onCompleted: Function
  onError: Function
}) => {
  return useApolloMutation(cartCreate, {
    onCompleted: (res) => onCompleted(res),
    onError: (err) => onError(err),
  })
}

const cartLinesAdd = gql`
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      userErrors {
        code
        field
        message
      }
    }
  }
`

export const useCartLinesAdd = ({
  onCompleted,
  onError,
}: {
  onCompleted: Function
  onError: Function
}) => {
  return useApolloMutation(cartLinesAdd, {
    onCompleted: (res) => onCompleted(res),
    onError: (err) => onError(err),
  })
}

const getCartInfo = gql`
  query ($id: ID!) {
    cart(id: $id) {
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        nodes {
          id
          quantity
          subscription: attribute(key: "subscription") {
            value
          }
          merchandise {
            ... on ProductVariant {
              priceV2 {
                amount
                currencyCode
              }
              id
              product {
                id
                title
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
              quantityAvailable
            }
          }
        }
      }
    }
  }
`

export const useGetCartInfo = (cartId: string) => {
  return useApolloQuery<ICart>(getCartInfo, {
    variables: {
      id: cartId,
    },
  })
}

const cartLinesUpdate = gql`
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      userErrors {
        code
        field
        message
      }
    }
  }
`

export const useCartLinesUpdate = ({
  onCompleted,
  onError,
}: {
  onCompleted: Function
  onError: Function
}) => {
  return useApolloMutation(cartLinesUpdate, {
    onCompleted: (res) => onCompleted(res),
    onError: (err) => onError(err),
  })
}

const cartLinesRemove = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      userErrors {
        code
        field
        message
      }
    }
  }
`

export const useCartLinesRemove = ({
  onCompleted,
  onError,
}: {
  onCompleted: Function
  onError: Function
}) => {
  return useApolloMutation(cartLinesRemove, {
    onCompleted: (res) => onCompleted(res),
    onError: (err) => onError(err),
  })
}
