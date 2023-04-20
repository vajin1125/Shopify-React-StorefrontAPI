import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ApolloError } from "@apollo/client"
import { useTranslation } from "react-i18next"

import { ProductDetail as MobileProductDetail } from "./mobile"
import { Box, CircularProgress, Typography } from "src/UILibrary"
import { ProductDetail as LaptopProductDetail } from "./laptop"

import { useGetProduct } from "src/queries/product"
import { ResponsiveUI } from "src/modules/responsiveUI"
import { useCartCreate, useCartLinesAdd } from "src/queries/cart"
import { ICartCreateResponse, ICartLinesAddResponse } from "src/types/cart"
import { usePushAlerts } from "src/hooks/alerts"
import { useCartItemCount } from "src/modules/cartItemCountProvider"
import { useCustomerSession } from "src/modules/customerSessionProvider"
import { useGetPaymentMethods } from "src/queries/paymentMethod"

export const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const session = useCustomerSession()
  const pushAlerts = usePushAlerts()
  const { t } = useTranslation()
  const cartItemCount = useCartItemCount()
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [selectedVariant, setSelectedVariant] = useState<number>(0)
  const [selectedCount, setSelectedCount] = useState<number>(0)
  const [isAdding, setIsAdding] = useState<boolean>(false)

  const { data: product, loading, error, refetch } = useGetProduct(id || "")

  const {
    data: paymentMethods,
    isLoading: isPaymentMethodLoading,
    error: paymentMethodError,
  } = useGetPaymentMethods(session?.value.readCustomerAccessToken || "")

  const [createCart] = useCartCreate({
    onCompleted: (data: ICartCreateResponse) => {
      if (data.cartCreate.userErrors.length) {
        switch (data.cartCreate.userErrors[0].code) {
          case "INVALID_MERCHANDISE_LINE":
            pushAlerts({ message: t("productDetail.merchandise_error"), color: "error" })
            break
          case "LESS_THAN":
            pushAlerts({ message: t("productDetail.count_error"), color: "error" })
            refetch()
            break
          default:
            pushAlerts({ message: t("productDetail.other_error"), color: "error" })
            break
        }
      } else {
        localStorage.setItem("shopifyCartId", data.cartCreate.cart.id)
        !!cartItemCount && cartItemCount.setValue(cartItemCount.value + selectedCount)
        pushAlerts({ message: t("productDetail.added_cart"), color: "success" })
        setSelectedCount(0)
      }
      setIsAdding(false)
    },
    onError: (err: ApolloError) => {
      console.error(err)
      setIsAdding(false)
      pushAlerts({ message: t("productDetail.other_error"), color: "error" })
    },
  })

  useEffect(() => {
    setSelectedCount(0)
  }, [selectedVariant])

  const onCreateCart = () => {
    createCart({
      variables: {
        input: {
          lines: [
            {
              merchandiseId: product?.product?.variants.nodes[selectedVariant].id || "",
              quantity: selectedCount,
            },
          ],
        },
      },
    })
  }

  const [addCartLines] = useCartLinesAdd({
    onCompleted: (data: ICartLinesAddResponse) => {
      if (data.cartLinesAdd.userErrors.length) {
        switch (data.cartLinesAdd.userErrors[0].code) {
          case "INVALID":
            onCreateCart()
            break
          case "INVALID_MERCHANDISE_LINE":
            pushAlerts({ message: t("productDetail.merchandise_error"), color: "error" })
            break
          case "LESS_THAN":
            pushAlerts({ message: t("productDetail.count_error"), color: "error" })
            refetch()
            break
          default:
            pushAlerts({ message: t("productDetail.other_error"), color: "error" })
            break
        }
      } else {
        setIsAdding(false)
        !!cartItemCount && cartItemCount.setValue(cartItemCount.value + selectedCount)
        pushAlerts({ message: t("productDetail.added_cart"), color: "success" })
        setSelectedCount(0)
      }
    },
    onError: () => {
      onCreateCart()
    },
  })

  const onCartAdd = () => {
    if (selectedCount && product?.product?.variants) {
      const cartId = localStorage.getItem("shopifyCartId") || ""
      if (cartId) {
        addCartLines({
          variables: {
            cartId: cartId,
            lines: {
              merchandiseId: product.product.variants.nodes[selectedVariant].id || "",
              quantity: selectedCount,
            },
          },
        })
      } else {
        onCreateCart()
      }
      setIsAdding(true)
    }
  }

  if (loading) {
    return (
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
    )
  }

  if (error) {
    return (
      <>
        <Typography.DetailHeading sx={{ textAlign: "center", color: "error.main", mb: 2 }}>
          {t("productDetail.cannot_find_data_or_network_problem")}
        </Typography.DetailHeading>
        <Typography.DetailHeading sx={{ textAlign: "center", color: "error.main" }}>
          {t("productDetail.try_later")}
        </Typography.DetailHeading>
      </>
    )
  }

  if (product?.product) {
    return ResponsiveUI({
      mobile: (
        <MobileProductDetail
          product={product}
          paymentMethods={paymentMethods?.data}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          selectedCount={selectedCount}
          setSelectedCount={setSelectedCount}
          isAdding={isAdding || isPaymentMethodLoading}
          error={paymentMethodError}
          onCartAdd={onCartAdd}
        />
      ),
      laptop: (
        <LaptopProductDetail
          product={product}
          paymentMethods={paymentMethods?.data}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          selectedCount={selectedCount}
          setSelectedCount={setSelectedCount}
          isAdding={isAdding || isPaymentMethodLoading}
          error={paymentMethodError}
          onCartAdd={onCartAdd}
        />
      ),
    })
  }

  return <></>
}
