import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { PageContainer as AdminPageContainer } from "src/components/adminPageContainer"
import { Box, Table, TableBody, Pagination, Typography } from "src/UILibrary"
import { PurchaseHistoryRow } from "../userDetail/components/purchaseHistoryRow"
import { useAdminSession } from "src/modules/adminSessionProvider"
import { useGetDepositHistoryList } from "src/queries/depositHistory"
import { formatDate } from "src/modules/date"
import { PAGE_SIZE } from "src/constants/common"

export const DepositHistory = () => {
  const { t } = useTranslation()
  const session = useAdminSession()
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(0)
  const { data: depositHistories } = useGetDepositHistoryList(
    PAGE_SIZE,
    page,
    session?.value.readAdminAccessToken || ""
  )
  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  useEffect(() => {
    if (depositHistories) {
      const count = Math.ceil(depositHistories.data.totalHistoryNumber / PAGE_SIZE)
      setPageCount(count)
    }
  }, [depositHistories])
  return (
    <AdminPageContainer
      title={t("admin.deposithistory.deposit")}
      toolbar={
        <Typography.Title sx={{ lineHeight: "1.25rem", color: "text.secondary" }}>
          {t("admin.deposithistory.history")}
        </Typography.Title>
      }
    >
      <Box sx={{ pt: 0, px: 3.5, pb: 5, bgcolor: "background.default" }}>
        <Table>
          <TableBody>
            {depositHistories?.data.depositHistories.map((depositHistory) => {
              return (
                <PurchaseHistoryRow
                  key={`purchage-history-${depositHistory.id}`}
                  time={formatDate(depositHistory.date, "yyyy/mm/dd hh:mm")}
                  log={`${t("admin.deposithistory.log", {
                    paymentGateway: depositHistory.paymentGateway,
                    amount: depositHistory.amount,
                  })}`}
                />
              )
            })}
          </TableBody>
        </Table>
        {pageCount > 1 && (
          <Box sx={{ display: "flex", mt: 4, justifyContent: "center" }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePaginationChange}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </AdminPageContainer>
  )
}
