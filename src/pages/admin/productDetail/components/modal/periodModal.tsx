import React from "react"
import { useTranslation } from "react-i18next"
import { Control } from "react-hook-form"

import { Modal } from "src/components/modal"
import { DatePicker, Button, Box, Grid } from "src/UILibrary"
import { Group } from "../group"

import { IAdminProductItem } from "src/types/product"
import { useProductSalesDates } from "src/hooks/useProductSalesDates"

interface PeriodModalProps {
  open: boolean
  control: Control<IAdminProductItem, any>
  // eslint-disable-next-line no-unused-vars
  handleOpen: (open: boolean) => void
}

export const PeriodModal: React.FC<PeriodModalProps> = ({ open, control, handleOpen }) => {
  const { t } = useTranslation()

  const {
    osakaSalesStartDate,
    osakaSalesEndDate,
    kumamotoSalesStartDate,
    kumamotoSalesEndDate,
    kobeSalesStartDate,
    kobeSalesEndDate,
    osakaBeautyAndBridalSalesStartDate,
    osakaBeautyAndBridalSalesEndDate,
    onOsakaSalesStartDateChange,
    onOsakaSalesEndDateChange,
    onKumamotoSalesStartDateChange,
    onKumamotoSalesEndDateChange,
    onKobeSalesStartDateChange,
    onKobeSalesEndDateChange,
    onOsakaBeautyAndBridalSalesStartDateChange,
    onOsakaBeautyAndBridalSalesEndDateChange,
  } = useProductSalesDates(control)

  const handleClose = () => {
    handleOpen(false)
  }

  return (
    <Modal
      handleClose={handleClose}
      open={open}
      title="admin.productdetail.detailed_settings_for_what_to_sell"
    >
      <Grid container sx={{ mt: 3 }}>
        <Grid item md={12}>
          <Group label="admin.productdetail.osaka_belebel_beauty_college">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: "1rem",
                bgcolor: "secondary.dark",
              }}
            >
              <DatePicker
                startDate={osakaSalesStartDate}
                endDate={osakaSalesEndDate}
                onStartDateChange={onOsakaSalesStartDateChange}
                onEndDateChange={onOsakaSalesEndDateChange}
              />
            </Box>
          </Group>
        </Grid>
        <Grid item md={12}>
          <Group label="admin.productdetail.kove_belebel_beauty_college">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: "1rem",
                bgcolor: "secondary.dark",
              }}
            >
              <DatePicker
                startDate={kumamotoSalesStartDate}
                endDate={kumamotoSalesEndDate}
                onStartDateChange={onKumamotoSalesStartDateChange}
                onEndDateChange={onKumamotoSalesEndDateChange}
              />
            </Box>
          </Group>
        </Grid>
        <Grid item md={12}>
          <Group label="admin.productdetail.osaka_belebel_beauty_college">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: "1rem",
                bgcolor: "secondary.dark",
              }}
            >
              <DatePicker
                startDate={kobeSalesStartDate}
                endDate={kobeSalesEndDate}
                onStartDateChange={onKobeSalesStartDateChange}
                onEndDateChange={onKobeSalesEndDateChange}
              />
            </Box>
          </Group>
        </Grid>
        <Grid item md={12}>
          <Group label="admin.productdetail.osaka_belebel_beauty_college">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: "1rem",
                bgcolor: "secondary.dark",
              }}
            >
              <DatePicker
                startDate={osakaBeautyAndBridalSalesStartDate}
                endDate={osakaBeautyAndBridalSalesEndDate}
                onStartDateChange={onOsakaBeautyAndBridalSalesStartDateChange}
                onEndDateChange={onOsakaBeautyAndBridalSalesEndDateChange}
              />
            </Box>
          </Group>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          mt: 3,
          mb: 2.5,
        }}
      >
        <Button
          sx={{
            color: "text.secondary",
            width: "150px",
            height: "44px",
            "&:hover": {
              color: "text.primary",
            },
          }}
          onClick={handleClose}
        >
          {t("admin.productdetail.cancel")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "150px",
            height: "44px",
            color: "background.default",
            borderRadius: 0,
          }}
          onClick={handleClose}
        >
          {t("admin.productdetail.setting")}
        </Button>
      </Box>
    </Modal>
  )
}
