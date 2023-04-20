import React, { useState, useEffect } from "react"
import { Box, Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { AxiosError } from "axios"
import { useQueryClient } from "@tanstack/react-query"

import { Typography, Select, MenuItem } from "src/UILibrary"
import { Section } from "./components/section"
import { ConfirmDialog } from "src/components/shared/confirmDialog"

import { useLineToken, useLineLogout } from "src/queries/login"
import { usePushAlerts } from "src/hooks/alerts"
import { useCustomerSession } from "src/modules/customerSessionProvider"
import { MAX_AGE } from "src/constants/line"

export const Notification: React.FC = () => {
  const { t } = useTranslation()
  const session = useCustomerSession()
  const [searchParams] = useSearchParams()
  const lineCode = searchParams.get("code") || ""
  const pushAlerts = usePushAlerts()
  const queryClient = useQueryClient()
  const [isEditingMethod, setIsEditingMethod] = useState<boolean>(false)
  const [showConnectDialogOpen, setShowConnectDialogOpen] = useState<boolean>(false)
  const [showDisconnectDialogOpen, setShowDisconnectDialogOpen] = useState<boolean>(false)
  const [showEditDialogOpen, setShowEditDialogOpen] = useState<boolean>(false)
  const isLINEConnected = session?.value.isLINEConnected || false

  const { mutate: lineToken, isLoading: isConnecting } = useLineToken({
    onSuccess: () => {
      queryClient.invalidateQueries(["getLoggedInInfo", "customer"])
    },
    onError: (err: AxiosError) => {
      console.error(err)
      pushAlerts({ message: t("mypage.cannot_connect_to_line"), color: "error" })
    },
  })

  const { mutate: lineLogout, isLoading: isDisconnecting } = useLineLogout({
    onSuccess: () => {
      queryClient.invalidateQueries(["getLoggedInInfo", "customer"])
    },
    onError: (err: AxiosError) => {
      console.error(err)
      pushAlerts({ message: t("mypage.cannot_disconnect_from_line"), color: "error" })
    },
  })

  const lineLogin = () => {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: process.env.REACT_APP_LINE_CLIENT_ID || "",
      state: process.env.REACT_APP_LINE_STATE || "",
      scope: process.env.REACT_APP_LINE_SCOPE || "",
      nonce: process.env.REACT_APP_LINE_NONCE || "",
      prompt: "consent",
      max_age: MAX_AGE.toString(),
      bot_prompt: "normal",
    })
    const lineAuthorizeURL = `${
      process.env.REACT_APP_LINE_URL || ""
    }?${params.toString()}&redirect_uri=${process.env.REACT_APP_LINE_REDIRECT_URL || ""}`
    window.location.href = lineAuthorizeURL
  }

  const onLineLogout = () => {
    lineLogout({})
  }

  useEffect(() => {
    if (lineCode) {
      lineToken({
        code: lineCode,
        state: process.env.REACT_APP_LINE_NONCE || "",
      })
    }
  }, [lineCode, lineToken])

  return (
    <Box sx={{ flexGrow: 1, mt: { md: 18, xs: 6 }, mb: 12.5, px: 2 }}>
      <Box sx={{ px: { xs: 0, md: 9 } }}>
        <Typography.Heading sx={{ color: "primary.main", mb: 3 }}>
          {t("mypage.notice")}
        </Typography.Heading>
        <Section label={t("mypage.receipt_method")}>
          {isEditingMethod ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-start", md: "center" },
                gap: { xs: 1.25, md: 2 },
              }}
            >
              <Select
                fullWidth
                sx={{
                  width: { xs: "100%", md: 250 },
                  "& .MuiSelect-select": {
                    bgcolor: "background.default",
                    py: 1.5,
                  },
                }}
              >
                <MenuItem value="line">{"LINE"}</MenuItem>
              </Select>
              <Button
                variant="contained"
                sx={{
                  color: "background.default",
                  borderRadius: 8,
                  lineHeight: "0.875rem",
                  py: 1.5,
                  px: 4,
                }}
                onClick={() => setShowEditDialogOpen(true)}
              >
                {t("mypage.keep")}
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography.Description
                sx={{ flexGrow: 1, color: "text.primary", lineHeight: "1.25rem" }}
              >
                {"LINE"}
              </Typography.Description>
              <Button
                variant="outlined"
                sx={{
                  color: "divider",
                  borderWidth: 2,
                  borderColor: "divider",
                  borderRadius: 8,
                  lineHeight: "0.875rem",
                  py: 1.25,
                  px: 4,
                  "&:hover": {
                    borderWidth: 2,
                    color: "primary.main",
                  },
                }}
                onClick={() => setIsEditingMethod(true)}
              >
                {t("mypage.change")}
              </Button>
            </Box>
          )}
        </Section>
        <Section label={t("mypage.line_linkage")}>
          <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, md: 0 } }}>
            <Typography.Description
              sx={{ flexGrow: 1, color: isLINEConnected ? "success.light" : "primary.main" }}
            >
              {isLINEConnected ? t("mypage.linked") : t("mypage.not_linked")}
            </Typography.Description>
            <Button
              variant="outlined"
              sx={{
                borderWidth: 2,
                borderRadius: 8,
                lineHeight: "0.875rem",
                py: 1.25,
                px: 4,
                "&:hover": {
                  borderWidth: 2,
                },
              }}
              onClick={() =>
                isLINEConnected ? setShowDisconnectDialogOpen(true) : setShowConnectDialogOpen(true)
              }
              disabled={isConnecting || isDisconnecting}
            >
              {isLINEConnected ? t("mypage.disconnect") : t("mypage.work_together")}
            </Button>
          </Box>
          <Typography.Description sx={{ color: "text.primary", lineHeight: "1.25rem" }}>
            {t("mypage.link_notification_description")}
          </Typography.Description>
        </Section>
      </Box>
      <ConfirmDialog
        open={showConnectDialogOpen}
        setOpen={setShowConnectDialogOpen}
        label={t("mypage.want_to_link_with_line")}
        confirmLabel={t("mypage.work_together")}
        onConfirm={lineLogin}
      />
      <ConfirmDialog
        open={showDisconnectDialogOpen}
        setOpen={setShowDisconnectDialogOpen}
        label={t("mypage.want_to_link_with_line")}
        confirmLabel={t("mypage.release")}
        onConfirm={onLineLogout}
      />
      <ConfirmDialog
        open={showEditDialogOpen}
        setOpen={setShowEditDialogOpen}
        label={
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 0.5, md: 0 },
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography.SubTitle sx={{ color: "text.primary" }}>
                {t("mypage.how_to_receive_notifications")}
              </Typography.SubTitle>
              <Typography.SubTitle sx={{ color: "primary.main" }}>{"LINE"}</Typography.SubTitle>
              <Typography.SubTitle sx={{ color: "text.primary" }}>
                {t("mypage.of")}
              </Typography.SubTitle>
            </Box>
            <Typography.SubTitle sx={{ color: "text.primary", textAlign: "center" }}>
              {t("mypage.change_method")}
            </Typography.SubTitle>
          </Box>
        }
        confirmLabel={t("mypage.confirm_change")}
        onConfirm={() => {
          setIsEditingMethod(false)
          setShowEditDialogOpen(false)
        }}
      />
    </Box>
  )
}
