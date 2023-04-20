import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useGoogleLogin, CodeResponse } from "@react-oauth/google"
import { AxiosResponse, AxiosError } from "axios"
import { useNavigate, useSearchParams } from "react-router-dom"

import { Box, Image, Typography } from "src/UILibrary"
import { LoadingModal } from "src/components/shared/loadingModal"

import { useGoogleCodeLogin } from "src/queries/login"
import { useCustomerSession } from "src/modules/customerSessionProvider"
import { ICustomerSession } from "src/types/session"
import { usePushAlerts } from "src/hooks/alerts"

import GoogleLogo from "src/assets/icons/logo_google.svg"
import LoginByGoogleIcon from "src/assets/icons/loginByGoogle.svg"

export const StudentOrTeacherPanel: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const session = useCustomerSession()
  const pushAlerts = usePushAlerts()
  const [notFound, setNotFound] = useState<boolean>(false)

  const redirectUrl = searchParams.get("redirect") || "/"

  const { mutate: googleCodeLogin, isLoading } = useGoogleCodeLogin({
    onSuccess: (res: AxiosResponse<ICustomerSession>) => session?.setValue(res.data),
    onError: (err: AxiosError) => {
      console.error(err)
      if (err.response?.status === 404) {
        setNotFound(true)
      } else if (err.response?.status === 500) {
        pushAlerts({ message: t("auth.server_error"), color: "error" })
      } else {
        pushAlerts({ message: t("auth.unknown_error"), color: "error" })
      }
    },
  })

  const googleLogin = useGoogleLogin({
    onSuccess: (res: Omit<CodeResponse, "error" | "error_description" | "error_uri">) => {
      googleCodeLogin({ data: { code: res.code, userType: "customer" } })
    },
    flow: "auth-code",
  })

  useEffect(() => {
    !!session?.value.readCustomerAccessToken && navigate(redirectUrl)
  }, [session, navigate, redirectUrl])

  return (
    <>
      {notFound && (
        <Typography.Description sx={{ width: 300, mb: 3, color: "error.main" }}>
          {t("auth.not_found")}
        </Typography.Description>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "295.2px",
          height: "62.4px",
          bgcolor: "background.default",
          mt: "44.8px",
          mb: "20.8px",
          boxShadow: "0 2px 2px rgba(72, 72, 72, 0.25)",
          borderRadius: "2px",
          filter:
            "drop-shadow(0 0 1px rgba(0, 0, 0, 0.084)) drop-shadow(0 1px 1px rgba(0,0,0,0.168))",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => {
          setNotFound(false)
          googleLogin()
        }}
      >
        <Image
          src={GoogleLogo}
          alt="google log"
          sx={{
            my: "15.8px",
            ml: "15.6px",
          }}
        />
        <Image
          src={LoginByGoogleIcon}
          alt="log by google"
          sx={{
            m: "22.8px 42.19px 18.6px 0",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      </Box>
      <Box sx={{ pr: "38px", pl: "41px" }}>
        <Typography.Description
          sx={{
            fontWeight: 400,
            lineHeight: "1.5rem",
            textAlign: "center",
            letterSpacing: 0,
          }}
        >
          {t("auth.by_signing")}
        </Typography.Description>
        <Typography.Description
          sx={{
            fontWeight: 400,
            lineHeight: "1.5rem",
            textAlign: "center",
            letterSpacing: 0,
          }}
        >
          {t("auth.privacy_acceptance")}
        </Typography.Description>
      </Box>
      <LoadingModal open={isLoading} />
    </>
  )
}
