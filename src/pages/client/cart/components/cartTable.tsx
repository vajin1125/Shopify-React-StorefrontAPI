import * as React from "react"
import { useTranslation } from "react-i18next"

import { CartItem } from "./cartItem"
import { AddToCart } from "./addToCart"
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "src/UILibrary"

import { ICartLine } from "src/types/cart"
import { numberToUSDCurrency } from "src/modules/currency"

interface CartTableProps {
  cartLines: ICartLine[]
  onUpdateCartLines: Function
  onRemoveCartLines: Function
}

export const CartTable: React.FC<CartTableProps> = ({
  cartLines,
  onUpdateCartLines,
  onRemoveCartLines,
}) => {
  const { t } = useTranslation()

  return (
    <TableContainer sx={{ borderRadius: "5px", minWidth: "827px" }}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              "&>th": {
                color: "text.primary",
                fontWeight: 600,
                fontSize: "0.75rem",
                lineHeight: "1.25rem",
                letterSpacing: "2px",
                bgcolor: "secondary.main",
                py: "0.375rem",
                px: "0.75rem",
                borderWidth: "2px 2px 2px 2px",
                borderStyle: "solid",
                borderColor: "divider",
              },
            }}
          >
            <TableCell sx={{ width: "20px" }}>No</TableCell>
            <TableCell>{t("cart.product_name")}</TableCell>
            <TableCell>{t("cart.amount")}</TableCell>
            <TableCell>{t("cart.price")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartLines.map((cartLine, index) => (
            <TableRow
              sx={{
                "&>td": {
                  borderWidth: "2px 2px 2px 2px",
                  borderStyle: "solid",
                  borderColor: "divider",
                  py: 1,
                  px: "0.75rem",
                  height: "72px",
                },
              }}
              key={cartLine.merchandise.id}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <CartItem
                  cartLine={cartLine}
                  onUpdateCartLines={onUpdateCartLines}
                  onRemoveCartLines={onRemoveCartLines}
                />
              </TableCell>
              <TableCell>
                <AddToCart
                  id={cartLine.id}
                  count={cartLine.quantity}
                  totalCount={cartLine.merchandise.quantityAvailable}
                  onUpdateCartLines={onUpdateCartLines}
                  onRemoveCartLines={onRemoveCartLines}
                />
              </TableCell>
              <TableCell>
                <Typography.Title sx={{ lineHeight: "14px", color: "primary.main" }}>
                  {`￥${numberToUSDCurrency(
                    parseFloat(cartLine.merchandise.priceV2.amount || "0")
                  )}`}
                  <Typography.Caption
                    sx={{ display: "inline-block", fontWeight: 600, lineHeight: "14px" }}
                  >
                    ({t("purchase.tax_included")})
                  </Typography.Caption>
                </Typography.Title>
              </TableCell>
            </TableRow>
          ))}
          {!cartLines.length && (
            <Typography.Description>{t("cart.no_items")}</Typography.Description>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
