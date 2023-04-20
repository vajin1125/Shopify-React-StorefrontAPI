export type IProductStyleType = "color" | "size" | "material" | "usecase"

export interface IProductVariant {
  id: string
  title: string
  priceV2: {
    amount: string
  }
  image: {
    url: string
    altText: string | null
  }
  selectedOptions: {
    name: string
    value: string
  }[]
  quantityAvailable: number
}

export interface IProduct {
  product: {
    availableForSale: boolean
    description: string
    title: string
    totalInventory: number
    images: {
      nodes: {
        url: string
        altText: string | null
      }[]
    }
    collections: {
      nodes: {
        title: string
      }[]
    }
    options: {
      id: string
      name: string
      values: string[]
    }[]
    variants: {
      nodes: IProductVariant[]
    }
  } | null
}

export interface IProductSearchItem {
  id: string
  title: string
  description: string
  availableForSale: boolean
  priceRange: {
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  images: {
    nodes: {
      url: string
      altText: string | null
    }[]
  }
  collections: {
    nodes: {
      title: string
    }[]
  }
}

export interface IProductsList {
  nodes: IProductSearchItem[]
  pageInfo: {
    hasNextPage: boolean
    endCursor: string
  }
}

export interface IProductsListWithoutCollection {
  products: IProductsList
}

export interface ICreateProductResponse {
  productId: number
}

export interface IAdminProduct {
  id: number
  name: string
  isOnSale: boolean
  category: string
  salesStartDate: string
  salesEndDate: string
  salesTargetDepartments: string[]
}

export interface IAdminProductList {
  products: IAdminProduct[]
  totalProductNumber: number
}

export interface ISalesTarget {
  school: string
  department: string
  grade: number
}

export interface IAdminProductItem {
  title: string
  description: string
  category: string
  makerId: number
  itemCode: string
  isOnSale: boolean
  salesTarget: ISalesTarget[]
  osakaSalesStartDate: string
  osakaSalesEndDate: string
  kumamotoSalesStartDate: string
  kumamotoSalesEndDate: string
  kobeSalesStartDate: string
  kobeSalesEndDate: string
  osakaBeautyAndBridalSalesStartDate: string
  osakaBeautyAndBridalSalesEndDate: string
}

export interface IProductTags {
  tags: string[]
}

export interface IProductStyle {
  type: IProductStyleType
  value: string[]
}

export interface IProductStyles {
  styles: IProductStyle[]
}

export interface IAdminProductVariant {
  variantId: number
  name: string
  cost: number
  currentStudentPricing: number
  teacherPricing: number
}

export interface IAdminProductVariants {
  styles: IAdminProductVariant[]
}

export interface IUpdateProductVariants {
  styles: Omit<IAdminProductVariant, "name">[]
}

export interface IProductMedia {
  mediaId: string
  imageUrl: string
}

export interface IProductMedias {
  photos: IProductMedia[]
}
