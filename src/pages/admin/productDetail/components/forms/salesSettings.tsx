import React, { useState, useMemo } from "react"
import { Controller, Control, FieldErrorsImpl, useController } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { Box, Chip, DatePicker, TextField, Typography, MenuItem } from "src/UILibrary"
import { AccordionWrapper } from "../accordionWrapper"
import { ForSaleModal } from "../modal/forSaleModel"
import { PeriodModal } from "../modal/periodModal"
import { SectionField } from "../sectionField"

import { IAdminProductItem } from "src/types/product"
import { IS_ON_SALE_OPTIONS } from "src/constants/adminProductList"
import { useProductSalesDates } from "src/hooks/useProductSalesDates"
import { useSalesCommonDate } from "src/hooks/useSalesCommonDate"
import { DEPARTMENT_LIST } from "src/constants/adminProductList"

interface SalesSettingsProps {
  control: Control<IAdminProductItem, any>
  errors: Partial<FieldErrorsImpl<IAdminProductItem>>
}

export const SalesSettings: React.FC<SalesSettingsProps> = ({ control, errors }) => {
  const { t } = useTranslation()
  const [forSaleModalOpen, setForSaleModalOpen] = useState<boolean>(false)
  const [periodModalOpen, setPeriodModalOpen] = useState<boolean>(false)
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

  const { date: startDate, isDifferent: isStartDateDifferent } = useSalesCommonDate([
    osakaSalesStartDate,
    kumamotoSalesStartDate,
    kobeSalesStartDate,
    osakaBeautyAndBridalSalesStartDate,
  ])

  const { date: endDate, isDifferent: isEndDateDifferent } = useSalesCommonDate([
    osakaSalesEndDate,
    kumamotoSalesEndDate,
    kobeSalesEndDate,
    osakaBeautyAndBridalSalesEndDate,
  ])

  const handleStartDate = (newDate: string) => {
    onOsakaSalesStartDateChange(newDate)
    onKumamotoSalesStartDateChange(newDate)
    onKobeSalesStartDateChange(newDate)
    onOsakaBeautyAndBridalSalesStartDateChange(newDate)
  }

  const handleEndDate = (newDate: string) => {
    onOsakaSalesEndDateChange(newDate)
    onKumamotoSalesEndDateChange(newDate)
    onKobeSalesEndDateChange(newDate)
    onOsakaBeautyAndBridalSalesEndDateChange(newDate)
  }

  const {
    field: { value: salesTarget, onChange: onSalesTargetChange },
  } = useController({ name: "salesTarget", control })

  const basicSalesTarget = useMemo(
    () =>
      DEPARTMENT_LIST.map((department) => ({
        ...department,
        currentCount: salesTarget.filter((target) => target.department === department.key).length,
      })).filter((department) => !!department.totalCount && !!department.currentCount),
    [salesTarget]
  )

  return (
    <AccordionWrapper label={t("admin.productdetail.sales_settings")}>
      <Box
        sx={{
          px: "1.25rem",
          maxWidth: "726px",
          mt: "1.5rem",
        }}
      >
        <Controller
          name="isOnSale"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SectionField label="admin.productdetail.sales_status">
              <TextField
                select
                sx={{
                  flexGrow: 1,
                  "& .MuiSelect-select": { py: "0.5rem" },
                  maxWidth: "250px",
                }}
                value={value.toString()}
                onChange={onChange}
                error={!!errors.isOnSale}
              >
                {IS_ON_SALE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </MenuItem>
                ))}
              </TextField>
            </SectionField>
          )}
        />
        <SectionField label="admin.productdetail.for_sale">
          <Box
            sx={{
              bgcolor: "background.default",
              boxSizing: "border-box",
              maxWidth: "530px",
              width: "530px",
              p: "0.25rem 1rem",
              border: "2px solid",
              borderColor: "info.dark",
              borderRadius: "5px",
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              minHeight: 40,
            }}
          >
            {basicSalesTarget.map((target) => (
              <Chip
                key={target.key}
                label={`${t(`admin.productlist.${target.key}`)}${
                  target.totalCount === target.currentCount ? "" : "*"
                }`}
                onDelete={() => {
                  onSalesTargetChange(salesTarget.filter((item) => item.department !== target.key))
                }}
              />
            ))}
          </Box>
          <Typography.Description
            sx={{
              fontWeight: 400,
              lineHeight: "1.5rem",
              color: "#999",
              ml: "1rem",
              borderBottom: "1px solid",
              borderColor: "#999",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => setForSaleModalOpen(true)}
          >
            {t("admin.productdetail.advanced_setting")}
          </Typography.Description>
        </SectionField>
        <SectionField label="admin.productdetail.sales_period">
          <DatePicker
            startDate={startDate}
            isStartDateDifferent={isStartDateDifferent}
            endDate={endDate}
            isEndDateDifferent={isEndDateDifferent}
            onStartDateChange={handleStartDate}
            onEndDateChange={handleEndDate}
          />
          <Typography.Description
            sx={{
              fontWeight: 400,
              lineHeight: "1.5rem",
              color: "#999",
              ml: "1rem",
              borderBottom: "1px solid",
              borderColor: "#999",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => setPeriodModalOpen(true)}
          >
            {t("admin.productdetail.advanced_setting")}
          </Typography.Description>
        </SectionField>
        <ForSaleModal open={forSaleModalOpen} control={control} handleOpen={setForSaleModalOpen} />
        <PeriodModal open={periodModalOpen} control={control} handleOpen={setPeriodModalOpen} />
      </Box>
    </AccordionWrapper>
  )
}
