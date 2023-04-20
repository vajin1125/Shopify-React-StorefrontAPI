import React, { useState } from "react"
import {
  CheckboxItem,
  DatePicker,
  ExpandMoreIcon,
  InputAdornment,
  MenuItem,
  TextField,
} from "src/UILibrary"
import { useTranslation } from "react-i18next"

import { PageContainer } from "src/components/adminPageContainer"
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
} from "src/UILibrary"
import { AdvancedTable, FieldDefinition } from "src/components/adminTable"
import { AddornmentLabelField } from "src/components/shared/addornmentLabelField"
import { Order } from "src/types/order"
import { CheckWithLabel } from "./components/checkWithLabel"
import { StateLabel } from "./components/stateLabel"
import { SearchIcon } from "src/assets/icons/SearchIcon"
import { CollectiveDeliveryModal } from "./components/collectiveDeliveryModal"
import { OrderingGoodsModal } from "./components/orderingGoodsModal"
import { CancelOrderModal } from "./components/cancelOrderModal"
import { CancelDeliveryModal } from "./components/cancelDeliveryModal"
import { OrderDetailModal } from "./components/orderDetailModal"

const userData: Order[] = [
  {
    id: "01",
    product_name: "AAA",
    student_number: "111",
    order_date: "10/1",
    deposit_date: "10/1",
    ordering_date: "10/1",
    delivery_date: "10/7",
    handover_date: "10/7",
    state: "handed_over",
  },
  {
    id: "02",
    product_name: "BBB",
    student_number: "13223211",
    order_date: "10/1",
    deposit_date: "10/1",
    ordering_date: "10/1",
    delivery_date: "10/7",
    handover_date: "10/7",
    state: "deposited",
  },
  {
    id: "03",
    product_name: "CCC",
    student_number: "12342342311",
    order_date: "10/1",
    deposit_date: "10/1",
    ordering_date: "10/1",
    delivery_date: "10/7",
    handover_date: "10/7",
    state: "new_reception",
  },
]

const outlinedButtonStyle = {
  p: "0.375rem 1.25rem",
  borderRadius: 0,
  height: "2rem",
  border: "2px solid",
  borderColor: "primary.main",
  bgcolor: "background.default",
  "&:hover": {
    bgcolor: "primary.main",
    color: "background.default",
  },
}

const fields: FieldDefinition<Order>[] = [
  {
    attribute: "id",
    label: "admin.orderlist.ID",
    width: 120,
  },
  {
    attribute: "product_name",
    label: "admin.orderlist.product_name",
  },
  {
    attribute: "student_number",
    label: "admin.orderlist.student_number",
    width: 100,
  },
  {
    attribute: "order_date",
    label: "admin.orderlist.order_date",
    width: 120,
    widget: ({ value }) => <CheckWithLabel label={value} checked />,
  },
  {
    attribute: "deposit_date",
    label: "admin.orderlist.deposit_date",
    widget: ({ value }) => <CheckWithLabel label={value} checked />,
  },
  {
    attribute: "ordering_date",
    label: "admin.orderlist.ordering_date",
    widget: ({ value }) => <CheckWithLabel label={value} checked={Math.random() > 0.5} />,
  },
  {
    attribute: "delivery_date",
    label: "admin.orderlist.delivery_date",
    widget: ({ value }) => <CheckWithLabel label={value} checked={Math.random() > 0.5} />,
  },
  {
    attribute: "handover_date",
    label: "admin.orderlist.handover_date",
    widget: ({ value }) => <CheckWithLabel label={value} checked />,
  },
  {
    attribute: "state",
    label: "admin.orderlist.state",
    widget: ({ value: state }) => <StateLabel state={state} />,
  },
]

