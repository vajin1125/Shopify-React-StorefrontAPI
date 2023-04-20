import React, { useEffect } from "react"
import { AxiosError } from "axios"
import { useTranslation } from "react-i18next"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import { TextField, Box, Button, MenuItem, LoadingButton } from "src/UILibrary"
import { Modal } from "src/components/modal"
import { InputField } from "../../makerlist/components/inputField"

import { Admin } from "src/types/admin"
import * as Validator from "src/modules/validation"
import { SYSTEM_ADMIN_TYPES } from "src/constants/systemAdminType"
import { AdminType, ChangableAdmin } from "src/types/admin"
import { useAddAdmin, useEditAdmin } from "src/queries/admin"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { usePushAlerts } from "src/hooks/alerts"

const validationSchema = Yup.object().shape({
  email: Validator.emailSchema(),
})

export const EditAdminModal = ({
  open,
  onClose,
  handleOpen,
  admin,
}: {
  open: boolean
  onClose: () => void
  // eslint-disable-next-line no-unused-vars
  handleOpen: (open: boolean) => void
  admin?: Admin
}) => {
  const { t } = useTranslation()
  const session = useAdminSession()
  const queryClient = useQueryClient()
  const pushAlerts = usePushAlerts()

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<ChangableAdmin>({
    resolver: yupResolver(validationSchema),
  })

  const handleError = (err: AxiosError) => {
    const status = err.response?.status
    const errorMessage = (err.response?.data as string).trim()
    if (status === 400 && typeof err.response?.data === "string") {
      if (errorMessage === "a_system_admin_with_this_email_already_exists_in_db") {
        setError("email", {
          type: status.toString(),
          message: t("duplicated_admin_email"),
        })
      } else {
        pushAlerts({ message: t("error.internal_server_error"), color: "error" })
      }
    } else if (status === 401) {
      pushAlerts({ message: t("error.unauthorized_error"), color: "error" })
    } else if (status === 500) {
      if (errorMessage === "admin_type_is_invalid") {
        pushAlerts({ message: t("error.invalid_admin_type"), color: "error" })
      } else {
        pushAlerts({ message: t("error.internal_server_error"), color: "error" })
      }
    } else {
      pushAlerts({ message: t("auth.unknown_error"), color: "error" })
    }
  }

  const handleClose = () => {
    handleOpen(false)
    onClose()
  }

  const { mutate: addAdmin, isLoading: isAdding } = useAddAdmin({
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminList"])
      handleClose()
    },
    onError: (err: AxiosError) => {
      handleError(err)
    },
  })

  const onAddAdmin: SubmitHandler<ChangableAdmin> = (data) => {
    addAdmin({
      data: data,
      token: session?.value.writeAdminAccessToken || "",
    })
  }

  const { mutate: onUpdateAdmin, isLoading: isEditing } = useEditAdmin({
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminList"])
      handleClose()
    },
    onError: (err: AxiosError) => {
      handleError(err)
    },
  })

  const onEditAdmin: SubmitHandler<ChangableAdmin> = (data) => {
    onUpdateAdmin({
      adminID: admin?.id,
      data: data,
      token: session?.value.writeAdminAccessToken || "",
    })
  }

  useEffect(() => {
    if (open) {
      if (admin) {
        reset({
          email: admin?.email,
          type: admin?.type,
        })
      } else {
        reset({
          email: "",
          type: "school",
        })
      }
    } else {
      reset({
        email: "",
        type: "school",
      })
    }
  }, [open, admin, reset])

  return (
    <Modal
      handleClose={handleClose}
      open={open}
      title={`admin.adminlist.${admin ? "edit" : "add"}_admin`}
    >
      <Box component="form" onSubmit={handleSubmit(admin ? onEditAdmin : onAddAdmin)}>
        <Box mt={3} py={3} px={10}>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <InputField label="admin.adminlist.email_address">
                <TextField
                  value={value}
                  onChange={onChange}
                  disabled={isAdding || isEditing}
                  inputProps={admin && { readOnly: true }}
                  error={!!errors.email}
                  helperText={errors.email && t(`error.${errors.email.message}`)}
                  sx={{ "& input": { height: "20px", py: "0.75rem" } }}
                />
              </InputField>
            )}
          />
          <Controller
            control={control}
            name="type"
            render={({ field: { value, onChange } }) => (
              <InputField label="admin.adminlist.authority">
                <TextField
                  select
                  sx={{
                    "& .MuiSelect-select": {
                      minHeight: "20px",
                      height: "20px",
                      py: "0.75rem",
                    },
                  }}
                  value={value}
                  disabled={isAdding || isEditing}
                  name="type"
                  onChange={(event) => {
                    onChange(event.target.value as AdminType)
                  }}
                  error={!!errors.type}
                  helperText={errors.type && t(`error.${errors.type.message}`)}
                >
                  {Object.keys(SYSTEM_ADMIN_TYPES).map((adminType) => (
                    <MenuItem key={adminType} value={adminType}>
                      {t(SYSTEM_ADMIN_TYPES[adminType as AdminType])}
                    </MenuItem>
                  ))}
                </TextField>
              </InputField>
            )}
          />
        </Box>
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
            onClick={handleClose}
          >
            {t("admin.share.cancel")}
          </Button>
          <LoadingButton
            loading={isAdding || isEditing}
            disabled={isAdding || isEditing}
            variant="contained"
            color="primary"
            sx={{
              width: "150px",
              height: "44px",
              color: "background.default",
              borderRadius: 0,
            }}
            type="submit"
          >
            {t(`admin.share.${admin ? "save" : "addition"}`)}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  )
}
