import React from "react"
import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import { ProductItem } from "src/components/client/productItem"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import { useWindowSize } from "src/hooks/useWindowSize"
import { IProductSearchItem } from "src/types/product"

interface ProductSlideProps {
  products?: IProductSearchItem[]
}

export const ProductSlide: React.FC<ProductSlideProps> = ({ products }) => {
  const { width } = useWindowSize()

  return (
    <Swiper modules={[Pagination]} spaceBetween={40} slidesPerView={(width + 12) / 260}>
      {products &&
        !!products.length &&
        products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
