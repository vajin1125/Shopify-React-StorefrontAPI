import React, { useState } from "react"
import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useTranslation } from "react-i18next"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

import { Box, Image, Typography } from "src/UILibrary"
import { PageContainer } from "src/components/client/pageContainer"
import { RoundButton } from "src/components/client/roundButton"
import { ProductItem } from "src/components/client/productItem"
import { ProductVariant } from "./components/productVariant"
import { Counter } from "./components/counter"
import { LoadingModal } from "src/components/shared/loadingModal"
import { DefaultPaymentMethod, ICard, IPaymentMethod } from "src/types/paymentMethod"
import { PayModal } from "./components/payModal"
import { SetMethodModal } from "./components/setMethodModal"
import { PrimaryPaymentMethodConfirmDialog } from "../mypage/paymentMethod/components/primaryPaymentMethodConfirmDialog"
import { PrimaryCreditCardConfirmDialog } from "../mypage/paymentMethod/components/primaryCreditCardConfirmDialog"
import { useCustomerSession } from "src/modules/customerSessionProvider"
import { useErrorHandler } from "src/hooks/useErrorHandler"
import { useDoCheckout } from "src/queries/checkout"

import { IProduct } from "src/types/product"
import { numberToUSDCurrency } from "src/modules/currency"

import "swiper/css"
import "swiper/css/pagination"

interface ProductDetailProps {
  product: IProduct
  paymentMethods?: IPaymentMethod
  selectedImage: number
  setSelectedImage: Function
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
  selectedImage,
  setSelectedImage,
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
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [openMethod, setOpenMethod] = useState<boolean>(false)
  const [changePaymentMethodDialogOpen, setChangePaymentMethodDialogOpen] = useState<boolean>(false)
  const [changeCreditCardDialogOpen, setChangeCreditCardDialogOpen] = useState<boolean>(false)
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<DefaultPaymentMethod>("card")
  const [defaultCard, setDefaultCard] = useState<ICard | null>(null)

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
      <Box sx={{ display: "flex", mt: 10, pr: 4.5, gap: "40px" }}>
        <Box sx={{ maxWidth: "500px" }}>
          {product.product?.images.nodes.length ? (
            <>
              <Image
                src={product.product.images.nodes[selectedImage].url}
                sx={{ width: "500px", "& img": { width: "100%" } }}
              />
              <Box sx={{ display: "flex", gap: "18px", mt: 2 }}>
                {product.product.images.nodes.map((image, index) => (
                  <Image
                    key={image.url}
                    src={image.url}
                    sx={{
                      width: "154px",
                      cursor: "pointer",
                      "& img": { width: "100%" },
                      "&:hover": { opacity: 0.7, transition: "all 0.5 ease-in-out" },
                    }}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </Box>
            </>
          ) : (
            <Typography.SubHead sx={{ width: "500px", textAlign: "center", color: "error.main" }}>
              {t("productDetail.no_image")}
            </Typography.SubHead>
          )}
        </Box>
        <Box sx={{ maxWidth: "425px", display: "flex", flexDirection: "column" }}>
          <Box mb={3}>
            <Typography.Heading>{product.product?.title}</Typography.Heading>
            <Typography.Description my={1}>{product.product?.description}</Typography.Description>
            <Typography.Title sx={{ lineHeight: "14px", color: "primary.main", mt: 1 }}>
              {`￥${numberToUSDCurrency(
                parseFloat(product.product?.variants.nodes[selectedVariant].priceV2.amount || "0")
              )}`}
              <Typography.Caption
                sx={{ display: "inline-block", fontWeight: 600, lineHeight: "14px" }}
              >
                ({t("productDetail.tax_included")})
              </Typography.Caption>
            </Typography.Title>
          </Box>
          {(product.product?.variants.nodes || []).length > 1 && (
            <Box mb={3}>
              <Typography.SubTitle sx={{ mb: 1 }}>
                {t("productDetail.variants")}
              </Typography.SubTitle>
              <Swiper modules={[Pagination]} spaceBetween={16} slidesPerView={3}>
                {product.product?.variants.nodes.map((variant, index) => (
                  <SwiperSlide key={variant.id}>
                    <ProductVariant
                      variant={variant}
                      sx={{ width: "130px" }}
                      selected={index === selectedVariant}
                      onClick={() => setSelectedVariant(index)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          )}
          <Box sx={{ py: 2.5, px: 3.75, mb: 2, borderRadius: "10px", bgcolor: "secondary.main" }}>
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
          </Box>
          <Typography.Description sx={{ my: 1 }}>
            {t("productDetail.publisher")} : {t("productDetail.publisher_type_1")}
          </Typography.Description>
          <Typography.Description sx={{ mb: 5 }}>
            {t("productDetail.dimensions")} : 21.2 x 1 x 25.8 cm
          </Typography.Description>
        </Box>
      </Box>
      <Box sx={{ maxWidth: "1000px", border: "1px solid", borderColor: "divider" }} />
      <Typography.Title color="primary" sx={{ lineHeight: "27px", mt: 1, mb: 3 }}>
        {t("cart.related_products")}
      </Typography.Title>
      <Box
        sx={{
          maxWidth: "1000px",
          display: "flex",
          flexWrap: "wrap",
          gap: "2.5rem",
        }}
      >
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
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
      <LoadingModal open={isAdding} />
    </PageContainer>
  )
}
