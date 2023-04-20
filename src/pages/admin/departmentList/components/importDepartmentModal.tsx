import React from "react"
import { useTranslation } from "react-i18next"
import { Box, Grid, Button, FormControlLabel, Checkbox } from "@mui/material"

import { Modal } from "src/components/modal"
import { TreeItem, TreeView } from "@mui/lab"
import { Typography } from "src/UILibrary"

export const ImportDepartmentModal = ({
  open,
  handleOpen,
}: {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleOpen: (open: boolean) => void
}) => {
  const { t } = useTranslation()
  const handleClose = () => {
    handleOpen(false)
  }

  const nodes = [
    {
      label: "admin.departmentlist.headquarters",
      value: "1",
      children: [
        { label: "admin.departmentlist.incumbent_member", value: "2" },
        {
          label: "admin.departmentlist.student",
          value: "3",
          children: [
            { label: "admin.departmentlist.incumbent_member", value: "7" },
            { label: "admin.departmentlist.incumbent_member", value: "8" },
            { label: "admin.departmentlist.incumbent_member", value: "9" },
          ],
        },
        { label: "admin.departmentlist.clerical_section", value: "4" },
        { label: "admin.departmentlist.academic_affairs_section", value: "5" },
        { label: "admin.departmentlist.system_division", value: "6" },
      ],
    },
  ]

  const renderTree = (nodes: Record<string, any>[]) => {
    return (
      <>
        {nodes.map((node: Record<string, any>) => (
          <TreeItem
            key={node.value}
            nodeId={node.value}
            label={
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: 0, mx: "0.375rem", "& .MuiSvgIcon-root": { fontSize: "0.875rem" } }}
                  />
                }
                label={
                  <Typography.SubTitle sx={{ lineHeight: "1.25rem", fontWeight: 400 }}>
                    {t(node.label)}
                  </Typography.SubTitle>
                }
              />
            }
          >
            {renderTree(node.children || [])}
          </TreeItem>
        ))}
      </>
    )
  }

  return (
    <Modal
      handleClose={handleClose}
      open={open}
      title="admin.productdetail.detailed_settings_for_what_to_sell"
    >
      <Grid container sx={{ justifyContent: "center", minHeight: "350px", py: "2rem" }}>
        <TreeView defaultExpanded={["1"]}>{renderTree(nodes)}</TreeView>
      </Grid>
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
          {t("admin.share.cancel")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "150px",
            height: "44px",
            color: "background.default",
            borderRadius: 0,
          }}
          onClick={handleClose}
        >
          {t("admin.share.setting")}
        </Button>
      </Box>
    </Modal>
  )
}
