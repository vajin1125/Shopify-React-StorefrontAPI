import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { AxiosError } from "axios"
import { useQueryClient } from "@tanstack/react-query"

import { Box, Chip, Typography, Button } from "src/UILibrary"
import { StyleModal } from "./modal/styleModal"
import { StyleZone } from "./styleZone"

import { useUpdateProductStyles, useDeleteProductStyles } from "src/queries/product"
import { IProductStyle, IProductStyleType } from "src/types/product"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { PRODUCT_STYLE_TYPES } from "src/constants/adminProductDetail"

interface StyleAddZoneProps {
  id: string
  styles: IProductStyle[]
  // eslint-disable-next-line no-unused-vars
  handleErrors: (err: AxiosError) => void
}

export const StyleAddZone: React.FC<StyleAddZoneProps> = ({ id, styles, handleErrors }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const session = useAdminSession()
  const [styleModalOpen, setStyleModalOpen] = useState<boolean>(false)
  const [selectedStyle, setSelectedStyle] = useState<IProductStyleType | null>(null)

  const { mutate: updateProductStyles, isLoading: isUpdating } = useUpdateProductStyles({
    onSuccess: () => {
      queryClient.invalidateQueries(["getProductStyles", id])
      queryClient.invalidateQueries(["getProductVariants", id])
    },
    onError: handleErrors,
  })

  const { mutate: deleteProductStyles, isLoading: isDeleting } = useDeleteProductStyles({
    onSuccess: () => {
      queryClient.invalidateQueries(["getProductStyles", id])
      queryClient.invalidateQueries(["getProductVariants", id])
    },
    onError: handleErrors,
  })

  const handleDeleteStyleValue = (type: IProductStyleType, item: string) => {
    const selected = styles.find((style) => style.type === type)
    const newValues = (selected?.value || []).filter((v) => v !== item)
    if (newValues.length) {
      updateProductStyles({
        id,
        style: { type, value: [...newValues] },
        token: session?.value.writeAdminAccessToken || "",
      })
    } else {
      deleteProductStyles({
        id,
        styleName: type,
        token: session?.value.writeAdminAccessToken || "",
      })
    }
  }

  return (
    <>
      {styles.length === 0 ? (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            "& .MuiDropzoneArea-root": {
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              minHeight: "40px",
              height: "40px",
              borderColor: "info.dark",
              borderRadius: "5px",
            },
          }}
        >
          <StyleZone
            onClick={() => {
              setSelectedStyle(null)
              setStyleModalOpen(true)
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            py: "0.625rem",
            "& .MuiDropzoneArea-root": {
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              minHeight: "40px",
              height: "40px",
              borderColor: "info.dark",
            },
          }}
        >
          {styles.map((style) => (
            <Box
              key={style.type}
              sx={{
                p: "1rem",
                bgcolor: "#FAFAFA",
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography.Description
                sx={{ lineHeight: "1.25rem", fontWeight: 600, mr: 2, flexShrink: 0 }}
              >
                {t(`admin.productdetail.${style.type}`)}
              </Typography.Description>
              <Box sx={{ flexGrow: 1, mr: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {style.value.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    onDelete={() => handleDeleteStyleValue(style.type, item)}
                    disabled={isUpdating || isDeleting}
                  />
                ))}
              </Box>
              <Button
                sx={{
                  flexShrink: 0,
                  borderColor: "text.secondary",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  px: 2.5,
                  py: 0.5,
                  borderRadius: 1.25,
                  color: "text.secondary",
                  fontSize: "0.75rem",
                  lineHeight: "1.25rem",
                }}
                onClick={() => {
                  setSelectedStyle(style.type)
                  setStyleModalOpen(true)
                }}
              >
                {t("admin.share.edit")}
              </Button>
            </Box>
          ))}
          {styles.length < PRODUCT_STYLE_TYPES.length && (
            <StyleZone
              onClick={() => {
                setSelectedStyle(null)
                setStyleModalOpen(true)
              }}
            />
          )}
        </Box>
      )}
      <StyleModal
        id={id}
        open={styleModalOpen}
        styles={styles}
        selectedStyle={selectedStyle}
        handleOpen={setStyleModalOpen}
        handleErrors={handleErrors}
      />
    </>
  )
}
