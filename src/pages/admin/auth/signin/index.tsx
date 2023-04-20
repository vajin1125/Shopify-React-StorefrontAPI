import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useGoogleLogin, CodeResponse } from "@react-oauth/google"
import { AxiosResponse, AxiosError } from "axios"
import { useNavigate, useSearchParams } from "react-router-dom"

import { Box, Image, Typography } from "src/UILibrary"
import { Navigation } from "./components/Navigation"
import { LoadingModal } from "src/components/shared/loadingModal"

import { FOOTER_CONSTANT } from "src/constants/footer"
import { useGoogleCodeLogin } from "src/queries/login"

import GoogleLogo from "src/assets/icons/logo_google.svg"
import LoginByGoogleIcon from "src/assets/icons/loginByGoogle.svg"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { IAdminSession } from "src/types/session"
import { usePushAlerts } from "src/hooks/alerts"

export const SignIn: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const session = useAdminSession()
  const pushAlerts = usePushAlerts()
  const [notFound, setNotFound] = useState<boolean>(false)

  const redirectUrl = searchParams.get("redirect") || "/admin/order"

  const { mutate: googleCodeLogin, isLoading } = useGoogleCodeLogin({
    onSuccess: (res: AxiosResponse<IAdminSession>) => session?.setValue(res.data),
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
      googleCodeLogin({ data: { code: res.code, userType: "admin" } })
    },
    flow: "auth-code",
  })

  useEffect(() => {
    !!session?.value.id && navigate(redirectUrl)
  }, [session, navigate, redirectUrl])

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        minHeight: { xs: "calc(100vh - 85px)", md: "100vh" },
        bgcolor: "background.paper",
      }}
    >
      <Typography.Title
        color="primary"
        sx={{ lineHeight: "1.5rem", mt: { md: "11.5625rem", xs: "6.375rem" } }}
      >
        {t("header.login")}
      </Typography.Title>
      <Navigation />
      {notFound && (
        <Typography.Description sx={{ width: 300, mt: 45, mb: 3, color: "error.main" }}>
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
          mt: notFound ? 0 : "44.8px",
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
      <Box>
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
        <Typography.Description
          sx={{
            fontWeight: 400,
            lineHeight: "1.5rem",
            textAlign: "center",
            letterSpacing: 0,
            mt: "2.5rem",
          }}
        >
          {t("auth.user_login_here")}
        </Typography.Description>
      </Box>
      <Typography.Caption
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          lineHeight: "1.5rem",
          textAlign: "center",
          bgcolor: "primary.dark",
          mt: "0.5rem",
          width: "100%",
          color: "background.default",
          display: { xs: "none", md: "block" },
          zIndex: 1,
        }}
      >
        {FOOTER_CONSTANT}
      </Typography.Caption>
      <LoadingModal open={isLoading} />
    </Box>
  )
}
