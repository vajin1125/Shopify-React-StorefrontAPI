import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { AxiosError } from "axios"
import { useQueryClient } from "@tanstack/react-query"

import { Box, Button } from "src/UILibrary"
import { AccordionWrapper } from "../accordionWrapper"
import { StyleTable } from "../styleTable"

import { useGetProductVariants, useUpdateProductVariants } from "src/queries/product"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { IAdminProductVariant } from "src/types/product"

interface AdvancedStyleSettingsProps {
  id: string
  // eslint-disable-next-line no-unused-vars
  handleErrors: (err: AxiosError) => void
}

export const AdvancedStyleSettings: React.FC<AdvancedStyleSettingsProps> = ({
  id,
  handleErrors,
}) => {
  const { t } = useTranslation()
  const session = useAdminSession()
  const queryClient = useQueryClient()
  const [variants, setVariants] = useState<IAdminProductVariant[]>([])

  const { data, isLoading, error } = useGetProductVariants(
    id,
    session?.value.readAdminAccessToken || ""
  )

  const { mutate: updateProductVariants, isLoading: isUpdating } = useUpdateProductVariants({
    onSuccess: () => {
      queryClient.invalidateQueries(["getProductVariants", id])
    },
    onError: handleErrors,
  })

  const handleClick = () => {
    updateProductVariants({
      id,
      data: variants.map((variant) => ({
        variantId: variant.variantId,
        cost: variant.cost,
        currentStudentPricing: variant.currentStudentPricing,
        teacherPricing: variant.teacherPricing,
      })),
      token: session?.value.writeAdminAccessToken || "",
    })
  }

  useEffect(() => {
    !!data && setVariants(data.data.styles)
  }, [data])

  return (
    <AccordionWrapper label={t("admin.productdetail.advanced_style_settings")}>
      <Box sx={{ p: "0 1.25rem" }}>
        <StyleTable
          id={id}
          variants={variants}
          isLoading={isLoading}
          error={error}
          setVariants={setVariants}
          handleErrors={handleErrors}
        />
        {!error && !isLoading && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", py: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                color: "background.default",
                width: "150px",
                py: "0.875rem",
                borderRadius: 0,
                ml: 11.5,
              }}
              disabled={isUpdating}
              onClick={handleClick}
            >
              {t("admin.productdetail.setting")}
            </Button>
          </Box>
        )}
      </Box>
    </AccordionWrapper>
  )
}
