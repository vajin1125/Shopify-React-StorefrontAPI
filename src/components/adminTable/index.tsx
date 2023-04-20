import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import {
  Box,
  Checkbox,
  IconButton,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MoreVertIcon,
  Typography,
  Pagination,
  CircularProgress,
} from "src/UILibrary"

export interface FieldDefinition<T> {
  attribute: string
  label: string
  width?: number
  widget?: React.FC<{ value?: any; row?: T }>
}

function getProperty(obj: any, field: string): any {
  let value = obj
  let attrs = field.split(".")
  let f = attrs.shift()
  while (value && f) {
    value = value[f]
    f = attrs.shift()
  }
  return value
}

interface AdvancedTableParams<T> {
  content: T[]
  fields: FieldDefinition<T>[]
  pagination?: {
    count: number
    currentPage: number
  }
  // eslint-disable-next-line no-unused-vars
  onRowClick?: (row: T) => void
  editable?: boolean
  // eslint-disable-next-line no-unused-vars
  onEdit?: (row: T) => void
  // eslint-disable-next-line no-unused-vars
  onRemove?: (row: T) => void
  // eslint-disable-next-line no-unused-vars
  onPageNumChange?: (value: number) => void
  isLoading?: boolean
  error?: string
}

export const AdvancedTable = <T extends Record<string, any>>({
  content,
  fields,
  pagination,
  onRowClick,
  editable,
  onEdit,
  onRemove,
  onPageNumChange,
  isLoading = false,
  error,
}: AdvancedTableParams<T>) => {
  const { t } = useTranslation()
  const [selectedRow, setSelectedRow] = useState<T>()
  const handleCheckboxClick = (event: any) => {
    event.stopPropagation()
  }
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (row: T) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setSelectedRow(row)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    onEdit && selectedRow && onEdit(selectedRow)
    setAnchorEl(null)
  }

  const handleDelete = () => {
    onRemove && selectedRow && onRemove(selectedRow)
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  return (
    <TableContainer sx={{ minHeight: "600px", mr: "-6rem", width: "auto", pb: "1.875rem" }}>
      <Table size="small" sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow
            sx={{
              "&>th": {
                color: "black",
                fontWeight: 600,
                fontSize: "0.75rem",
                lineHeight: "1.25rem",
                letterSpacing: "2px",
                borderWidth: 0,
                "&:not(:first-of-type):not(:last-of-type)": {
                  bgcolor: "info.dark",
                  p: "0.5rem",
                  borderWidth: "0 2px 0 0",
                  borderStyle: "solid",
                  borderColor: "info.light",
                },
              },
              minWidth: "700",
              overflow: "scroll",
            }}
          >
            <TableCell sx={{ width: "24px", p: 0 }}>
              <Checkbox sx={{ p: 0, "& .MuiSvgIcon-root": { fontSize: "1rem" } }} />
            </TableCell>
            {fields.map((field) => (
              <TableCell key={field.label} sx={{ width: field.width }}>
                {t(field.label)}
              </TableCell>
            ))}
            <TableCell sx={{ width: "4rem", bgcolor: "transparent" }}></TableCell>
          </TableRow>
        </TableHead>
        {!error && !isLoading && (
          <TableBody>
            {content.map((row) => (
              <TableRow
                key={row?.id}
                onClick={() => {
                  onRowClick ? onRowClick(row) : undefined
                }}
                sx={{
                  cursor: "pointer",
                  "&>td": {
                    borderWidth: 0,
                    "&:not(:first-of-type):not(:last-of-type)": {
                      p: "0.5rem",
                      borderWidth: "0 2px 2px 0",
                      borderStyle: "solid",
                      borderColor: "info.light",
                      borderRightWidth: "2px",
                      borderLeftWidth: "2px",
                    },
                  },
                }}
              >
                <TableCell sx={{ p: 0 }}>
                  <Checkbox
                    sx={{ p: 0, "& .MuiSvgIcon-root": { fontSize: "1rem" } }}
                    onClick={handleCheckboxClick}
                  />
                </TableCell>
                {fields.map((f) => (
                  <TableCell
                    key={`cell-${f.attribute}`}
                    sx={{
                      backgroundColor: "background.default",
                      width: f.width,
                    }}
                  >
                    {f.widget ? (
                      f.widget({ value: getProperty(row, f.attribute), row: row })
                    ) : (
                      <Typography.Action
                        sx={{
                          color: "text.primary",
                          fontWeight: 400,
                          lineHeight: "20px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {getProperty(row, f.attribute)}
                      </Typography.Action>
                    )}
                  </TableCell>
                ))}
                <TableCell onClick={(e: any) => e.stopPropagation()}>
                  {editable && (
                    <IconButton
                      sx={{ p: 0, display: "flex", alignItems: "center" }}
                      onClick={handleClick(row)}
                    >
                      <MoreVertIcon sx={{ fontSize: "14px" }} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "left",
              }}
              PaperProps={{
                sx: {
                  boxShadow: "none",
                },
              }}
            >
              <Box sx={{ bgcolor: "info.dark", px: 2, py: 0.5 }}>
                <Typography.Action
                  sx={{
                    fontWeight: 400,
                    lineHeight: "20px",
                    mb: 0.5,
                    "&:hover": {
                      color: "primary.main",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleEdit()}
                >
                  {t("admin.share.edit")}
                </Typography.Action>
                <Typography.Action
                  sx={{
                    fontWeight: 400,
                    lineHeight: "20px",
                    "&:hover": {
                      color: "primary.main",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleDelete()}
                >
                  {t("admin.share.delete")}
                </Typography.Action>
              </Box>
            </Popover>
          </TableBody>
        )}
      </Table>
      {!!error && (
        <Typography.Description color="error" sx={{ textAlign: "center", py: 3 }}>
          {error}
        </Typography.Description>
      )}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress color="primary" />
        </Box>
      )}
      {pagination && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "0.375rem" }}>
          <Pagination
            count={pagination.count}
            page={pagination.currentPage}
            color="primary"
            onChange={(_, value) => !!onPageNumChange && onPageNumChange(value)}
          />
        </Box>
      )}
    </TableContainer>
  )
}
