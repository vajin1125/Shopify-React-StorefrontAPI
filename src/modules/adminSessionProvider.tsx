import React, { createContext, useState, useContext, useEffect } from "react"
import { Box, CircularProgress } from "src/UILibrary"

import { useRefresh } from "src/queries/login"
import { IAdminSession, IAdminSessionState } from "src/types/session"

export const AdminSessionContext = createContext<IAdminSessionState | null>(null)

export const FetchAndEnsureAdminSession: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [value, setValue] = useState<IAdminSession>({
    id: 0,
    type: "",
    readAdminAccessToken: "",
    writeAdminAccessToken: "",
  })

  const { data, isLoading, error } = useRefresh("admin")

  useEffect(() => {
    if (data) {
      setValue(data.data as IAdminSession)
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
    <AdminSessionContext.Provider value={{ value, setValue }}>
      {children}
    </AdminSessionContext.Provider>
  )
}

export const useAdminSession = () => {
  const session = useContext(AdminSessionContext)
  return session
}
