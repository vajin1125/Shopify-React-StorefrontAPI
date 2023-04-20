import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { AxiosError } from "axios"

import { Box, Button, Typography, Notification } from "src/UILibrary"
import { PageContainer } from "src/components/client/pageContainer"
import { PaginationItem } from "src/components/client/paginationItem"
import { RoundButton } from "src/components/client/roundButton"
import { ProductSlide } from "src/components/client/productsSlide"
import { Counter } from "./components/counter"
import { ProductVariant } from "./components/productVariant"
import { PayModal } from "./components/payModal"
import { SetMethodModal } from "./components/setMethodModal"
import { LoadingModal } from "src/components/shared/loadingModal"
import { PrimaryPaymentMethodConfirmDialog } from "../mypage/paymentMethod/components/primaryPaymentMethodConfirmDialog"
import { PrimaryCreditCardConfirmDialog } from "../mypage/paymentMethod/components/primaryCreditCardConfirmDialog"

import useNotification from "src/hooks/useNotification"
import { useWindowSize } from "src/hooks/useWindowSize"
import { BackIcon } from "src/assets/icons/BackIcon"
import { IProduct } from "src/types/product"
import { DefaultPaymentMethod, ICard, IPaymentMethod } from "src/types/paymentMethod"
import { numberToUSDCurrency } from "src/modules/currency"
import { useCustomerSession } from "src/modules/customerSessionProvider"
import { useDoCheckout } from "src/queries/checkout"
import { useErrorHandler } from "src/hooks/useErrorHandler"

import "swiper/css"
import "swiper/css/pagination"

interface ProductDetailProps {
  product: IProduct
  paymentMethods?: IPaymentMethod
  selectedVariant: number
  setSelectedVariant: Function
  selectedCount: number
  setSelectedCount: Function
  isAdding: boolean
  onCartAdd: Function
  error?: AxiosError | null
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  paymentMethods,
  selectedVariant,
  setSelectedVariant,
  selectedCount,
  setSelectedCount,
  isAdding,
  onCartAdd,
  error,
}) => {
  const { t } = useTranslation()
  const session = useCustomerSession()
  const handleError = useErrorHandler()
  const { width } = useWindowSize()
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [openMethod, setOpenMethod] = useState<boolean>(false)
  const [changePaymentMethodDialogOpen, setChangePaymentMethodDialogOpen] = useState<boolean>(false)
  const [changeCreditCardDialogOpen, setChangeCreditCardDialogOpen] = useState<boolean>(false)
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<DefaultPaymentMethod>("card")
  const [defaultCard, setDefaultCard] = useState<ICard | null>(null)
  const { props } = useNotification("success", t("productDetail.addition_completed"))

  const { mutate: doCheckout, isLoading: isCheckingOut } = useDoCheckout({
    onSuccess: () => {
      setOpen(false)
      navigate("/purchase-complete")
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
      handleError(err)
    },
  })

  const onCheckout = () => {
    const checkoutData = {
      paymentMethod: defaultPaymentMethod,
      products: [
        {
          productName: product.product?.title,
          singlePrice: parseFloat(
            product.product?.variants.nodes[selectedVariant].priceV2.amount || "0"
          ),
          quantity: selectedCount,
          productID: product.product?.variants.nodes[selectedVariant].id,
        },
      ],
    }
    doCheckout({
      data: checkoutData,
      token: session?.value.writeCustomerAccessToken || "",
    })
  }

  return (
    <PageContainer>
      <Button
        variant="text"
        sx={{ color: "text.secondary", lineHeight: "20px", mt: 0.75, mb: 1.5 }}
        onClick={() => navigate(-1)}
      >
        <BackIcon width="7" height="12" sx={{ height: "20px", mr: 1 }} />
        {t("productDetail.go_back")}
      </Button>
      <Box>
        <Typography.Title mb={2}>{product.product?.title}</Typography.Title>
        <Swiper pagination={true} modules={[Pagination]}>
          {product.product?.images.nodes.map((image) => (
            <SwiperSlide key={image.url}>
              <PaginationItem src={image.url} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Typography.Description my={1}>{product.product?.description}</Typography.Description>
        <Typography.Title sx={{ lineHeight: "14px", color: "primary.main" }}>
          {`￥${numberToUSDCurrency(
            parseFloat(product.product?.variants.nodes[selectedVariant].priceV2.amount || "0")
          )}`}
          <Typography.Caption sx={{ display: "inline-block", fontWeight: 600, lineHeight: "14px" }}>
            ({t("productDetail.tax_included")})
          </Typography.Caption>
        </Typography.Title>
      </Box>
      <Box sx={{ mt: 4.5, mb: 0.5 }}>
        <Typography.SubTitle sx={{ mb: 1 }}>{t("productDetail.size")}</Typography.SubTitle>
        <Swiper modules={[Pagination]} spaceBetween={16} slidesPerView={width / 166}>
          {product.product?.variants.nodes.map((variant, index) => (
            <SwiperSlide key={variant.id}>
              <ProductVariant
                variant={variant}
                selected={index === selectedVariant}
                onClick={() => setSelectedVariant(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Counter
        count={selectedCount}
        setCount={setSelectedCount}
        totalCount={product.product?.variants.nodes[selectedVariant].quantityAvailable || 0}
      />
      <RoundButton
        variant="contained"
        color="warning"
        sx={{ mt: 2, width: "100%" }}
        disabled={selectedCount < 1}
        onClick={() => setOpen(true)}
      >
        {t("productDetail.buy_now")}
      </RoundButton>
      <RoundButton
        variant="contained"
        color="primary"
        sx={{ my: 1.25, width: "100%" }}
        onClick={() => onCartAdd()}
      >
        {t("productDetail.add_to_cart")}
      </RoundButton>
      <Typography.Description sx={{ my: 1 }}>
        {t("productDetail.publisher")} : {t("productDetail.publisher_type_1")}
      </Typography.Description>
      <Typography.Description sx={{ mb: 2 }}>
        {t("productDetail.dimensions")} : 21.2 x 1 x 25.8 cm
      </Typography.Description>
      <Box sx={{ mb: 6 }}>
        <Typography.Title color="primary" sx={{ lineHeight: "27px", mb: 3 }}>
          {t("cart.related_products")}
        </Typography.Title>
        <ProductSlide />
      </Box>
      <PayModal
        open={open}
        paymentMethods={paymentMethods}
        handleOpen={setOpen}
        openMethod={() => setOpenMethod(true)}
        handleConfirm={onCheckout}
        isLoading={isCheckingOut}
      />
      <SetMethodModal
        paymentMethods={paymentMethods}
        open={openMethod}
        handleOpen={setOpenMethod}
        error={error}
        setDefaultCard={setDefaultCard}
        setDefaultPaymentMethod={setDefaultPaymentMethod}
        setChangePaymentMethodDialogOpen={setChangePaymentMethodDialogOpen}
        setChangeCreditCardDialogOpen={setChangeCreditCardDialogOpen}
      />
      <PrimaryPaymentMethodConfirmDialog
        open={changePaymentMethodDialogOpen}
        setOpen={setChangePaymentMethodDialogOpen}
        paymentMethod={defaultPaymentMethod}
      />
      <PrimaryCreditCardConfirmDialog
        open={changeCreditCardDialogOpen}
        setOpen={setChangeCreditCardDialogOpen}
        creditCard={defaultCard}
      />
      <Notification {...props} />
      <LoadingModal open={isAdding} />
    </PageContainer>
  )
}
