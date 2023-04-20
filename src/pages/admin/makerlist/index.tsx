import React, { ChangeEvent, useState, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { Box, Button, Grid, InputAdornment } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import debounce from "lodash/debounce"

import { PageContainer } from "src/components/adminPageContainer"
import { AdvancedTable, FieldDefinition } from "src/components/adminTable"
import { Maker } from "src/types/maker"
import { TextField, Typography } from "src/UILibrary"
import { SearchIcon } from "src/assets/icons/SearchIcon"
import { EditMakerModal } from "./components/editMakerModal"
import { RemoveMakerModal } from "./components/removeMakerModal"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { useGetMakerList, useSoftDeleteMaker } from "src/queries/maker"
import { LoadingModal } from "src/components/shared/loadingModal"
import { usePushAlerts } from "src/hooks/alerts"
import { PAGE_SIZE } from "src/constants/common"

const fields: FieldDefinition<Maker>[] = [
  {
    attribute: "id",
    label: "admin.makerlist.ID",
    width: 120,
  },
  {
    attribute: "name",
    label: "admin.makerlist.maker_name",
  },
  {
    attribute: "representativeName",
    label: "admin.makerlist.representative_name",
  },
  {
    attribute: "representativeEmail",
    label: "admin.makerlist.email_address_of_representative",
  },
  {
    attribute: "accountingDepartmentEmail",
    label: "admin.makerlist.email_address_of_order_recipient",
  },
]

export const MakerList = () => {
  const { t } = useTranslation()
  const session = useAdminSession()
  const queryClient = useQueryClient()
  const pushAlerts = usePushAlerts()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchKeyword = searchParams.get("keyword") || ""
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false)
  const [removeModalOpen, setRemoveModalOpen] = useState<boolean>(false)
  const [maker, setMaker] = useState<Maker>()
  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>(searchKeyword)
  const [totalPages, setTotalPages] = useState<number>(1)
  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearchParams({ keyword: val }, { replace: true })
        setTotalPages(1)
        setPage(1)
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const {
    data: makerList,
    isLoading,
    error,
  } = useGetMakerList(PAGE_SIZE, page, searchKeyword, session?.value.readAdminAccessToken || "")

  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if ((value.match(/ /g) || []).length <= 2) {
      setKeyword(value)
      debouncedSearch(value)
    } else {
      pushAlerts({ message: t("admin.makerlist.too_many_spaces_in_keyword"), color: "error" })
    }
  }

  const { mutate: softDeleteMaker, isLoading: isDeleting } = useSoftDeleteMaker({
    onSuccess: () => {
      queryClient.invalidateQueries(["getMakerList"])
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
      pushAlerts({ message: err.message, color: "error" })
    },
  })

  const onDeleteMaker = () => {
    setRemoveModalOpen(false)
    softDeleteMaker({
      id: maker?.id,
      token: session?.value.writeAdminAccessToken || "",
    })
  }

  const handleAddModalOpen = () => {
    setMaker(undefined)
    setAddModalOpen(true)
  }

  const handleEdit = (row: Maker) => {
    setMaker(row)
    setAddModalOpen(true)
  }

  const handleRemove = (row: Maker) => {
    setMaker(row)
    setRemoveModalOpen(true)
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (makerList) {
      setTotalPages(Math.ceil(makerList.data.totalMakerNumber / PAGE_SIZE))
    }
  }, [makerList])

  return (
    <PageContainer title={t("admin.makerlist.maker_list")}>
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
                {t("admin.makerlist.add_maker")}
              </Typography.Description>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box pr={15}>
        <AdvancedTable<Maker>
          content={makerList?.data.makers || []}
          fields={fields}
          pagination={{
            count: totalPages,
            currentPage: page,
          }}
          isLoading={isLoading}
          onPageNumChange={setPage}
          error={error?.message}
          editable
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      </Box>
      <EditMakerModal open={addModalOpen} handleOpen={setAddModalOpen} maker={maker} />
      <RemoveMakerModal
        open={removeModalOpen}
        handleOpen={setRemoveModalOpen}
        maker={maker}
        onConfirm={onDeleteMaker}
      />
      <LoadingModal open={isDeleting} />
    </PageContainer>
  )
}
