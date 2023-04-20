import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useLocation } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { Typography, Box, Button } from "src/UILibrary"
import { PageContainer } from "src/components/adminPageContainer"
import { AdvancedTable, FieldDefinition } from "src/components/adminTable"
import { ImportDepartmentModal } from "./components/importDepartmentModal"
import { RemoveDepartmentModal } from "./components/removeDepartmentModal"
import { LoadingModal } from "src/components/shared/loadingModal"

import { Department } from "src/types/department"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { useGetDepartmentList, useSoftDeleteDepartments } from "src/queries/department"
import { usePushAlerts } from "src/hooks/alerts"

const fields: FieldDefinition<Department>[] = [
  {
    attribute: "id",
    label: "admin.departmentlist.no",
    width: 120,
  },
  {
    attribute: "group_name",
    label: "admin.departmentlist.group_name",
  },
  {
    attribute: "memberNumber",
    label: "admin.departmentlist.number_of_people",
    widget: ({ value }) => (
      <Typography.Action
        sx={{
          color: "text.primary",
          fontWeight: 400,
          lineHeight: "20px",
        }}
      >
        {value}名
      </Typography.Action>
    ),
  },
]

export const DepartmentList: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const session = useAdminSession()
  const queryClient = useQueryClient()
  const pushAlerts = usePushAlerts()
  const [importModalOpen, setImportModalOpen] = useState<boolean>(false)
  const [removeModalOpen, setRemoveModalOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  const {
    data: departmentList,
    isLoading,
    error,
  } = useGetDepartmentList(10, page, session?.value.readAdminAccessToken || "")

  const { mutate: softDeleteDepartments, isLoading: isDeleting } = useSoftDeleteDepartments({
    onSuccess: () => {
      queryClient.invalidateQueries(["getDepartmentList"])
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
      pushAlerts({ message: err.message, color: "error" })
    },
  })

  const onDeleteDepartments = () => {
    setRemoveModalOpen(false)
    softDeleteDepartments({
      departmentIds: [1],
      token: session?.value.writeAdminAccessToken || "",
    })
  }

  useEffect(() => {
    !session?.value.id && navigate(`/admin/signin?redirect=${location.pathname}`)
  }, [session, location, navigate])

  return (
    <PageContainer
      title={t("admin.departmentlist.department_management")}
      toolbar={
        <Box sx={{ display: "flex", justifyContent: "flex-end", pr: "7.5rem" }}>
          <Button
            variant="contained"
            sx={{
              p: "0.375rem 1.25rem",
              borderRadius: 0,
              height: "2rem",
              bgcolor: "text.secondary",
              color: "background.default",
              mr: 2,
            }}
            onClick={() => setImportModalOpen(true)}
          >
            <Typography.Description sx={{ fontWeight: 600, lineHeight: "1.25rem" }}>
              {t("admin.departmentlist.capture")}
            </Typography.Description>
          </Button>
          <Button
            variant="contained"
            sx={{
              p: "0.375rem 1.25rem",
              borderRadius: 0,
              height: "2rem",
              bgcolor: "text.secondary",
              color: "background.default",
            }}
            onClick={() => setRemoveModalOpen(true)}
          >
            <Typography.Description sx={{ fontWeight: 600, lineHeight: "1.25rem" }}>
              {t("admin.departmentlist.stock_taking")}
            </Typography.Description>
          </Button>
        </Box>
      }
    >
      <Box pr={15}>
        <AdvancedTable<Department>
          content={departmentList?.data.departments || []}
          fields={fields}
          pagination={{ count: 10, currentPage: page }}
          onRowClick={(row: Department) => {
            navigate(`/admin/product/${row.id}`)
          }}
          isLoading={isLoading}
          onPageNumChange={(value: number) => setPage(value)}
          error={error?.message}
        />
      </Box>
      <ImportDepartmentModal open={importModalOpen} handleOpen={setImportModalOpen} />
      <RemoveDepartmentModal
        open={removeModalOpen}
        handleOpen={setRemoveModalOpen}
        count={2}
        onConfirm={onDeleteDepartments}
      />
      <LoadingModal open={isDeleting} />
    </PageContainer>
  )
}
