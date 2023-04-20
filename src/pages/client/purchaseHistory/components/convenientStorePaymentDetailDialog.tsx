import React, { useState } from "react"
import { Dialog, Box, IconButton, Grid, Button, Checkbox } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Close as CloseIcon, CheckCircle as CheckCircleIcon } from "@mui/icons-material"

import { Typography } from "src/UILibrary/typography"
import { PaymentItem } from "./paymentItem"

interface ConvenientStorePaymentDetailDialogProps {
  open: boolean
  setOpen: Function
}

export const ConvenientStorePaymentDetailDialog: React.FC<
  ConvenientStorePaymentDetailDialogProps
> = ({ open, setOpen }) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<string>("")

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ bgcolor: "background.default", position: "relative" }}>
        <Typography.Title
          sx={{
            p: 1.5,
            textAlign: "center",
            borderWidth: "0 0 1px 0",
            borderColor: "divider",
            borderStyle: "solid",
          }}
        >
          {t("purchase_history.convenient_store_payment_detail")}
        </Typography.Title>
        <Box sx={{ px: { xs: 2, md: 3 }, py: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              py: 1.25,
              borderWidth: "0 0 1px 0",
              borderStyle: "solid",
              borderColor: "primary.main",
              mb: 0.5,
            }}
          >
            <Typography.Action sx={{ color: "primary.main", fontWeight: 600 }}>
              {t("purchase_history.payment_amount")}
            </Typography.Action>
            <Typography.Large sx={{ color: "primary.main" }}>{"￥3,500"}</Typography.Large>
          </Box>
          <Typography.Action
            sx={{ lineHeight: "1.25rem", color: "text.secondary", textAlign: "right", mb: 2 }}
          >{`${t("purchase_history.expiration_date")}：2022/10/15 23:59`}</Typography.Action>

          <Typography.Action
            sx={{ lineHieght: "1.25rem", color: "text.secondary", mb: 1, fontWeight: 600 }}
          >
            {t("purchase_history.select_payment_store")}
          </Typography.Action>
          <Grid container spacing={1} sx={{ mb: 3 }}>
            <PaymentItem
              value="seven-eleven"
              label={t("purchase_history.seven_eleven")}
              selected={selected}
              setSelected={setSelected}
            />
            <PaymentItem
              value="family-mart"
              label={t("purchase_history.family_mart")}
              selected={selected}
              setSelected={setSelected}
            />
            <PaymentItem
              value="lawson"
              label={t("purchase_history.lawson")}
              selected={selected}
              setSelected={setSelected}
            />
            <PaymentItem
              value="others"
              label={t("purchase_history.others")}
              selected={selected}
              setSelected={setSelected}
            />
          </Grid>
          {selected === "others" && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Checkbox icon={<CheckCircleIcon />} checkedIcon={<CheckCircleIcon />} />
                <Box sx={{ width: 24, height: 24, bgcolor: "divider", mr: 1 }} />
                <Typography.Action sx={{ color: "text.secondary" }}>
                  {t("purchase_history.mini_shop")}
                </Typography.Action>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox icon={<CheckCircleIcon />} checkedIcon={<CheckCircleIcon />} />
                <Box sx={{ width: 24, height: 24, bgcolor: "divider", mr: 1 }} />
                <Typography.Action sx={{ color: "text.secondary" }}>
                  {t("purchase_history.daily_yamazaki")}
                </Typography.Action>
              </Box>
            </Box>
          )}

          <Typography.Action
            sx={{ lineHieght: "1.25rem", color: "text.secondary", mb: 1, fontWeight: 600 }}
          >
            {t("purchase_history.select_payment_store")}
          </Typography.Action>
          <Box sx={{ bgcolor: "secondary.dark", p: 2.5, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography.Action
                sx={{ flexGrow: 1, fontWeight: 600, color: "text.secondary", mr: 1 }}
              >
                {t("purchase_history.n_number", { n: 1 })}
              </Typography.Action>
              <Typography.Description
                sx={{ flexShrink: 0, fontWeight: 600, color: "text.secondary", mr: 1 }}
              >
                111111
              </Typography.Description>
              <Button
                variant="outlined"
                sx={{
                  flexShrink: 0,
                  color: "divider",
                  borderColor: "divider",
                  fontSize: "0.625rem",
                  lineHeight: "0.875rem",
                  borderRadius: 5,
                  fontWeight: 700,
                  px: 2,
                  py: 0.5,
                }}
              >
                {t("purchase_history.copy")}
              </Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography.Action
                sx={{ flexGrow: 1, fontWeight: 600, color: "text.secondary", mr: 1 }}
              >
                {t("purchase_history.n_number", { n: 2 })}
              </Typography.Action>
              <Typography.Description
                sx={{ flexShrink: 0, fontWeight: 600, color: "text.secondary", mr: 1 }}
              >
                123456789
              </Typography.Description>
              <Button
                variant="outlined"
                sx={{
                  flexShrink: 0,
                  color: "divider",
                  borderColor: "divider",
                  fontSize: "0.625rem",
                  lineHeight: "0.875rem",
                  borderRadius: 5,
                  fontWeight: 700,
                  px: 2,
                  py: 0.5,
                }}
              >
                {t("purchase_history.copy")}
              </Button>
            </Box>
          </Box>

          <Typography.Action
            sx={{ lineHieght: "1.25rem", color: "text.secondary", mb: 1, fontWeight: 600 }}
          >
            {t("purchase_history.payment_procedure")}
          </Typography.Action>
          <Box sx={{ mb: 4 }}>
            {Array.from({ length: 7 }).map((_, index) => (
              <Box key={index} sx={{ display: "flex", color: "text.secondary", mb: 1 }}>
                <Typography.Action
                  sx={{ flexShrink: 0, width: 20, fontWeight: 400, lineHeight: "1.25rem" }}
                >
                  {`${index + 1}.`}
                </Typography.Action>
                <Typography.Action sx={{ flexGrow: 1, fontWeight: 400, lineHeight: "1.25rem" }}>
                  {t(`purchase_history.procedure_${index + 1}`)}
                </Typography.Action>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                flexShrink: 0,
                color: "text.secondary",
                fontSize: "0.875rem",
                lineHeight: "0.875rem",
                borderRadius: 5,
                fontWeight: 700,
                px: 4,
                py: 1,
              }}
              onClick={() => setOpen(false)}
            >
              {t("purchase_history.close")}
            </Button>
          </Box>
        </Box>
        <IconButton
          size="small"
          sx={{ position: "absolute", top: 10, right: 4 }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Dialog>
  )
}
