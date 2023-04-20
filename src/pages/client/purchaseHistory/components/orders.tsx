import React, { useState } from "react"
import { Box, Button } from "@mui/material"
import { useTranslation } from "react-i18next"

import { Typography } from "src/UILibrary/typography"
import { OrderItem } from "./orderItem"
import { ConvenientStorePaymentDetailDialog } from "./convenientStorePaymentDetailDialog"

export const Orders: React.FC = () => {
  const { t } = useTranslation()
  const [paymentMethodDialogOpen, setPaymentMethodDialogOpen] = useState<boolean>(false)

  return (
    <Box
      sx={{
        borderColor: "divider",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 1.25,
        overflow: "hidden",
        mb: 1.5,
      }}
    >
      <Box sx={{ bgcolor: "background.paper", px: { xs: 1, md: 2.5 }, py: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: { xs: "flex-start", lg: "baseline" },
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            <Typography.Heading sx={{ color: "secondary.contrastText", mb: { xs: 0.5, lg: 0 } }}>
              {t("purchase_history.ordering")}
            </Typography.Heading>
            <Typography.DetailHeading
              sx={{
                color: "secondary.contrastText",
                mb: { xs: 0.5, lg: 0 },
                ml: { xs: 0, lg: 1.25 },
              }}
            >
              {"※注文が完了していません"}
            </Typography.DetailHeading>
            <Typography.Action
              sx={{
                color: "text.secondary",
                lineHeight: "1.25rem",
                display: { xs: "block", lg: "none" },
              }}
            >
              {"注文番号：AA123091j23"}
            </Typography.Action>
            <Typography.Action
              sx={{
                color: "text.secondary",
                lineHeight: "1.25rem",
                display: { xs: "block", lg: "none" },
              }}
            >
              {"注文日：2022/10/21"}
            </Typography.Action>
          </Box>
          <Box
            sx={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 0.5 }}>
              <Typography.Action
                sx={{
                  color: "text.secondary",
                  lineHeight: "1.25rem",
                  display: { xs: "none", lg: "block" },
                }}
              >
                {"注文番号：AA123091j23"}
              </Typography.Action>
              <Typography.Action
                sx={{
                  color: "text.secondary",
                  lineHeight: "1.25rem",
                  display: { xs: "none", lg: "block" },
                }}
              >
                {"注文日：2022/10/21"}
              </Typography.Action>
              <Typography.Action sx={{ color: "text.secondary", lineHeight: "1.25rem" }}>
                {"お渡し日：2022/11/13"}
              </Typography.Action>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography.Action sx={{ color: "text.primary" }}>{"合計金額"}</Typography.Action>
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                <Typography.Heading sx={{ color: "text.primary" }}>{"￥3,500"}</Typography.Heading>
                <Typography.Action sx={{ color: "text.primary", fontWeight: 600 }}>
                  {"（税込）"}
                </Typography.Action>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "background.default",
          px: { xs: 1, md: 2.5 },
          py: 3,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          borderWidth: "0 0 2px 0",
          borderStyle: "solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2.25, md: 3 },
            mb: { xs: 3, lg: 0 },
          }}
        >
          <OrderItem />
          <OrderItem />
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "250px",
            },
            px: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              color: "background.default",
              fontSize: "0.875rem",
              borderRadius: 5,
              fontWeight: 700,
              maxWidth: 350,
              mb: 1,
            }}
            onClick={() => setPaymentMethodDialogOpen(true)}
          >
            {t("purchase_history.payment_detail_of_konbini")}
          </Button>
          <Typography.Action sx={{ color: "text.primary", lineHeight: "1.125rem" }}>
            {t("purchase_history.payment_detail_of_konbini_detail")}
          </Typography.Action>
        </Box>
      </Box>
      <Box
        sx={{
          px: { xs: 1.25, md: 3 },
          py: { xs: 1.25, md: 2 },
          bgcolor: "background.default",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
        }}
      >
        <Box sx={{ flexGrow: 1, mb: { xs: 1, md: 0 }, color: "text.primary" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography.Action
              sx={{ lineHeight: "1.25rem", width: 80, textAlign: "right", flexShrink: 0 }}
            >{`${t("purchase_history.payment_method")}：`}</Typography.Action>
            <Typography.Action sx={{ lineHeight: "1.25rem", flexGrow: 1 }}>
              {"コンビニ払い"}
            </Typography.Action>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography.Action
              sx={{ lineHeight: "1.25rem", width: 80, textAlign: "right", flexShrink: 0 }}
            >{`${t("purchase_history.address")}：`}</Typography.Action>
            <Typography.Action sx={{ lineHeight: "1.25rem", flexGrow: 1 }}>
              {"〒113-0022 東京都文京区千駄木3-45-10"}
            </Typography.Action>
          </Box>
        </Box>
        <Button
          variant="outlined"
          sx={{
            flexShrink: 0,
            color: "divider",
            borderColor: "divider",
            fontSize: "0.875rem",
            borderRadius: 5,
            fontWeight: 700,
            maxWidth: 350,
            px: 4,
          }}
        >
          {t("purchase_history.download_invoice")}
        </Button>
      </Box>
      <ConvenientStorePaymentDetailDialog
        open={paymentMethodDialogOpen}
        setOpen={setPaymentMethodDialogOpen}
      />
    </Box>
  )
}
