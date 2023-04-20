import React, { useState, useMemo, useEffect, ChangeEvent } from "react"
import { AxiosError } from "axios"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import debounce from "lodash/debounce"

import { TextField, Typography, Box, Button, Grid, InputAdornment } from "src/UILibrary"
import { PageContainer } from "src/components/adminPageContainer"
import { AdvancedTable, FieldDefinition } from "src/components/adminTable"
import { EditAdminModal } from "./components/editAdminModal"
import { RemoveAdminModal } from "./components/removeAdminModal"
import { LoadingModal } from "src/components/shared/loadingModal"

import { usePushAlerts } from "src/hooks/alerts"
import { Admin, AdminType } from "src/types/admin"
import { SearchIcon } from "src/assets/icons/SearchIcon"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { useGetAdminList, useDeleteAdmins } from "src/queries/admin"
import { SYSTEM_ADMIN_TYPES } from "src/constants/systemAdminType"
import { PAGE_SIZE } from "src/constants/common"

export const AdminList = () => {
  const { t } = useTranslation()
  const session = useAdminSession()
  const queryClient = useQueryClient()
  const pushAlerts = usePushAlerts()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchKeyword = searchParams.get("keyword") || ""
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false)
  const [removeModalOpen, setRemoveModalOpen] = useState<boolean>(false)
  const [admin, setAdmin] = useState<Admin>()
  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>(searchKeyword)
  const [totalPageCount, setTotalPageCount] = useState<number>(1)
  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearchParams({ keyword: val }, { replace: true })
        setTotalPageCount(1)
        setPage(1)
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const fields: FieldDefinition<Admin>[] = useMemo(
    () => [
      {
        attribute: "id",
        label: "admin.adminlist.ID",
        width: 120,
      },
      {
        attribute: "fullName",
        label: "admin.adminlist.name",
      },
      {
        attribute: "school",
        label: "admin.adminlist.school_building",
      },
      {
        attribute: "type",
        label: "admin.adminlist.authority",
        widget: ({ value }) => (
          <Typography.Action
            sx={{
              color: "text.primary",
              fontWeight: 400,
              lineHeight: "20px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t(SYSTEM_ADMIN_TYPES[value as AdminType])}
          </Typography.Action>
        ),
      },
      {
        attribute: "email",
        label: "admin.adminlist.email_address",
      },
    ],
    [t]
  )

  const handleAddModalOpen = () => {
    setAdmin(undefined)
    setAddModalOpen(true)
  }
  const handleCloseAddModalOpen = () => {
    setAdmin(undefined)
  }
  const handleEdit = (row: Admin) => {
    setAdmin(row)
    setAddModalOpen(true)
  }
  const handleRemove = (row: Admin) => {
    setAdmin(row)
    setRemoveModalOpen(true)
  }
  const {
    data: adminlist,
    isLoading,
    error,
  } = useGetAdminList(PAGE_SIZE, page, searchKeyword, session?.value.readAdminAccessToken || "")

  const { mutate: deleteAdmins, isLoading: isDeleting } = useDeleteAdmins({
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminList"])
    },
    onError: (err: AxiosError) => {
      pushAlerts({ message: err.message, color: "error" })
    },
  })

  const onDeleteAdmins = () => {
    setRemoveModalOpen(false)
    deleteAdmins({
      adminId: admin?.id,
      token: session?.value.writeAdminAccessToken || "",
    })
  }

  const onKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((value.match(/ /g) || []).length <= 2) {
      setKeyword(value)
      debouncedSearch(value)
    } else {
      pushAlerts({ message: t("admin.adminlist.too_many_spaces_in_keyword"), color: "error" })
    }
  }

  useEffect(() => {
    !!adminlist && setTotalPageCount(Math.ceil(adminlist.data.totalAdminNumber / PAGE_SIZE))
  }, [adminlist])

  return (
    <PageContainer title={t("admin.adminlist.admin_management")}>
      <Grid container spacing={{ xs: 2, md: 3 }} style={{ marginBottom: 24 }}>
        <Grid item xs={8} sm={8} md={8}>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ borderWidth: "2px" }}>
                  <SearchIcon width="17" height="17" />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{
              "& input": {
                p: "0.375rem 1rem",
                height: "1rem",
                borderRadius: 0,
                border: "2px solid",
                borderRight: 0,
                borderColor: "info.dark",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: 0,
                  borderWidth: "2px",
                  borderColor: "info.dark",
                },
              },
            }}
            value={keyword}
            onChange={onKeywordChange}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", pr: "7.5rem" }}>
            <Button
              variant="contained"
              onClick={handleAddModalOpen}
              sx={{
                p: "0.375rem 1.25rem",
                borderRadius: 0,
                height: "2rem",
                color: "background.default",
              }}
            >
              <Typography.Description sx={{ fontWeight: 600, lineHeight: "1.25rem" }}>
                {t("admin.adminlist.add_admin")}
              </Typography.Description>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box pr={15}>
        <AdvancedTable<Admin>
          content={adminlist?.data.admins || []}
          fields={fields}
          pagination={{ count: totalPageCount, currentPage: page }}
          editable
          onEdit={handleEdit}
          onRemove={handleRemove}
          onPageNumChange={(value: number) => setPage(value)}
          isLoading={isLoading}
          error={error?.message}
        />
      </Box>
      <EditAdminModal
        open={addModalOpen}
        onClose={handleCloseAddModalOpen}
        handleOpen={setAddModalOpen}
        admin={admin}
      />
      <RemoveAdminModal
        open={removeModalOpen}
        handleOpen={setRemoveModalOpen}
        admin={admin}
        onConfirm={onDeleteAdmins}
      />
      <LoadingModal open={isDeleting} />
    </PageContainer>
  )
}
