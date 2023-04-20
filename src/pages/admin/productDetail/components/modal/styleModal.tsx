import React, { ChangeEvent, useState, useMemo, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import isEqual from "lodash/isEqual"

import {
  Typography,
  TextField,
  Chip,
  Button,
  Box,
  Grid,
  MenuItem,
  Select,
  LoadingButton,
} from "src/UILibrary"
import { Modal } from "src/components/modal"

import {
  useCreateProductStyles,
  useUpdateProductStyles,
  useDeleteProductStyles,
} from "src/queries/product"
import { IProductStyle, IProductStyleType } from "src/types/product"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { PRODUCT_STYLE_TYPES } from "src/constants/adminProductDetail"

interface StyleModalProps {
  id: string
  open: boolean
  styles: IProductStyle[]
  selectedStyle: IProductStyleType | null
  // eslint-disable-next-line no-unused-vars
  handleOpen: (open: boolean) => void
  // eslint-disable-next-line no-unused-vars
  handleErrors: (err: AxiosError) => void
}

export const StyleModal: React.FC<StyleModalProps> = ({
  id,
  open,
  styles,
  selectedStyle,
  handleOpen,
  handleErrors,
}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const session = useAdminSession()
  const styleOptions = useMemo(
    () =>
      selectedStyle
        ? [selectedStyle]
        : PRODUCT_STYLE_TYPES.filter((type) => !styles.map((style) => style.type).includes(type)),
    [styles, selectedStyle]
  )
  const [style, setStyle] = useState<IProductStyleType>(styleOptions[0])
  const [styleValues, setStyleValues] = useState<string[]>([])
  const [newValue, setNewValue] = useState<string>("")

  const { mutate: createProductStyles, isLoading: isCreating } = useCreateProductStyles({
    onSuccess: () => {
      queryClient.invalidateQueries(["getProductStyles", id])
      queryClient.invalidateQueries(["getProductVariants", id])
      handleOpen(false)
    },
    onError: handleErrors,
  })

  const { mutate: updateProductStyles, isLoading: isUpdating } = useUpdateProductStyles({
    onSuccess: () => {
      queryClient.invalidateQueries(["getProductStyles", id])
      queryClient.invalidateQueries(["getProductVariants", id])
      handleOpen(false)
    },
    onError: handleErrors,
  })

  const { mutate: deleteProductStyles, isLoading: isDeleting } = useDeleteProductStyles({
    onSuccess: () => {
      queryClient.invalidateQueries(["getProductStyles"])
      // TODO: refetch variants
      handleOpen(false)
    },
    onError: handleErrors,
  })

  const isChanging = useMemo(
    () => isCreating || isUpdating || isDeleting,
    [isCreating, isUpdating, isDeleting]
  )

  const handleContentKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!!newValue.trim() && e.key === "Enter" && !e.shiftKey) {
      !styleValues.includes(newValue.trim()) && setStyleValues([...styleValues, newValue.trim()])
      setNewValue("")
    }
  }

  const handleClose = () => {
    handleOpen(false)
  }

  const handleSubmit = () => {
    if (selectedStyle) {
      const initialValues = styles.find((style) => style.type === selectedStyle)
      if (!isEqual(initialValues, styleValues)) {
        if (styleValues.length) {
          updateProductStyles({
            id,
            style: { selectedStyle, value: [...styleValues] },
            token: session?.value.writeAdminAccessToken || "",
          })
        } else {
          deleteProductStyles({
            id,
            styleName: selectedStyle,
            token: session?.value.writeAdminAccessToken || "",
          })
        }
      }
    } else {
      !!styleValues.length &&
        createProductStyles({
          id,
          style: { type: style, value: [...styleValues] },
          token: session?.value.writeAdminAccessToken,
        })
    }
  }

  const handleDelete = (value: string) => {
    !isChanging && setStyleValues(styleValues.filter((v) => v !== value))
  }

  useEffect(() => {
    setStyle(styleOptions[0])
    setNewValue("")
  }, [styleOptions])

  useEffect(() => {
    const values = styles.find((style) => style.type === selectedStyle)
    setStyleValues(values ? [...values.value] : [])
    setNewValue("")
  }, [styles, selectedStyle])

  return (
    <Modal handleClose={handleClose} open={open} title="admin.productdetail.add_style">
      <Grid
        container
        sx={{ bgcolor: "#FAFAFA", p: "1.5rem 1.25rem 1.5rem 5rem" }}
        rowSpacing={1.125}
      >
        <Grid item md={12}>
          <Typography.Description
            sx={{ fontWeight: 600, lineHeight: "1.25rem", letterSpacing: "2px", mb: "0.625rem" }}
          >
            {t("admin.productdetail.style")}
          </Typography.Description>
          <Select
            value={style}
            onChange={(e) => setStyle(e.target.value as IProductStyleType)}
            sx={{
              minWidth: "180px",
              "& .MuiSelect-select": {
                py: "0.5rem",
                bgcolor: "background.default",
                border: "2px solid",
                borderColor: "divider",
              },
            }}
            disabled={!!selectedStyle || isChanging}
          >
            {styleOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {t(`admin.productdetail.${option}`)}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md={12}>
          <Typography.Description
            sx={{ fontWeight: 600, lineHeight: "1.25rem", letterSpacing: "2px", mb: "0.625rem" }}
          >
            {t("admin.productdetail.style_value")}
          </Typography.Description>
          <Box mb={1} sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {styleValues.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => handleDelete(value)}
                disabled={isChanging}
              />
            ))}
          </Box>
          <TextField
            sx={{ "& input": { py: "0.75rem" } }}
            value={newValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewValue(e.target.value)}
            disabled={isChanging}
            onKeyPress={handleContentKeyPress}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          mt: 3,
          mb: 2.5,
        }}
      >
        <Button
          sx={{
            color: "text.secondary",
            width: "150px",
            height: "44px",
            "&:hover": {
              color: "text.primary",
            },
          }}
          disabled={isChanging}
          onClick={handleClose}
        >
          {t("admin.productdetail.cancel")}
        </Button>
        <LoadingButton
          loading={isChanging}
          variant="contained"
          color="primary"
          sx={{
            width: "150px",
            height: "44px",
            color: "background.default",
            borderRadius: 0,
          }}
          onClick={handleSubmit}
          disabled={isChanging}
        >
          {t(selectedStyle ? "admin.share.save" : "admin.productdetail.addition")}
        </LoadingButton>
      </Box>
    </Modal>
  )
}
