import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Box, Button, Typography } from "src/UILibrary"
import { PageContainer } from "src/components/adminPageContainer"
import { AdvancedTable, FieldDefinition } from "src/components/adminTable"
import { SetDeliveryDateModal } from "./modal/setDeliveryDateModal"
import { OrderDetail } from "src/types/orderDetail"
import { AddornmentLabelField } from "src/components/shared/addornmentLabelField"

const fields: FieldDefinition<OrderDetail>[] = [
  {
    attribute: "id",
    label: "maker.orderlist.orderId",
  },
  {
    attribute: "product_name",
    label: "maker.orderlist.product_name",
  },
  {
    attribute: "quantity",
    label: "maker.orderlist.quantity",
  },
  {
    attribute: "status",
    label: "maker.orderlist.status",
  },
  {
    attribute: "delivery_date",
    label: "maker.orderlist.delivery_date",
  },
]

const content: OrderDetail[] = [
  {
    id: 33,
    product_name: "AAA",
    quantity: "5",
    situation: "納品済み",
    delivery_date: "2022/10/10 - 2022/10/13",
  },
  {
    id: 445,
    product_name: "BBB",
    quantity: "5",
    situation: "納品済み",
    delivery_date: "2022/10/10 - 2022/10/13",
  },
  {
    id: 24,
    product_name: "CCC",
    quantity: "5",
    situation: "納品済み",
    delivery_date: "2022/10/10 - 2022/10/13",
  },
]

export const MakerOrderList = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <PageContainer
      title={t("maker.orderlist.order")}
      toolbar={
        <Box sx={{ display: "flex", justifyContent: "flex-end", pr: "7.5rem" }}>
          <Typography.Action sx={{ fontWeight: 600, color: "text.secondary" }}>
            {t("maker.orderlist.history")}
          </Typography.Action>
        </Box>
      }
    >
      <Box pr={15}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "1rem",
            mb: "1.5rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AddornmentLabelField
              label="maker.orderlist.status"
              type="select"
              sx={{ width: "146px", flexGrow: 0 }}
            >
              <option defaultChecked value="null">
                {t("maker.orderlist.unspecified")}
              </option>
            </AddornmentLabelField>
            <Typography.Description sx={{ fontWeight: 400, ml: 2 }}>
              1-15 / 300件
            </Typography.Description>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              minWidth: "122px",
              color: "background.default",
              borderRadius: 0,
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              py: "0.5rem",
              letterSpacing: "3px",
            }}
            onClick={() => setOpen(true)}
          >
            {t("maker.orderlist.set_delivery_date")}
          </Button>
        </Box>
        <AdvancedTable<OrderDetail>
          content={content}
          fields={fields}
          pagination={{ count: 10, currentPage: 2 }}
          onRowClick={(row: OrderDetail) => navigate(`/maker/order/${row.id}`)}
          editable
        />
        <SetDeliveryDateModal open={open} handleOpen={setOpen} />
      </Box>
    </PageContainer>
  )
}
