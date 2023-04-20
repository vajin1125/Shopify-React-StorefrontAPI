import React, { useEffect } from "react"
import { AxiosError } from "axios"
import { useTranslation } from "react-i18next"
import { useQueryClient } from "@tanstack/react-query"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import { TextField, Box, Button, LoadingButton } from "src/UILibrary"
import { Modal } from "src/components/modal"
import { InputField } from "./inputField"

import { Maker } from "src/types/maker"
import { useAdminSession } from "src/modules/adminSessionProvider"
import * as Validator from "src/modules/validation"
import { useEditMaker, useAddMaker } from "src/queries/maker"
import { usePushAlerts } from "src/hooks/alerts"

const validationSchema = Yup.object().shape({
  name: Validator.nameSchema(),
  representativeName: Validator.representativeNameSchema(),
  representativeEmail: Validator.representativeEmailSchema(),
  accountingDepartmentEmail: Validator.accountingDepartmentEmailSchema(),
})

export const EditMakerModal = ({
  open,
  handleOpen,
  maker,
}: {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleOpen: (open: boolean) => void
  maker?: Maker
}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const session = useAdminSession()
  const pushAlerts = usePushAlerts()

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<Maker>({
    resolver: yupResolver(validationSchema),
  })

  const handleError = (err: AxiosError) => {
    const status = err.response?.status
    const errorMessage = (err.response?.data as string).trim()
    if (status === 400 && typeof err.response?.data === "string") {
      if (errorMessage === "duplicated_maker_representative_email")
        setError("representativeEmail", {
          type: status.toString(),
          message: t("duplicated_maker_representative_email"),
        })
      else if (errorMessage === "duplicated_maker_accounting_member_email")
        setError("accountingDepartmentEmail", {
          type: status.toString(),
          message: t("duplicated_maker_accounting_member_email"),
        })
      else pushAlerts({ message: t("error.invalid_input_error"), color: "error" })
    } else if (status === 401) {
      pushAlerts({ message: t("error.unauthorized_error"), color: "error" })
    } else if (status === 500) {
      pushAlerts({ message: t("error.internal_server_error"), color: "error" })
    } else {
      pushAlerts({ message: t("auth.unknown_error"), color: "error" })
    }
  }

  useEffect(() => {
    if (open) {
      if (maker) {
        reset({ ...maker, accountingDepartmentEmail: maker.accountingDepartmentEmail.toString() })
      } else {
        reset({
          name: "",
          representativeName: "",
          representativeEmail: "",
          accountingDepartmentEmail: "",
        })
      }
    } else {
      reset({
        name: "",
        representativeName: "",
        representativeEmail: "",
        accountingDepartmentEmail: "",
      })
    }
  }, [open, maker, reset])

  const handleClose = () => {
    handleOpen(false)
  }

  const { mutate: editMaker, isLoading: isEditing } = useEditMaker({
    onSuccess: () => {
      queryClient.invalidateQueries(["getMakerList"])
      handleClose()
    },
    onError: (err: AxiosError) => {
      handleError(err)
    },
  })

  const onEditMaker: SubmitHandler<Maker> = (data) => {
    editMaker({
      id: maker?.id,
      data: data,
      token: session?.value.writeAdminAccessToken || "",
    })
  }

  const { mutate: addMaker, isLoading: isAdding } = useAddMaker({
    onSuccess: () => {
      queryClient.invalidateQueries(["getMakerList"])
      handleClose()
    },
    onError: (err: AxiosError) => {
      handleError(err)
    },
  })

  const onAddMaker: SubmitHandler<Maker> = (data) => {
    addMaker({
      data: data,
      token: session?.value.writeAdminAccessToken || "",
    })
  }

  return (
    <Modal
      handleClose={handleClose}
      open={open}
      title={`admin.makerlist.${maker ? "edit" : "add"}_maker`}
    >
      <Box component="form" onSubmit={handleSubmit(maker ? onEditMaker : onAddMaker)}>
        <Box mt={3} py={3} px={10}>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <InputField label="admin.makerlist.maker_name">
                <TextField
                  value={value}
                  onChange={onChange}
                  error={!!errors.name}
                  helperText={errors.name && t(`error.${errors.name.message}`)}
                  sx={{ "& input": { height: "20px", py: "0.75rem" } }}
                  disabled={isAdding || isEditing}
                />
              </InputField>
            )}
          />
          <Controller
            control={control}
            name="representativeName"
            render={({ field: { value, onChange } }) => (
              <InputField label="admin.makerlist.representative_name">
                <TextField
                  value={value}
                  onChange={onChange}
                  error={!!errors.representativeName}
                  helperText={
                    errors.representativeName && t(`error.${errors.representativeName.message}`)
                  }
                  sx={{ "& input": { height: "20px", py: "0.75rem" } }}
                  disabled={isAdding || isEditing}
                />
              </InputField>
            )}
          />
          <Controller
            control={control}
            name="representativeEmail"
            render={({ field: { value, onChange } }) => (
              <InputField label="admin.makerlist.email_address_of_representative">
                <TextField
                  value={value}
                  onChange={onChange}
                  error={!!errors.representativeEmail}
                  helperText={
                    errors.representativeEmail && t(`error.${errors.representativeEmail.message}`)
                  }
                  sx={{ "& input": { height: "20px", py: "0.75rem" } }}
                  disabled={isAdding || isEditing}
                />
              </InputField>
            )}
          />
          <Controller
            control={control}
            name="accountingDepartmentEmail"
            render={({ field: { value, onChange } }) => (
              <InputField label="admin.makerlist.email_address_of_order_recipient">
                <TextField
                  value={value}
                  onChange={onChange}
                  error={!!errors.accountingDepartmentEmail}
                  helperText={
                    errors.accountingDepartmentEmail &&
                    t(`error.${errors.accountingDepartmentEmail.message}`)
                  }
                  sx={{ "& input": { height: "20px", py: "0.75rem" } }}
                  disabled={isAdding || isEditing}
                />
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
            {t("admin.productdetail.cancel")}
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
            {t("admin.productdetail.setting")}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  )
}
