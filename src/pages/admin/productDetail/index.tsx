import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import { AxiosError } from "axios"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import { PageContainer } from "src/components/adminPageContainer"
import { Box, Button, CircularProgress, Typography } from "src/UILibrary"
import { BasicInformation } from "./components/forms/basicInformation"
import { SalesSettings } from "./components/forms/salesSettings"
import { AdvancedStyleSettings } from "./components/forms/advancedStyleSettings"
import { LoadingModal } from "src/components/shared/loadingModal"

import { useGetAdminProduct, useDeleteProduct, useUpdateAdminProduct } from "src/queries/product"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { isCreateProductState } from "src/states/product"
import { usePushAlerts } from "src/hooks/alerts"
import { IAdminProductItem } from "src/types/product"
import * as Validator from "src/modules/validation"

const validationSchema = Yup.object().shape({
  title: Validator.productTitle(),
  description: Yup.string(),
  category: Validator.productCategory(),
  makerId: Validator.productMakerId(),
  itemCode: Validator.productItemCode(),
  isOnSale: Validator.productIsOnSale(),
  salesTarget: Yup.array(),
  osakaSalesStartDate: Yup.string(),
  osakaSalesEndDate: Yup.string(),
  kumamotoSalesStartDate: Yup.string(),
  kumamotoSalesEndDate: Yup.string(),
  kobeSalesStartDate: Yup.string(),
  kobeSalesEndDate: Yup.string(),
  osakaBeautyAndBridalSalesStartDate: Yup.string(),
  osakaBeautyAndBridalSalesEndDate: Yup.string(),
})

export const ProductDetail: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const session = useAdminSession()
  const pushAlerts = usePushAlerts()
  const queryClient = useQueryClient()
  const [isCreateProduct, setIsCreateProduct] = useRecoilState(isCreateProductState)

  const handleErrors = (err: AxiosError) => {
    console.error(err)
    if (err.response?.status === 401) {
      pushAlerts({ message: t("auth.not_authorized"), color: "error" })
    } else if (err.response?.status === 403) {
      pushAlerts({ message: t("auth.forbidden"), color: "error" })
    } else if (err.response?.status === 500) {
      pushAlerts({ message: t("auth.server_error"), color: "error" })
    } else {
      pushAlerts({ message: t("auth.unknown_error"), color: "error" })
    }
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IAdminProductItem>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      makerId: 0,
      itemCode: "",
      isOnSale: false,
      salesTarget: [],
      osakaSalesStartDate: "",
      osakaSalesEndDate: "",
      kumamotoSalesStartDate: "",
      kumamotoSalesEndDate: "",
      kobeSalesStartDate: "",
      kobeSalesEndDate: "",
      osakaBeautyAndBridalSalesStartDate: "",
      osakaBeautyAndBridalSalesEndDate: "",
    },
  })

  const {
    data: product,
    isLoading,
    error,
  } = useGetAdminProduct(id || "", session?.value.writeAdminAccessToken || "")

  const { mutate: deleteProduct, isLoading: isDeleting } = useDeleteProduct({
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminProductList"])
      queryClient.invalidateQueries(["getAdminProduct", id])
      setIsCreateProduct(false)
      navigate(-1)
    },
    onError: handleErrors,
  })

  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateAdminProduct({
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminProductList"])
      queryClient.invalidateQueries(["getAdminProduct", id])
      setIsCreateProduct(false)
    },
    onError: handleErrors,
  })

  const handleCancel = () => {
    if (isCreateProduct) {
      deleteProduct({ productId: id || "", token: session?.value.writeAdminAccessToken || "" })
    } else if (product) {
      reset(product.data)
    }
  }

  const onSubmit = (data: IAdminProductItem) => {
    updateProduct({
      productId: id || "",
      data,
      token: session?.value.writeAdminAccessToken || "",
    })
  }

  useEffect(() => {
    !!product && reset(product.data)
  }, [product, reset])

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 5, md: 15 }, flexGrow: 1 }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography.DetailHeading sx={{ textAlign: "center", color: "error.main", flexGrow: 1 }}>
        {error.response?.status === 404
          ? t("admin.productdetail.cannot_find_product")
          : error.response?.status === 500
          ? t("auth.server_error")
          : t("auth.unknown_error")}
      </Typography.DetailHeading>
    )
  }

  return (
    <PageContainer title={t("admin.productdetail.product_details")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BasicInformation
          id={id || ""}
          control={control}
          errors={errors}
          handleErrors={handleErrors}
        />
        <SalesSettings control={control} errors={errors} />
        <AdvancedStyleSettings id={id || ""} handleErrors={handleErrors} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: "15rem",
            mt: "10rem",
            flexGrow: 1,
          }}
        >
          <Button
            sx={{ color: "text.secondary", width: "150px", p: "0.875rem 1rem" }}
            onClick={handleCancel}
            disabled={isDeleting || isUpdating}
          >
            {t("admin.productdetail.cancel")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              color: "background.default",
              width: "150px",
              py: "0.875rem",
              borderRadius: 0,
              ml: 11.5,
            }}
            disabled={isDeleting || isUpdating}
          >
            {t("admin.productdetail.setting")}
          </Button>
        </Box>
      </form>
      <LoadingModal open={isDeleting || isUpdating} />
    </PageContainer>
  )
}
