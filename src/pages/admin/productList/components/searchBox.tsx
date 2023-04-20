import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Dayjs } from "dayjs"

import {
  Typography,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  LocalizationProvider,
  AdapterDayjs,
  DesktopDatePicker,
  MenuItem,
} from "src/UILibrary"
import { AddornmentLabelField } from "src/components/shared/addornmentLabelField"
import { DateInput } from "./dateInput"

import { IAdminProductListFilters } from "src/types/merchandise"
import { IS_ON_SALE_OPTIONS, DEPARTMENT_LIST } from "src/constants/adminProductList"
import { CATEGORY_LIST } from "src/constants/customerSidebar"

interface SearchBoxProps {
  initialData: IAdminProductListFilters
  // eslint-disable-next-line no-unused-vars
  handleFilterChange: (data: IAdminProductListFilters) => void
}

export const SearchBox: React.FC<SearchBoxProps> = ({ initialData, handleFilterChange }) => {
  const { t } = useTranslation()
  const [productName, setProductName] = useState<string>(initialData.productName)
  const [isOnSale, setIsOnSale] = useState<string>(initialData.isOnSale.toString())
  const [categoryKey, setCategoryKey] = useState<string>(initialData.categoryKey)
  const [salesStartDate, setSalesStartDate] = useState<string>(initialData.salesStartDate)
  const [salesEndDate, setSalesEndDate] = useState<string>(initialData.salesEndDate)
  const [salesDepartments, setSalesDepartments] = useState<string[]>(
    !initialData.salesDepartments ? [] : initialData.salesDepartments.split(",")
  )

  const handleClick = () => {
    handleFilterChange({
      productName,
      isOnSale: isOnSale === "true",
      categoryKey,
      salesStartDate,
      salesEndDate,
      salesDepartments: salesDepartments.sort((prev, curr) => (prev < curr ? -1 : 1)).join(","),
    })
  }

  useEffect(() => {
    setProductName(initialData.productName)
    setIsOnSale(initialData.isOnSale.toString())
    setCategoryKey(initialData.categoryKey)
    setSalesStartDate(initialData.salesStartDate)
    setSalesEndDate(initialData.salesEndDate)
    setSalesDepartments(
      !initialData.salesDepartments ? [] : initialData.salesDepartments.split(",")
    )
  }, [initialData])

  return (
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
        <AddornmentLabelField
          label="admin.productlist.product_name"
          type="input"
          value={productName}
          handleChange={(value: string) => setProductName(value)}
        />
      </Grid>
      <Grid item md={3}>
        <AddornmentLabelField
          label="admin.productlist.stock"
          type="select"
          value={isOnSale}
          handleChange={(value: string) => setIsOnSale(value)}
        >
          {IS_ON_SALE_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {t(option.label)}
            </MenuItem>
          ))}
        </AddornmentLabelField>
      </Grid>
      <Grid item md={4}>
        <AddornmentLabelField
          label="admin.productlist.category"
          type="select"
          value={categoryKey}
          handleChange={(value: string) => setCategoryKey(value)}
        >
          {[{ key: "all", label: "admin.userlist.unspecified" }, ...CATEGORY_LIST].map(
            (category) => (
              <MenuItem key={category.key} value={category.key}>
                {t(category.label)}
              </MenuItem>
            )
          )}
        </AddornmentLabelField>
      </Grid>
      <Grid item md={5}>
        <AddornmentLabelField label="admin.productlist.sales_period" type="datepicker">
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              border: "2px solid",
              borderColor: "info.dark",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="YYYY/MM/DD"
                value={salesStartDate}
                onChange={(value: Dayjs | null) =>
                  setSalesStartDate(value ? value.format("YYYY/MM/DD") : "")
                }
                renderInput={(params) => <DateInput {...params} />}
              />
              <Typography.Description sx={{ fontWeight: 600, mx: 1, flexShrink: 0 }}>
                ~
              </Typography.Description>
              <DesktopDatePicker
                inputFormat="YYYY/MM/DD"
                value={salesEndDate}
                onChange={(value: Dayjs | null) =>
                  setSalesEndDate(value ? value.format("YYYY/MM/DD") : "")
                }
                renderInput={(params) => <DateInput {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </AddornmentLabelField>
      </Grid>
      <Grid item md={7}>
        <AddornmentLabelField label="admin.productlist.for_sale" type="">
          <Box sx={{ flexGrow: 1, px: 1.25 }}>
            <Grid container>
              {DEPARTMENT_LIST.map((department) => (
                <Grid item md={6} key={department.key}>
                  <FormControlLabel
                    sx={{ height: "2rem" }}
                    label={
                      <Typography.Action sx={{ fontWeight: 400, lineHeight: "1.25rem" }}>
                        {t(department.label)}
                      </Typography.Action>
                    }
                    control={
                      <Checkbox
                        checked={salesDepartments.includes(department.key)}
                        onChange={(e) =>
                          e.target.checked
                            ? setSalesDepartments([...salesDepartments, department.key])
                            : setSalesDepartments(
                                salesDepartments.filter((key) => key !== department.key)
                              )
                        }
                      />
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </AddornmentLabelField>
      </Grid>
      <Grid
        item
        md={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "3rem",
          alignItems: "flex-end",
        }}
      >
        <Typography.Action
          sx={{
            lineHeight: "1.25rem",
            letterSpacing: "2px",
            color: "primary.main",
            cursor: "pointer",
          }}
          onClick={() =>
            handleFilterChange({
              productName: "",
              isOnSale: true,
              categoryKey: "all",
              salesStartDate: "",
              salesEndDate: "",
              salesDepartments: "",
            })
          }
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
          onClick={handleClick}
        >
          {t("admin.productlist.search")}
        </Button>
        <Box />
      </Grid>
    </Grid>
  )
}