export const OrderList = () => {
  const { t } = useTranslation()
  const [selectedOrderId, setSelectedOrderId] = useState<string>()
  const [collectiveDeliveryModalOpen, setCollectiveDeliveryModalOpen] = useState<boolean>(false)
  const [orderingGoodsModalOpen, setOrderingGoodsModalOpen] = useState<boolean>(false)
  const [cancelOrderModalOpen, setCancelOrderModalOpen] = useState<boolean>(false)
  const [cancelDeliveryModalOpen, setCancelDeliveryModalOpen] = useState<boolean>(false)
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false)

  return (
    <PageContainer
      title={t("admin.orderlist.order_management")}
      toolbar={
        <Box sx={{ display: "flex", justifyContent: "flex-end", pr: "7.5rem", columnGap: "10px" }}>
          <Button
            variant="contained"
            disableElevation
            sx={outlinedButtonStyle}
            onClick={() => setOrderingGoodsModalOpen(true)}
          >
            <Typography.Description sx={{ fontWeight: 600, lineHeight: "1.25rem" }}>
              {t("admin.orderlist.order_check")}
            </Typography.Description>
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={outlinedButtonStyle}
            onClick={() => setCancelOrderModalOpen(true)}
          >
            <Typography.Description sx={{ fontWeight: 600, lineHeight: "1.25rem" }}>
              {t("admin.orderlist.order_cancellation")}
            </Typography.Description>
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={outlinedButtonStyle}
            onClick={() => setCollectiveDeliveryModalOpen(true)}
          >
            <Typography.Description sx={{ fontWeight: 600, lineHeight: "1.25rem" }}>
              {t("admin.orderlist.delivery_check")}
            </Typography.Description>
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={outlinedButtonStyle}
            onClick={() => setCancelDeliveryModalOpen(true)}
          >
            <Typography.Description sx={{ fontWeight: 600, lineHeight: "1.25rem" }}>
              {t("admin.orderlist.delivery_cancellation")}
            </Typography.Description>
          </Button>
          <Button
            variant="contained"
            sx={{
              p: "0.375rem 1.25rem",
              borderRadius: 0,
              height: "2rem",
              bgcolor: "text.secondary",
              color: "background.default",
            }}
          >
            <Typography.Description sx={{ fontWeight: 600, lineHeight: "1.25rem" }}>
              {t("admin.orderlist.output")}
            </Typography.Description>
          </Button>
          <Button
            variant="contained"
            sx={{
              p: "0.375rem 1.25rem",
              borderRadius: 0,
              height: "2rem",
              bgcolor: "text.secondary",
              color: "background.default",
            }}
          >
            <Typography.Description sx={{ fontWeight: 600, lineHeight: "1.25rem" }}>
              {t("admin.orderlist.creating_order_email")}
            </Typography.Description>
          </Button>
        </Box>
      }
    >
      <Box pr={15}>
        <Box sx={{ position: "relative" }}>
          <Accordion
            disableGutters
            sx={{
              boxShadow: "none",
              mb: "1.5rem",
              ml: 3,
              bgcolor: "transparent",
              "&.Mui-expanded": { ml: 3 },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "background.default" }} />}
              sx={{
                minHeight: "1.25rem",
                bgcolor: "primary.main",
                p: "0.375rem 1.25rem",
                maxWidth: "218px",
                "& .MuiAccordionSummary-content": {
                  m: 0,
                },
                "&.Mui-expanded": {
                  pb: 2,
                },
              }}
            >
              <Button sx={{ color: "background.default", p: 0, mr: "0.5rem" }}>
                <Typography.Description
                  sx={{ fontWeight: 600, lineHeight: "1.25rem", letterSpacing: "2px" }}
                >
                  {t("admin.productlist.set_filter_conditions")}
                </Typography.Description>
              </Button>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: "1rem" }}>
              <Grid
                container
                sx={{
                  bgcolor: "background.default",
                  p: "1rem 1.75rem 1rem 0.75rem",
                  boxShadow: "1px 1px 8px rgba(169, 169, 169, 0.25)",
                }}
                spacing={2}
              >
                <Grid item md={5}>
                  <AddornmentLabelField label="admin.orderlist.commodity_name" />
                </Grid>
                <Grid item md={3}>
                  <AddornmentLabelField
                    label="admin.orderlist.on_sale"
                    type="select"
                    value="on_sale"
                  >
                    <MenuItem value="on_sale">{t("admin.orderlist.on_sale")}</MenuItem>
                  </AddornmentLabelField>
                </Grid>
                <Grid item md={4}>
                  <AddornmentLabelField label="admin.orderlist.category" type="select" value="null">
                    <MenuItem value="null">{t("admin.orderlist.unspecified")}</MenuItem>
                  </AddornmentLabelField>
                </Grid>
                <Grid item md={5}>
                  <AddornmentLabelField label="admin.orderlist.deposit_date" type="datepicker">
                    <DatePicker />
                  </AddornmentLabelField>
                </Grid>
                <Grid item md={5}>
                  <AddornmentLabelField label="admin.orderlist.delivery_date" type="datepicker">
                    <DatePicker />
                  </AddornmentLabelField>
                </Grid>
                <Grid item md={2}>
                  <AddornmentLabelField label="admin.orderlist.state" type="select" value="null">
                    <MenuItem value="null">{t("admin.orderlist.unspecified")}</MenuItem>
                    <MenuItem value="handed_over">{t("admin.orderlist.handed_over")}</MenuItem>
                    <MenuItem value="deposited">{t("admin.orderlist.deposited")}</MenuItem>
                    <MenuItem value="new_reception">{t("admin.orderlist.new_reception")}</MenuItem>
                  </AddornmentLabelField>
                </Grid>
                <Grid item md={12}>
                  <Typography.Action sx={{ my: "1rem" }}>
                    {t("admin.orderlist.personal")}
                  </Typography.Action>
                </Grid>
                <Grid item md={4}>
                  <AddornmentLabelField label="admin.orderlist.name_kanji" />
                </Grid>
                <Grid item md={4}>
                  <AddornmentLabelField label="admin.orderlist.name_furigana" />
                </Grid>
                <Grid item md={4}>
                  <AddornmentLabelField label="admin.orderlist.student_number" />
                </Grid>
                <Grid item md={12}>
                  <Typography.Action sx={{ my: "1rem" }}>
                    {t("admin.orderlist.group")}
                  </Typography.Action>
                </Grid>
                <Grid item md={3}>
                  <AddornmentLabelField
                    label="admin.orderlist.school_building"
                    type="select"
                    value="null"
                  >
                    <MenuItem value="null">{t("admin.orderlist.unspecified")}</MenuItem>
                  </AddornmentLabelField>
                </Grid>
                <Grid item md={3}>
                  <AddornmentLabelField label="admin.orderlist.subject" type="select" value="null">
                    <MenuItem value="null">{t("admin.orderlist.unspecified")}</MenuItem>
                  </AddornmentLabelField>
                </Grid>
                <Grid item md={3}>
                  <AddornmentLabelField
                    label="admin.orderlist.school_year"
                    type="select"
                    value="null"
                  >
                    <MenuItem value="null">{t("admin.orderlist.unspecified")}</MenuItem>
                  </AddornmentLabelField>
                </Grid>
                <Grid item md={3}>
                  <AddornmentLabelField label="admin.orderlist.class" type="select" value="null">
                    <MenuItem value="null">{t("admin.orderlist.unspecified")}</MenuItem>
                  </AddornmentLabelField>
                </Grid>
                <Grid
                  item
                  md={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    my: 1,
                    position: "relative",
                  }}
                >
                  <Typography.Action
                    sx={{
                      lineHeight: "1.25rem",
                      letterSpacing: "2px",
                      color: "primary.main",
                      position: "absolute",
                      bottom: -5,
                      left: 16,
                    }}
                  >
                    {t("admin.productlist.search_condition_reset")}
                  </Typography.Action>
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
                  >
                    {t("admin.productlist.search")}
                  </Button>
                  <Box />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Box sx={{ position: "absolute", left: "254px", top: 0, display: "flex" }}>
            <Box sx={{ display: "flex", flexShrink: 0 }}>
              <CheckboxItem label="admin.orderlist.test" labelSx={{ fontSize: "0.875rem" }} />
              <CheckboxItem label="admin.orderlist.textbook" labelSx={{ fontSize: "0.875rem" }} />
              <CheckboxItem
                label="admin.orderlist.sale_period"
                labelSx={{ fontSize: "0.875rem" }}
              />
              <CheckboxItem label="admin.orderlist.deposited" labelSx={{ fontSize: "0.875rem" }} />
            </Box>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ borderWidth: "2px" }}>
                    <SearchIcon width="17" height="17" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& input": {
                  p: "0.375rem 1rem",
                  height: "1rem",
                  borderRadius: 0,
                  border: "2px solid",
                  borderRight: 0,
                  borderColor: "info.dark",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: 0,
                    borderWidth: "2px",
                    borderColor: "info.dark",
                  },
                },
              }}
            />
          </Box>
        </Box>
        <AdvancedTable<Order>
          content={userData}
          fields={fields}
          pagination={{ count: 10, currentPage: 3 }}
          onRowClick={(row: Order) => {
            setSelectedOrderId(row.id)
            setDetailModalOpen(true)
          }}
        />
        <CollectiveDeliveryModal
          open={collectiveDeliveryModalOpen}
          handleOpen={setCollectiveDeliveryModalOpen}
        />
        <OrderingGoodsModal open={orderingGoodsModalOpen} handleOpen={setOrderingGoodsModalOpen} />
        <CancelOrderModal open={cancelOrderModalOpen} handleOpen={setCancelOrderModalOpen} />
        <CancelDeliveryModal
          open={cancelDeliveryModalOpen}
          handleOpen={setCancelDeliveryModalOpen}
        />
        {selectedOrderId && (
          <OrderDetailModal
            id={selectedOrderId}
            open={detailModalOpen}
            handleOpen={setDetailModalOpen}
          />
        )}
      </Box>
    </PageContainer>
  )
}
