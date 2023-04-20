import React from "react"
import { useTranslation } from "react-i18next"

import { OrderProductItem } from "./orderProductItem"
import { OrderStatusCircle } from "./orderStatusCircle"
import { OrderLogItem } from "./orderLogItem"

import { Box, Typography, CircularProgress, Divider } from "src/UILibrary"
import { Modal } from "src/components/modal"
import { useGetOrderDetail } from "src/queries/order"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { numberToUSDCurrency } from "src/modules/currency"
import { formatDateOfOrder } from "src/modules/order"
import { OrderDetail } from "src/types/order"
import { ORDER_PAYMENT_INFORMATION } from "src/constants/orderPaymentInformation"
import { RightArrowIcon } from "src/assets/icons/RightArrowIcon"

export const OrderDetailModal = ({
  id,
  open,
  handleOpen,
}: {
  id: string
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleOpen: (open: boolean) => void
}) => {
  const { t } = useTranslation()
  const session = useAdminSession()
  const handleClose = () => {
    handleOpen(false)
  }

  const {
    data: orderDetail,
    isLoading,
    error,
  } = useGetOrderDetail(id, session?.value.readAdminAccessToken || "")

  const detail: OrderDetail | undefined = orderDetail?.data
  const totalPrice = detail?.products
    .map(({ singlePrice, quantity }) => singlePrice * quantity)
    .reduce((sum, value) => sum + value, 0)

  const errorBody = () => {
    if (error) {
      if (error.response?.status === 403) {
        return (
          <Typography.DetailHeading sx={{ textAlign: "center", color: "error.main", mb: 2 }}>
            {t("admin.orderdetail.order_detail_forbidden_error")}
          </Typography.DetailHeading>
        )
      } else if (error.response?.status === 500) {
        return (
          <Typography.DetailHeading sx={{ textAlign: "center", color: "error.main", mb: 2 }}>
            {t("admin.orderdetail.order_detail_error")}
          </Typography.DetailHeading>
        )
      }
    }
  }

  return (
    <Modal handleClose={handleClose} open={open} title="admin.orderlist.ordering_goods">
      {error ? (
        errorBody()
      ) : isLoading ? (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            my: { xs: 6, md: 20 },
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Typography.Action
            sx={{
              color: "primary.main",
              fontSize: "11px",
              lineHeight: "0.875rem",
              textAlign: "end",
              my: "0.625rem",
              textDecoration: "underline",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {t("admin.orderdetail.to_cancel_order")}
          </Typography.Action>
          <Box sx={{ p: "1.875rem 1.25rem", bgcolor: "secondary.dark" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Typography.SubTitle sx={{ color: "text.secondary" }}>
                {t("admin.orderdetail.order_product")}
              </Typography.SubTitle>
              <Box sx={{ display: "flex" }}>
                <Typography.Action sx={{ color: "text.secondary", lineHeight: "1.25rem" }}>
                  {`${t("admin.orderlist.order_date")}: ${formatDateOfOrder(
                    detail?.orderedDate,
                    "date"
                  )}`}
                </Typography.Action>
                <Typography.Action
                  sx={{ color: "text.secondary", lineHeight: "1.25rem", ml: "1rem" }}
                >
                  {t("admin.orderdetail.order_number")}: {detail?.name}
                </Typography.Action>
              </Box>
            </Box>
            <Box sx={{ mt: "0.5rem", borderBottom: "2px solid", borderBottomColor: "divider" }}>
              {detail?.products && detail.products.length > 0 && (
                <>
                  {detail?.products.map((product) => (
                    <OrderProductItem key={product.id} {...product} />
                  ))}
                </>
              )}
            </Box>
            <Box sx={{ mt: "1rem", display: "flex", justifyContent: "flex-end" }}>
              <Typography.Description>{t("admin.orderdetail.total_fee")}</Typography.Description>
              <Typography.Title sx={{ lineHeight: "14px", ml: "1rem" }}>
                ￥{numberToUSDCurrency(totalPrice || 0)}
                <Typography.Caption
                  sx={{ display: "inline-block", fontWeight: 600, lineHeight: "14px" }}
                >
                  ({t("productDetail.tax_included")})
                </Typography.Caption>
              </Typography.Title>
            </Box>
            <Box sx={{ mt: "2rem" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography.SubTitle sx={{ color: "text.secondary" }}>
                  {t("admin.orderdetail.order_status")}
                </Typography.SubTitle>
                <Typography.Action sx={{ fontWeight: 600, ml: "1rem", color: "success.main" }}>
                  {t("admin.orderdetail.ordering")}
                </Typography.Action>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-between",
                  my: "1.5rem",
                }}
              >
                <OrderStatusCircle
                  status={t("admin.orderdetail.order")}
                  date={formatDateOfOrder(detail?.orderedDate, "date")}
                  time={formatDateOfOrder(detail?.orderedDate, "time")}
                />
                <RightArrowIcon width="24" height="22" sx={{ mt: "1.25rem" }} />
                <OrderStatusCircle
                  status={t("admin.orderdetail.payment")}
                  date={formatDateOfOrder(detail?.paymentDate, "date")}
                  time={formatDateOfOrder(detail?.paymentDate, "time")}
                />
                <RightArrowIcon width="24" height="22" sx={{ mt: "1.25rem" }} />
                <OrderStatusCircle
                  status={t("admin.orderlist.order")}
                  date={formatDateOfOrder(detail?.makerOrderedDate, "date")}
                  time={formatDateOfOrder(detail?.makerOrderedDate, "time")}
                />
                <RightArrowIcon width="24" height="22" sx={{ mt: "1.25rem" }} />
                <OrderStatusCircle
                  status={t("admin.orderdetail.submit")}
                  date={formatDateOfOrder(detail?.submitDate, "date")}
                  time={formatDateOfOrder(detail?.submitDate, "time")}
                />
                <RightArrowIcon width="24" height="22" sx={{ mt: "1.25rem" }} />
                <OrderStatusCircle
                  status={t("admin.orderdetail.handed_over")}
                  date={formatDateOfOrder(detail?.handedOverDate, "date")}
                  time={formatDateOfOrder(detail?.handedOverDate, "time")}
                />
              </Box>
            </Box>
            <Divider sx={{ height: "1px", bgcolor: "divider", my: "0.5rem" }} />
            <Typography.SubTitle sx={{ color: "text.secondary" }}>
              {t("admin.orderdetail.payment_information")}
            </Typography.SubTitle>
            <Typography.Description sx={{ lineHeight: "1.125rem", mt: "0.25rem" }}>
              {detail?.paymentMethod && t(ORDER_PAYMENT_INFORMATION[detail?.paymentMethod])}
            </Typography.Description>
            {/* <Divider sx={{ height: "1px", bgcolor: "divider", my: "0.5rem" }} /> */}
            {/* <Typography.SubTitle sx={{ color: "text.secondary" }}>
              {t("admin.orderdetail.delivery_address")}
            </Typography.SubTitle>
            <Typography.Description sx={{ lineHeight: "1.125rem", mt: "0.25rem" }}>
              〒000-0000 東京都千代田区1-1
            </Typography.Description> */}
            <Divider sx={{ height: "1px", bgcolor: "divider", my: "0.5rem" }} />
            <Typography.SubTitle sx={{ color: "text.secondary", mb: "0.25rem" }}>
              {t("admin.orderdetail.history")}
            </Typography.SubTitle>
            {detail?.logs &&
              detail.logs.map((log) => (
                <OrderLogItem
                  key={log.id}
                  date={formatDateOfOrder(log.date)}
                  description={log.type}
                />
              ))}
          </Box>
        </>
      )}
    </Modal>
  )
}
