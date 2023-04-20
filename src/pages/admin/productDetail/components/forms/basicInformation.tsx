import React, { useMemo } from "react"
import { Controller, Control, FieldErrorsImpl } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import {
  Box,
  TextField,
  Paper,
  MenuItem,
  Autocomplete,
  Typography,
  CircularProgress,
} from "src/UILibrary"
import { SectionField } from "../sectionField"
import { SectionTitle } from "../sectionTitle"
import { Dropzone } from "../dropzone"
import { StyleAddZone } from "../styleAddZone"

import { IAdminProductItem } from "src/types/product"
import { CATEGORY_LIST } from "src/constants/customerSidebar"
import {
  useGetProductTags,
  useCreateProductTags,
  useDeleteProductTags,
  useGetProductStyles,
  useGetProductMedias,
} from "src/queries/product"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { useGetMakerList } from "src/queries/maker"

interface BasicInformationProps {
  id: string
  control: Control<IAdminProductItem, any>
  errors: Partial<FieldErrorsImpl<IAdminProductItem>>
  // eslint-disable-next-line no-unused-vars
  handleErrors: (err: AxiosError) => void
}

export const BasicInformation: React.FC<BasicInformationProps> = ({
  id,
  control,
  errors,
  handleErrors,
}) => {
  const { t } = useTranslation()
  const session = useAdminSession()
  const queryClient = useQueryClient()

  const {
    data: tags,
    isLoading: isLoadingTags,
    error: tagErrors,
  } = useGetProductTags(id || "", session?.value.readAdminAccessToken || "")

  const {
    data: makers,
    isLoading: isLoadingMakers,
    error: makerErrors,
  } = useGetMakerList(-1, 1, "", session?.value.readAdminAccessToken || "")

  const {
    data: styles,
    isLoading: isLoadingStyles,
    error: styleErrors,
  } = useGetProductStyles(id || "", session?.value.readAdminAccessToken || "")

  const {
    data: medias,
    isLoading: isMediasLoading,
    error: mediaErrors,
  } = useGetProductMedias(id || "", "", session?.value.readAdminAccessToken || "")

  const renderedMakers = useMemo(() => makers?.data.makers || [], [makers])

  const { mutate: createTags, isLoading: isCreatingTags } = useCreateProductTags({
    onSuccess: () => {
      queryClient.invalidateQueries(["getProductTags", id])
    },
    onError: handleErrors,
  })

  const { mutate: deleteTags, isLoading: isDeletingTags } = useDeleteProductTags({
    onSuccess: () => {
      queryClient.invalidateQueries(["getProductTags", id])
    },
    onError: handleErrors,
  })

  const handleTags = (newTags: string[]) => {
    const previous = tags?.data.tags || []
    if (previous.length > newTags.length) {
      const changes = previous.filter((item) => !newTags.includes(item))
      deleteTags({
        id,
        tagName: changes[0],
        token: session?.value.writeAdminAccessToken || "",
      })
    } else if (previous.length < newTags.length) {
      createTags({
        id,
        tagNames: [newTags[newTags.length - 1]],
        token: session?.value.writeAdminAccessToken || "",
      })
    }
  }

  return (
    <Paper sx={{ bgcolor: "background.default", my: 3 }}>
      <SectionTitle
        label="admin.productdetail.basic_information"
        sx={{
          borderBottom: "2px solid",
          borderBottomColor: "info.dark",
        }}
      />
      <Box sx={{ maxWidth: "726px", px: "1.25rem", py: "1.5rem" }}>
        <Controller
          name="title"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SectionField label="admin.productdetail.product_name">
              <TextField
                sx={{ flexGrow: 1, "& input": { py: "0.75rem", height: "1rem" } }}
                value={value}
                onChange={onChange}
                error={!!errors.title}
                helperText={errors.title ? t(`error.${errors.title}`) : undefined}
              />
            </SectionField>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SectionField label="admin.productdetail.description">
              <TextField
                sx={{ flexGrow: 1, "& input": { py: "0.75rem", height: "1rem" } }}
                value={value}
                onChange={onChange}
                error={!!errors.description}
                helperText={errors.description ? t(`error.${errors.description}`) : undefined}
              />
            </SectionField>
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SectionField label="admin.productdetail.category">
              <TextField
                select
                sx={{
                  flexGrow: 1,
                  "& .MuiSelect-select": { py: "0.5rem" },
                  maxWidth: "250px",
                }}
                value={value}
                onChange={onChange}
                error={!!errors.category}
                helperText={errors.category ? t(`error.${errors.category}`) : undefined}
              >
                {CATEGORY_LIST.map((category) => (
                  <MenuItem key={category.key} value={category.key}>
                    {t(category.label)}
                  </MenuItem>
                ))}
              </TextField>
            </SectionField>
          )}
        />
        <Controller
          name="makerId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SectionField label="admin.productdetail.manufacturer">
              {makerErrors ? (
                <Typography.DetailHeading sx={{ color: "error.main" }}>
                  {t("admin.productdetail.cannot_get_makers")}
                </Typography.DetailHeading>
              ) : (
                <Autocomplete
                  sx={{ maxWidth: 250, width: "100%", flexGrow: 1 }}
                  loading={isLoadingMakers}
                  options={renderedMakers.map((maker) => maker.id)}
                  getOptionLabel={(option) => {
                    const maker = renderedMakers.find((item) => item.id === option)
                    return maker?.representativeName || ""
                  }}
                  value={value}
                  onChange={(_, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ "& .MuiSelect-select": { py: "0.5rem" } }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {isLoadingMakers ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                      error={!!errors.makerId}
                      helperText={errors.makerId ? t(`error.${errors.makerId}`) : undefined}
                    />
                  )}
                />
              )}
            </SectionField>
          )}
        />
        <Controller
          name="itemCode"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SectionField label="admin.productdetail.product_code">
              <TextField
                sx={{
                  flexGrow: 1,
                  "& input": { py: "0.75rem", height: "1rem" },
                  maxWidth: "250px",
                }}
                value={value}
                onChange={onChange}
                error={!!errors.itemCode}
                helperText={errors.itemCode ? t(`error.${errors.itemCode}`) : undefined}
              />
            </SectionField>
          )}
        />
        <SectionField label="admin.productdetail.tag">
          <Box sx={{ flexGrow: 1 }}>
            {tagErrors ? (
              <Typography.DetailHeading sx={{ color: "error.main" }}>
                {t("admin.productdetail.cannot_get_tags")}
              </Typography.DetailHeading>
            ) : (
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={tags?.data.tags || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ "& input": { py: "0.75rem", height: "1rem" } }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {isLoadingTags ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
                onChange={(_, newValue) => {
                  handleTags(newValue)
                }}
                disabled={isLoadingTags || isCreatingTags || isDeletingTags}
              />
            )}
          </Box>
        </SectionField>
        <SectionField
          label="admin.productdetail.product_photo"
          subLabel="admin.productdetail.upto_13_sheets"
          sx={{ alignItems: "top", "&>p": { pt: "0.625rem" } }}
        >
          {mediaErrors ? (
            <Typography.DetailHeading sx={{ color: "error.main" }}>
              {t("admin.productdetail.cannot_get_images")}
            </Typography.DetailHeading>
          ) : isMediasLoading ? (
            <CircularProgress color="primary" size="20px" />
          ) : (
            <Dropzone id={id || ""} files={medias.data.photos} handleErrors={handleErrors} />
          )}
        </SectionField>
        <SectionField
          label="admin.productdetail.style"
          sx={{ alignItems: "top", "&>p": { pt: "0.625rem" } }}
        >
          {styleErrors ? (
            <Typography.DetailHeading sx={{ color: "error.main" }}>
              {t("admin.productdetail.cannot_get_tags")}
            </Typography.DetailHeading>
          ) : isLoadingStyles ? (
            <CircularProgress color="primary" size="20px" />
          ) : (
            <StyleAddZone id={id} styles={styles?.data.styles || []} handleErrors={handleErrors} />
          )}
        </SectionField>
      </Box>
    </Paper>
  )
}
