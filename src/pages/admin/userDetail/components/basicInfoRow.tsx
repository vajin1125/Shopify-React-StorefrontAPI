import React from "react"
import { TableCell, TableRow } from "@mui/material"

import { Typography } from "src/UILibrary/typography"

export const BasicInfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <TableRow
      sx={{ borderBottom: "2px solid", borderBottomColor: "info.light", "& td": { py: 1.25 } }}
    >
      <TableCell sx={{ pl: 3 }} width="150">
        <Typography.SubTitle sx={{ lineHeight: "1.25rem", fontWeight: 600 }}>
          {label}
        </Typography.SubTitle>
      </TableCell>
      <TableCell sx={{ pl: 3 }}>
        <Typography.SubTitle sx={{ lineHeight: "1.25rem", fontWeight: 400 }}>
          {value}
        </Typography.SubTitle>
      </TableCell>
    </TableRow>
  )
}
