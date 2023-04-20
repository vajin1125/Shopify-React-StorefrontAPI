import React, { useState } from "react"
import { AxiosError } from "axios"

import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  InputAdornment,
  Image,
  TextField,
} from "src/UILibrary"
import { PhotoAddModal } from "./modal/photoAddModal"

import { IAdminProductVariant } from "src/types/product"

import AddIcon from "src/assets/icons/add.svg"

interface ProductVariantRowProps {
  id: string
  variant: IAdminProductVariant
  setVariants: Function
  // eslint-disable-next-line no-unused-vars
  handleErrors: (err: AxiosError) => void
}

export const ProductVariantRow: React.FC<ProductVariantRowProps> = ({
  id,
  variant,
  setVariants,
  handleErrors,
}) => {
  const [photoModalOpen, setPhotoModalOpen] = useState<boolean>(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
    const fieldName = e.target.name
    const value = e.target.value
    setVariants((variants: IAdminProductVariant[]) =>
      variants.map((variant) =>
        variant.variantId === id ? { ...variant, [fieldName]: value } : { ...variant }
      )
    )
  }

  return (
    <>
      <TableRow
        sx={{
          borderBottom: "2px solid",
          borderColor: "info.dark",
          "& td": {
            bgcolor: "background.default",
          },
        }}
      >
        <TableCell sx={{ p: 0 }}>
          <Checkbox sx={{ p: 0 }} />
        </TableCell>
        <TableCell>
          <Typography.Description
            sx={{
              fontWeight: 600,
              color: "text.primary",
              lineHeight: "1.25rem",
              letterSpacing: "2px",
            }}
          >
            {variant.name}
          </Typography.Description>
        </TableCell>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              my: "0.625rem",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "80px",
              height: "80px",
              width: "80px",
              borderStyle: "dashed",
              borderColor: "info.dark",
              boxSizing: "border-box",
            }}
            onClick={() => setPhotoModalOpen(true)}
          >
            <Image src={AddIcon} alt="Add" />
          </Box>
        </TableCell>
        <TableCell>
          <TextField
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">￥</InputAdornment>,
              sx: { "& input": { py: "0.75rem" } },
            }}
            value={variant.cost}
            name="cost"
            onChange={(e) => onChange(e, variant.variantId)}
          />
        </TableCell>
        <TableCell>
          <TextField
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">￥</InputAdornment>,
              sx: { "& input": { py: "0.75rem" } },
            }}
            value={variant.currentStudentPricing}
            name="currentStudentPricing"
            onChange={(e) => onChange(e, variant.variantId)}
          />
        </TableCell>
        {/* <TableCell>
          <TextField
            InputProps={{
              startAdornment: <InputAdornment position="start">￥</InputAdornment>,
              sx: { "& input": { py: "0.75rem" } },
            }}
          />
        </TableCell> */}
        <TableCell>
          <TextField
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">￥</InputAdornment>,
              sx: { "& input": { py: "0.75rem" } },
            }}
            value={variant.teacherPricing}
            name="teacherPricing"
            onChange={(e) => onChange(e, variant.variantId)}
          />
        </TableCell>
      </TableRow>
      <PhotoAddModal
        id={id}
        variantId={variant.variantId}
        open={photoModalOpen}
        handleOpen={setPhotoModalOpen}
        handleErrors={handleErrors}
      />
    </>
  )
}
