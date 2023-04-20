import React, { useState, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"
import { AxiosResponse, AxiosError } from "axios"
import { useSetRecoilState } from "recoil"

import {
  ExpandMoreIcon,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
} from "src/UILibrary"
import { PageContainer } from "src/components/adminPageContainer"
import { AdvancedTable } from "src/components/adminTable"
import { SearchBox } from "./components/searchBox"

import { MerchandiseManagement, IAdminProductListFilters } from "src/types/merchandise"
import { useGetAdminProductList, useCreateAdminProduct } from "src/queries/product"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { getOptimizedAdminProductListFilters } from "src/modules/filters"
import { ADMIN_PRODUCT_LIST_FIELDS } from "src/constants/fields"
import { PAGE_SIZE } from "src/constants/common"
import { CATEGORY_LIST } from "src/constants/customerSidebar"
import { ICreateProductResponse } from "src/types/product"
import { isCreateProductState } from "src/states/product"
import { usePushAlerts } from "src/hooks/alerts"

export const ProductList: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const session = useAdminSession()
  const pushAlerts = usePushAlerts()
  const [searchParams, setSearchParams] = useSearchParams()
  const productName = searchParams.get("productName") || ""
  const isOnSale = searchParams.get("isOnSales") === "true"
  const categoryKey = searchParams.get("categoryKey") || "all"
  const salesStartDate = searchParams.get("salesStartDate") || ""
  const salesEndDate = searchParams.get("salesEndDate") || ""
  const salesDepartments = searchParams.get("salesDepartments") || ""
  const [page, setPage] = useState<number>(1)
  const [totalPageCount, setTotalPageCount] = useState<number>(1)
  const setIsCreateProduct = useSetRecoilState(isCreateProductState)

  const { data, isLoading, error } = useGetAdminProductList(
    PAGE_SIZE,
    page,
    getOptimizedAdminProductListFilters({
      productName,
      isOnSale,
      categoryKey,
      salesStartDate,
      salesEndDate,
      salesDepartments,
    }),
    session?.value.readAdminAccessToken || ""
  )

  const { mutate: createAdminProduct, isLoading: isCreating } = useCreateAdminProduct({
    onSuccess: (res: AxiosResponse<ICreateProductResponse>) => {
      setIsCreateProduct(true)
      navigate(`/admin/product/${res.data.productId}`)
    },
    onError: (err: AxiosError) => {
      console.error(err)
      if (err.response?.status === 401) {
        pushAlerts({ message: "auth.not_authorized", color: "error" })
      } else if (err.response?.status === 403) {
        pushAlerts({ message: "auth.forbidden", color: "error" })
      } else if (err.response?.status === 500) {
        pushAlerts({ message: t("auth.server_error"), color: "error" })
      } else {
        pushAlerts({ message: t("auth.unknown_error"), color: "error" })
      }
    },
  })

  const tableData = useMemo(
    () =>
      data
        ? data.data.products.map((product): MerchandiseManagement => {
            const category = CATEGORY_LIST.find((category) => category.key === product.category)
            return {
              id: product.id.toString(),
              name: product.name,
              is_on_sale: product.isOnSale
                ? t("admin.productlist.on_sale")
                : t("admin.productlist.stock"),
              category: category ? t(category.label) : "",
              sales_period: `${product.salesStartDate} - ${product.salesEndDate}`,
              for_sale: product.salesTargetDepartments
                .map((department) => t(`admin.productlist.${department}`))
                .join(", "),
            }
          })
        : [],
    [data, t]
  )

  const handleFilterChange = (data: IAdminProductListFilters) => {
    const newSearchParam = getOptimizedAdminProductListFilters(data)
    setSearchParams(
      Object.keys(newSearchParam).reduce(
        (prev, curr) => ({
          ...prev,
          [curr]: newSearchParam[curr as keyof IAdminProductListFilters]?.toString(),
        }),
        {}
      ),
      { replace: true }
    )
    setPage(1)
    setTotalPageCount(1)
  }

  useEffect(() => {
    if (data) {
      setTotalPageCount(Math.ceil(data.data.totalProductNumber / PAGE_SIZE))
    }
  }, [data])

  return (
    <PageContainer
      title={t("admin.productlist.merchandise_management")}
      toolbar={
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              p: "0.375rem 1.25rem",
              borderRadius: 0,
              height: "2rem",
              bgcolor: "text.secondary",
              color: "background.default",
            }}
            onClick={() =>
              createAdminProduct({ token: session?.value.writeAdminAccessToken || "" })
            }
            disabled={isCreating}
          >
            <Typography.Description sx={{ fontWeight: 600, lineHeight: "1.25rem" }}>
              {t("admin.productlist.add_product")}
            </Typography.Description>
          </Button>
        </Box>
      }
    >
      <Accordion disableGutters sx={{ boxShadow: "none", mb: "1.5rem", bgcolor: "transparent" }}>
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
        <AccordionDetails sx={{ pt: "1rem", mr: -1.75 }}>
          <SearchBox
            initialData={{
              productName,
              isOnSale,
              categoryKey,
              salesStartDate,
              salesEndDate,
              salesDepartments,
            }}
            handleFilterChange={handleFilterChange}
          />
        </AccordionDetails>
      </Accordion>
      <AdvancedTable<MerchandiseManagement>
        content={tableData}
        fields={ADMIN_PRODUCT_LIST_FIELDS}
        pagination={{ count: totalPageCount, currentPage: page }}
        onRowClick={(row: MerchandiseManagement) => {
          setIsCreateProduct(false)
          navigate(`/admin/product/${row.id}`)
        }}
        onPageNumChange={(value: number) => setPage(value)}
        isLoading={isLoading}
        error={error ? t("admin.productlist.fetch_error") : ""}
      />
    </PageContainer>
  )
}
