import React, { createContext, useState, useContext, useEffect } from "react"

import { Box, CircularProgress } from "src/UILibrary"

import { useRefresh } from "src/queries/login"
import { ICustomerSession, ICustomerSessionState } from "src/types/session"

export const CustomerSessionContext = createContext<ICustomerSessionState | null>(null)

export const FetchAndEnsureCustomerSession: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [value, setValue] = useState<ICustomerSession>({
    id: 0,
    fullName: "",
    fullNameHiragana: "",
    grade: 0,
    classroom: 0,
    subCourse: "",
    type: "",
    readCustomerAccessToken: "",
    writeCustomerAccessToken: "",
    shopifyStoreFrontAccessToken: "",
    isLINEConnected: false,
  })

  const { data, isLoading, error } = useRefresh("customer")

  useEffect(() => {
    if (data) {
      setValue(data.data as ICustomerSession)
    }
  }, [data])

  if (isLoading || (!data && !error)) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    )
  }

  return (
    <CustomerSessionContext.Provider value={{ value, setValue }}>
      {children}
    </CustomerSessionContext.Provider>
  )
}

export const useCustomerSession = () => {
  const session = useContext(CustomerSessionContext)
  return session
}
