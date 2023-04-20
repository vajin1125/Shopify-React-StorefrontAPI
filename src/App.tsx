import React from "react"
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import { QueryClientProvider } from "@tanstack/react-query"
import { ApolloProvider } from "@apollo/client"

import { ThemeProvider } from "src/UILibrary"
import { AlertLayout } from "src/components/shared/alertLayout"
import "./App.css"
import { Body } from "./Body"
import { DefaultTheme } from "src/themes/default"
import { getShopifyClient } from "src/modules/shopify"
import { getQueryClient } from "src/modules/queryClient"

function App() {
  const queryClient = getQueryClient()
  const shopifyClient = getShopifyClient()

  return (
    <ThemeProvider theme={DefaultTheme}>
      <RecoilRoot>
        <ApolloProvider client={shopifyClient}>
          <QueryClientProvider client={queryClient}>
            <AlertLayout>
              <BrowserRouter>
                <Body />
              </BrowserRouter>
            </AlertLayout>
          </QueryClientProvider>
        </ApolloProvider>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default App
