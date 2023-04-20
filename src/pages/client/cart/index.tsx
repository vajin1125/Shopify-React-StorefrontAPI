import React from "react"
import { ApolloError } from "@apollo/client"
import { useTranslation } from "react-i18next"

import { Box, CircularProgress, Typography } from "src/UILibrary"
import { Cart as MobileCart } from "./mobile"
import { Cart as LaptopCart } from "./laptop"

import { ResponsiveUI } from "src/modules/responsiveUI"
import { useGetCartInfo, useCartLinesUpdate, useCartLinesRemove } from "src/queries/cart"
import { ICartLinesUpdateResponse, ICartLinesRemoveResponse } from "src/types/cart"
import { usePushAlerts } from "src/hooks/alerts"
import { AxiosError } from "axios"

export const Cart: React.FC = () => {
  const { t } = useTranslation()
  const cartId = localStorage.getItem("shopifyCartId") || ""
  const pushAlerts = usePushAlerts()

  const { data: cart, loading, error, refetch } = useGetCartInfo(cartId)

  const [updateCartLines, { loading: isUpdating }] = useCartLinesUpdate({
    onCompleted: (data: ICartLinesUpdateResponse) => {
      if (data.cartLinesUpdate.userErrors.length) {
        pushAlerts({ message: t("cart.cannot_update"), color: "error" })
      } else {
        refetch()
      }
    },
    onError: (err: ApolloError) => {
      console.error(err)
      pushAlerts({ message: t("cart.cannot_update"), color: "error" })
    },
  })

  const onUpdateCartLines = (id: string, quantity: number) => {
    updateCartLines({
      variables: {
        cartId,
        lines: [{ id, quantity }],
      },
    })
  }

  const [removeCartLines, { loading: isRemoving }] = useCartLinesRemove({
    onCompleted: (data: ICartLinesRemoveResponse) => {
      if (data.cartLinesRemove.userErrors.length) {
        pushAlerts({ message: t("cart.cannot_remove"), color: "error" })
      } else {
        refetch()
      }
    },
    onError: (err: AxiosError) => {
      console.error(err)
      pushAlerts({ message: t("cart.cannot_remove"), color: "error" })
    },
  })

  const onRemoveCartLines = (id: string) => {
    removeCartLines({ variables: { cartId, lineIds: [id] } })
  }

  if (loading) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          mt: { xs: 8, md: 20 },
        }}
      >
        <CircularProgress size="lg" color="primary" />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography.DetailHeading sx={{ textAlign: "center", color: "error.main" }}>
        {error.message}
      </Typography.DetailHeading>
    )
  }

  if (cart) {
    return ResponsiveUI({
      mobile: (
        <MobileCart
          cart={cart}
          onUpdateCartLines={onUpdateCartLines}
          onRemoveCartLines={onRemoveCartLines}
          isChanging={isUpdating || isRemoving}
        />
      ),
      laptop: (
        <LaptopCart
          cart={cart}
          onUpdateCartLines={onUpdateCartLines}
          onRemoveCartLines={onRemoveCartLines}
          isChanging={isUpdating || isRemoving}
        />
      ),
    })
  }

  return <></>
}
