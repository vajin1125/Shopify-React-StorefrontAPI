import React, { useEffect, useState } from "react"
import { ExpandMoreIcon } from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"

import { PageContainer } from "src/components/adminPageContainer"
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "src/UILibrary"
import { AdvancedTable } from "src/components/adminTable"
import { SearchBox } from "./components/searchBox"

import { useGetUserList } from "src/queries/user"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { PAGE_SIZE } from "src/constants/common"
import { ADMIN_USER_LIST_FIELDS } from "src/constants/fields"
import { ICustomer, IAdminCustomerListFilters } from "src/types/user"
import { getOptimizedAdminCustomerListFilters } from "src/modules/filters"

export const UserList: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const session = useAdminSession()
  const [searchParams, setSearchParams] = useSearchParams()
  const department = searchParams.get("department") || "all"
  const school = searchParams.get("school") || "all"
  const grade = parseInt(searchParams.get("grade") || "0") || 0
  const classroom = parseInt(searchParams.get("classroom") || "0") || 0
  const fullName = searchParams.get("fullName") || ""
  const entranceYear = searchParams.get("entranceYear") || "all"
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(1)

  const {
    data: userList,
    isLoading,
    error,
  } = useGetUserList(
    PAGE_SIZE,
    page,
    getOptimizedAdminCustomerListFilters({
      department,
      school,
      grade,
      classroom,
      fullName,
      entranceYear,
    }),
    session?.value.readAdminAccessToken || ""
  )

  const handleFilterChange = (data: IAdminCustomerListFilters) => {
    const newSearchParam = getOptimizedAdminCustomerListFilters(data)
    setSearchParams(
      Object.keys(newSearchParam).reduce(
        (prev, curr) => ({
          ...prev,
          [curr]: newSearchParam[curr as keyof IAdminCustomerListFilters]?.toString(),
        }),
        {}
      ),
      { replace: true }
    )
    setPage(1)
    setPageCount(1)
  }

  useEffect(() => {
    if (userList) {
      const count = Math.ceil(userList.data.totalCustomerNumber / PAGE_SIZE)
      setPageCount(count)
    }
  }, [userList])

  return (
    <PageContainer title={t("admin.userlist.user_management")}>
      <Accordion
        disableGutters
        sx={{
          boxShadow: "none",
          mb: "1.5rem",
          ml: 3,
          bgcolor: "transparent",
          "&.Mui-expanded": { ml: 3 },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "background.default" }} />}
          sx={{
            minHeight: "1.25rem",
            bgcolor: "primary.main",
            p: "0.375rem 1.25rem",
            maxWidth: "218px",
            "& .MuiAccordionSummary-content": {
              m: 0,
            },
            "&.Mui-expanded": {
              pb: 2,
            },
          }}
        >
          <Button sx={{ color: "background.default", p: 0, mr: "0.5rem" }}>
            <Typography.Description
              sx={{ fontWeight: 600, lineHeight: "1.25rem", letterSpacing: "2px" }}
            >
              {t("admin.productlist.set_filter_conditions")}
            </Typography.Description>
          </Button>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: "1rem" }}>
          <SearchBox
            initialData={{ department, school, grade, classroom, fullName, entranceYear }}
            handleFilterChange={handleFilterChange}
          />
        </AccordionDetails>
      </Accordion>
      <AdvancedTable<ICustomer>
        content={userList?.data.customers || []}
        fields={ADMIN_USER_LIST_FIELDS}
        isLoading={isLoading}
        pagination={{ count: pageCount, currentPage: page }}
        onRowClick={(row: ICustomer) => {
          navigate(`/admin/user/${row.id}`)
        }}
        onPageNumChange={(value: number) => setPage(value)}
        error={
          error
            ? error.response?.status === 500
              ? t("auth.server_error")
              : t("auth.unknown_error")
            : ""
        }
      />
    </PageContainer>
  )
}
