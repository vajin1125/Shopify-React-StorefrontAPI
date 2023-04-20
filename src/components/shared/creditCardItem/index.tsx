import React, { useState } from "react"
import { Box, Checkbox, IconButton, Popper, Fade, ClickAwayListener, Paper } from "@mui/material"
import { CheckCircle as CheckCircleIcon, MoreVert as MoreVertIcon } from "@mui/icons-material"
import { useTranslation } from "react-i18next"

import { Image } from "src/UILibrary/image"
import { Typography } from "src/UILibrary/typography"
import { RemoveConfirmDialog } from "./components/removeConfirmDialog"
import { EditCreditCardDialog } from "./components/editCreditCardDialog"

import VisaIcon from "src/assets/imgs/visa.png"
import { ICard } from "src/types/paymentMethod"

interface CreditCardItemProps {
  selected?: boolean
  last4Number: string
  expiredDate: string
  data?: ICard
  canEdit?: boolean
  setDefault: Function
}
export const CreditCardItem: React.FC<CreditCardItemProps> = ({
  last4Number,
  expiredDate,
  data,
  canEdit = false,
  selected = false,
  setDefault,
}) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [removeDialogOpen, setRemoveDialogOpen] = useState<boolean>(false)
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "secondary.main",
          display: "flex",
          gap: 3,
          alignItems: "center",
          pl: 1.25,
          py: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            icon={<CheckCircleIcon />}
            checkedIcon={<CheckCircleIcon />}
            checked={selected}
            onChange={() => setDefault("card", data)}
          />
          <Image
            src={VisaIcon}
            alt="visa"
            sx={{ width: "80px", height: "26px", ml: { sm: 1, md: 2 } }}
          />
        </Box>
        <Typography.SubTitle sx={{ fontWeight: 400, letterSpacing: "2px" }}>
          {`****${last4Number}`}
        </Typography.SubTitle>
        <Typography.SubTitle sx={{ fontWeight: 400, letterSpacing: "2px" }}>
          {expiredDate}
        </Typography.SubTitle>
      </Box>
      {canEdit && (
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
      )}
      {!!anchorEl && (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          {/* @ts-ignore */}
          <Popper
            id="credit-card-popper"
            open={!!anchorEl}
            anchorEl={anchorEl}
            transition
            placement="right"
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <Paper sx={{ width: 120, bgcolor: "background.paper" }}>
                  <Typography.Description
                    sx={{
                      px: 2,
                      py: 1,
                      borderWidth: "0 0 2px 0",
                      borderStyle: "solid",
                      borderColor: "divider",
                      color: "text.primary",
                      cursor: "pointer",
                      "&:hover": {
                        fontWeight: 600,
                      },
                    }}
                    onClick={() => setEditDialogOpen(true)}
                  >
                    {t("admin.share.edit")}
                  </Typography.Description>
                  <Typography.Description
                    sx={{
                      px: 2,
                      py: 1,
                      color: "primary.main",
                      cursor: "pointer",
                      "&:hover": {
                        fontWeight: 600,
                      },
                    }}
                    onClick={() => setRemoveDialogOpen(true)}
                  >
                    {t("admin.share.delete")}
                  </Typography.Description>
                </Paper>
              </Fade>
            )}
          </Popper>
        </ClickAwayListener>
      )}
      <RemoveConfirmDialog
        open={removeDialogOpen}
        setOpen={setRemoveDialogOpen}
        creditCard={data}
      />
      <EditCreditCardDialog creditCard={data} open={editDialogOpen} setOpen={setEditDialogOpen} />
    </Box>
  )
}
