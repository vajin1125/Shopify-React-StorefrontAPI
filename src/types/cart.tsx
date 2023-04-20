export interface ICartCreateResponse {
  cartCreate: {
    cart: {
      id: string
    }
    userErrors: { code: string; field: string; message: string }[]
  }
}

export interface ICartLinesAddResponse {
  cartLinesAdd: {
    userErrors: { code: string; field: string; message: string }[]
  }
}

export interface ICartItemState {
  value: number
  setValue: Function
}

export interface ICartItemCount {
  cart: {
    lines: {
      nodes: {
        quantity: number
        merchandise: {
          priceV2: {
            amount: string
            currencyCode: string
          }
        }
      }[]
    }
  }
}

export interface ICartLine {
  id: string
  quantity: number
  subscription: { value: string } | null
  merchandise: {
    priceV2: {
      amount: string
      currencyCode: string
    }
    id: string
    product: {
      id: string
      title: string
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
    quantityAvailable: number
  }
}

export interface ICart {
  cart: {
    totalQuantity: number
    cost: {
      totalAmount: {
        amount: number
        currencyCode: string
      }
    }
    lines: {
      nodes: ICartLine[]
    }
  }
}

export interface ICartLinesUpdateResponse {
  cartLinesUpdate: {
    userErrors: { code: string; field: string; message: string }[]
  }
}

export interface ICartLinesRemoveResponse {
  cartLinesRemove: {
    userErrors: { code: string; field: string; message: string }[]
  }
}
