import { ApolloClient, InMemoryCache } from "@apollo/client"

export const getShopifyClient = () => {
  return new ApolloClient({
    uri: process.env.REACT_APP_SHOPIFY_URL,
    cache: new InMemoryCache(),
    headers: {
      "X-Shopify-Storefront-Access-Token": process.env.REACT_APP_STORE_FRONT_ACCESS_TOKEN || "",
      "Content-Type": "application/json",
    },
  })
}
