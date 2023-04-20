import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { useCustomerSession } from "src/modules/customerSessionProvider"

export const AuthenticationLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const session = useCustomerSession()

  useEffect(() => {
    if (!session?.value.id) {
      navigate(`/signin?redirect=${encodeURIComponent(`${location.pathname}${location.search}`)}`)
    }
  }, [session, navigate, location])

  return <>{children}</>
}
