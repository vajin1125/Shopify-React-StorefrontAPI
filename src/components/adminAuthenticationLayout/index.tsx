import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { useAdminSession } from "src/modules/adminSessionProvider"

export const AuthenticationLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const session = useAdminSession()

  useEffect(() => {
    if (!session?.value.id) {
      navigate(
        `/admin/signin?redirect=${encodeURIComponent(`${location.pathname}${location.search}`)}`
      )
    }
  }, [session, navigate, location])

  return <>{children}</>
}
