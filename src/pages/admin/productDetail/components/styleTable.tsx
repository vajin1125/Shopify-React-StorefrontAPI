import React from "react"
import { useTranslation } from "react-i18next"
import { AxiosError } from "axios"

import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "src/UILibrary"
import { ProductVariantRow } from "./productVariantRow"

import { IAdminProductVariant } from "src/types/product"

interface StyleTableProps {
  id: string
  variants: IAdminProductVariant[]
  isLoading: boolean
  error: AxiosError | null
  setVariants: Function
  // eslint-disable-next-line no-unused-vars
  handleErrors: (err: AxiosError) => void
}

export const StyleTable: React.FC<StyleTableProps> = ({
  id,
  variants,
  isLoading,
  error,
  setVariants,
  handleErrors,
}) => {
  const { t } = useTranslation()

  return (
    <TableContainer>
      <Table size="small" sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow
            sx={{
              "&>th": {
                color: "text.secondary",
                fontWeight: 600,
                fontSize: "0.75rem",
                lineHeight: "1.25rem",
                letterSpacing: "2px",
                height: "28px",
                "&:not(:first-of-type):not(:last-of-type)": {
                  borderWidth: "0 0 2px 0",
                  borderStyle: "solid",
                  borderColor: "info.light",
                },
              },
            }}
          >
            <TableCell sx={{ width: "24px", p: 0 }}>
              <Checkbox sx={{ p: 0 }} />
            </TableCell>
            <TableCell>{t("admin.productdetail.style")}</TableCell>
            <TableCell>{t("admin.productdetail.photo")}</TableCell>
            <TableCell>{t("admin.productdetail.purchase_price")}</TableCell>
            <TableCell>{t("admin.productdetail.sales_price_for_current_students")}</TableCell>
            {/* <TableCell>{t("admin.productdetail.sales_price_for_graduates")}</TableCell> */}
            <TableCell>{t("admin.productdetail.sales_price_for_teachers")}</TableCell>
          </TableRow>
        </TableHead>
        {!error && !isLoading && !!variants.length && (
          <TableBody>
            {variants.map((variant) => (
              <ProductVariantRow
                key={variant.variantId}
                id={id}
                variant={variant}
                setVariants={setVariants}
                handleErrors={handleErrors}
              />
            ))}
          </TableBody>
        )}
      </Table>
      {error ? (
        <Typography.Description sx={{ textAlign: "center", color: "error.main", py: 3 }}>
          {t("admin.productdetail.cannot_get_variants")}
        </Typography.Description>
      ) : isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : !variants.length ? (
        <Typography.Description sx={{ textAlign: "center", color: "text.primary", py: 3 }}>
          {t("admin.productdetail.no_product_variant")}
        </Typography.Description>
      ) : null}
    </TableContainer>
  )
}
