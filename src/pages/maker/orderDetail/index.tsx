import React from "react"
import { KeyboardArrowLeft as LeftIcon } from "@mui/icons-material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Box, Grid, Typography, Image } from "src/UILibrary"
import { PageContainer } from "src/components/adminPageContainer"
import DefaultBackground from "src/assets/imgs/productDefaultBG.png"
import { InfoList } from "./components/infoList"

export const MakerOrderDetail = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const orderDetail = {
    id: 33,
    product_name: "AAA",
    quantity: "5",
    status: "配達中",
    delivery_date: "2022/10/10 - 2022/10/13",
  }

  const statusBarColor = (status: string) => {
    switch (status) {
      case "配達中":
        return "#FBBC05"
      case "納品待ち":
        return "#7DC522"
      case "配送中":
        return "#25AEDA"
      default:
        return "#25AEDA"
    }
  }

  return (
    <PageContainer
      title={t("maker.orderlist.order")}
      toolbar={
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", pr: "7.5rem", alignItems: "center" }}
        >
          <Typography.Action
            sx={{
              display: "flex",
              fontWeight: 600,
              color: "primary.main",
              "&:hover": { cursor: "pointer", textDecoration: "underline" },
            }}
            onClick={() => navigate("/maker/order")}
          >
            <LeftIcon color="primary" sx={{ fontSize: "12px", mr: 2 }} />
            {t("maker.orderdetail.back_to_orderlist")}
          </Typography.Action>
        </Box>
      }
    >
      <Box pr={15}>
        <Grid container sx={{ mt: 5 }}>
          <Grid item md={6} sx={{ pr: 5, pl: 2.5 }}>
            <Box
              sx={{
                p: "0.625rem 1.25rem",
                bgcolor: statusBarColor(orderDetail.status),
                mb: 1,
              }}
            >
              <Typography.Title
                sx={{ letterSpacing: "2px", lineHeight: "1.25rem", color: "background.default" }}
              >
                {orderDetail.status}
              </Typography.Title>
            </Box>
            <Typography.Description sx={{ fontWeight: 400, lineHeight: "1.25rem" }}>
              {t("maker.orderdetail.order_date")} : 2022月10月20日 13時40分
            </Typography.Description>
            <Box mt={5}>
              <InfoList label="maker.orderlist.orderId" value={orderDetail.id} />
              <InfoList label="maker.orderlist.product_name" value={orderDetail.product_name} />
              <InfoList label="maker.orderlist.quantity" value={orderDetail.quantity} />
              <InfoList
                label="maker.orderdetail.order_datetime"
                value={orderDetail.delivery_date}
              />
              <InfoList label="maker.orderlist.delivery_date" value={orderDetail.delivery_date} />
              <InfoList label="maker.orderdetail.delivery_date" value={orderDetail.delivery_date} />
            </Box>
          </Grid>
          <Grid item md={6}>
            <Image
              src={DefaultBackground}
              sx={{ height: "387px", "& img": { width: "100%", height: "100%" } }}
            />
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Image src={DefaultBackground} sx={{ flexGrow: 1, "& img": { width: "100%" } }} />
              <Image src={DefaultBackground} sx={{ flexGrow: 1, "& img": { width: "100%" } }} />
              <Image src={DefaultBackground} sx={{ flexGrow: 1, "& img": { width: "100%" } }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}
