import React from "react"
import { Box, Dialog, IconButton } from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"

import { CreditCardForm } from "../../creditCardForm/components/creditCardForm"
import { ICard } from "src/types/paymentMethod"

interface EditCreditCardDialogProps {
  open: boolean
  setOpen: Function
  creditCard?: ICard
}

export const EditCreditCardDialog: React.FC<EditCreditCardDialogProps> = ({
  open,
  setOpen,
  creditCard,
}) => {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ bgcolor: "background.paper", display: "flex", justifyContent: "flex-end", px: 1 }}>
        <IconButton size="small" onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <CreditCardForm creditCard={creditCard} setOpen={setOpen} editMode={true} />
    </Dialog>
  )
}
