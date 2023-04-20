import React from "react"
import { TableCell, TableRow } from "@mui/material"

import { Typography } from "src/UILibrary/typography"

export const PurchaseHistoryRow = ({ time, log }: { time: string; log: string }) => {
  return (
    <TableRow
      sx={{
        borderBottom: "2px solid",
        borderBottomColor: "info.light",
        "& td": { pb: 1.25, pt: 3 },
      }}
    >
      <TableCell sx={{ pl: 3 }} width="130">
        <Typography.SubTitle sx={{ lineHeight: "1.25rem", fontWeight: 400 }}>
          {time}
        </Typography.SubTitle>
      </TableCell>
      <TableCell sx={{ pl: 3 }}>
        <Typography.SubTitle sx={{ lineHeight: "1.25rem", fontWeight: 400 }}>
          {log}
        </Typography.SubTitle>
      </TableCell>
    </TableRow>
  )
}
