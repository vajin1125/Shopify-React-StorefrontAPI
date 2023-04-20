import React from "react"
import { Box, Table, TableBody } from "@mui/material"
import { useTranslation } from "react-i18next"

import { Typography } from "src/UILibrary/typography"
import { PageContainer as AdminPageContainer } from "src/components/adminPageContainer"
import { BasicInfoRow } from "./components/basicInfoRow"
import { PurchaseHistoryRow } from "./components/purchaseHistoryRow"
import { Pagination } from "src/UILibrary/pagination"

export const UserDetail = () => {
  const { t } = useTranslation()
  return (
    <AdminPageContainer
      title={t("admin.userlist.user_management")}
      toolbar={
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography.Title sx={{ lineHeight: "1.5rem", color: "text.secondary" }}>
            {t("admin.userdetail.user_details")}
          </Typography.Title>
          <Typography.Description sx={{ color: "primary.main" }}>
            {t("admin.userdetail.back_to_userlist")}
          </Typography.Description>
        </Box>
      }
    >
      <Box>
        <Typography.Title
          sx={{
            lineHeight: "1.125rem",
            fontWeight: 400,
            p: "1.375rem 1.875rem",
            bgcolor: "info.dark",
          }}
        >
          {t("admin.userdetail.basic_information")}
        </Typography.Title>
        <Box sx={{ pt: 3, px: 3.5, pb: 5, bgcolor: "background.default" }}>
          <Table>
            <TableBody>
              <BasicInfoRow label={t("admin.userdetail.full_name")} value="吉田 慎太郎" />
              <BasicInfoRow label={t("admin.userdetail.email_address")} value="XXX@belebel.ac.jp" />
              <BasicInfoRow
                label={t("admin.userdetail.school_building")}
                value={t("admin.userdetail.kumamoto_school")}
              />
              <BasicInfoRow
                label={`${t("admin.userdetail.subject")}/${t("admin.userdetail.school_year")}`}
                value="美容科 / 1年"
              />
              <BasicInfoRow label={t("admin.userdetail.student_number")} value="11122223" />
              <BasicInfoRow
                label={t("admin.userdetail.line_linkage")}
                value={t("admin.userdetail.yes")}
              />
            </TableBody>
          </Table>
        </Box>
      </Box>
      <Box>
        <Typography.Title
          sx={{
            lineHeight: "1.125rem",
            fontWeight: 400,
            p: "1.375rem 1.875rem",
            bgcolor: "info.dark",
          }}
        >
          {t("admin.userdetail.past_purchase_history")}
        </Typography.Title>
        <Box sx={{ pt: 0, px: 3.5, pb: 5, bgcolor: "background.default" }}>
          <Table>
            <TableBody>
              <PurchaseHistoryRow
                time="2022/10/31 11:41"
                log="商品AAAをクレジット払いで10,000円購入しました。"
              />
              <PurchaseHistoryRow
                time="2022/10/31 11:41"
                log="商品AAAをクレジット払いで10,000円購入しました。"
              />
              <PurchaseHistoryRow
                time="2022/10/31 11:41"
                log="商品AAAをクレジット払いで10,000円購入しました。"
              />
              <PurchaseHistoryRow
                time="2022/10/31 11:41"
                log="商品AAAをクレジット払いで10,000円購入しました。"
              />
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", mt: 4, justifyContent: "flex-end" }}>
            <Pagination count={10} page={1} color="primary" />
          </Box>
        </Box>
      </Box>
    </AdminPageContainer>
  )
}
