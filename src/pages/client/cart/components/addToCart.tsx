import React, { useState, useEffect } from "react"
import { Box, Button } from "@mui/material"
import { useTranslation } from "react-i18next"

import { RoundButton } from "src/components/client/roundButton"
import { TextField } from "src/UILibrary/textfield"

import { MinusIcon } from "src/assets/icons/MinusIcon"
import { PlusIcon } from "src/assets/icons/PlusIcon"

interface AddToCartProps {
  id: string
  count: number
  totalCount: number
  onUpdateCartLines: Function
  onRemoveCartLines: Function
}

export const AddToCart: React.FC<AddToCartProps> = ({
  id,
  count,
  totalCount,
  onUpdateCartLines,
  onRemoveCartLines,
}) => {
  const { t } = useTranslation()
  const [value, setValue] = useState<number>(count)

  useEffect(() => setValue(count), [count])

  return (
    <Box sx={{ display: "flex", gap: { xs: 1, md: 2 }, alignItems: "center" }}>
      <TextField
        variant="outlined"
        type="number"
        value={value}
        sx={{
          flexShrink: 0,
          minWidth: "50px",
          height: "26px",
          width: "50px",
          color: "text.primary",
          borderWidth: "2px",
          borderColor: "divider",
        }}
        InputProps={{
          sx: {
            height: "26px",
            "& input": { py: 0.25, px: 0.5 },
          },
        }}
        onChange={(e) => {
          const newValue = parseInt(e.target.value)
          newValue > 0
            ? newValue < totalCount
              ? setValue(newValue)
              : setValue(totalCount)
            : setValue(0)
        }}
      />
      <Box
        sx={{
          flexShrink: 0,
          width: "50px",
          height: "24px",
          display: "flex",
          gap: "2px",
        }}
      >
        <Button
          disableElevation
          variant="contained"
          sx={{
            bgcolor: "divider",
            minWidth: "24px",
            px: "0.75rem",
            pb: 1.5,
            pt: 0,
            fontWeight: 600,
            fontSize: "1.25rem",
            color: "background.default",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          onClick={() => (value > 0 ? setValue(value - 1) : setValue(0))}
        >
          <MinusIcon width="8" height="2" />
        </Button>
        <Button
          disableElevation
          variant="contained"
          sx={{
            bgcolor: "divider",
            minWidth: "24px",
            px: "0.75rem",
            pb: 1,
            pt: 0,
            fontWeight: 600,
            fontSize: "1.25rem",
            color: "background.default",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          onClick={() => (value < totalCount ? setValue(value + 1) : setValue(totalCount))}
        >
          <PlusIcon width="8" height="8" />
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {value !== count && (
          <RoundButton
            variant="contained"
            disableElevation
            sx={{
              maxWidth: "180px",
              bgcolor: "primary.main",
              height: "24px",
              color: "background.default",
              fontSize: "0.75rem",
              fontWeight: 600,
              mb: 1,
            }}
            onClick={() => onUpdateCartLines(id, value)}
          >
            {t("mypage.save")}
          </RoundButton>
        )}
        <RoundButton
          variant="contained"
          disableElevation
          sx={{
            maxWidth: "180px",
            bgcolor: "info.dark",
            height: "24px",
            color: "#000",
            fontSize: "0.75rem",
            fontWeight: 600,
            "&:hover": {
              color: "background.default",
            },
          }}
          onClick={() => onRemoveCartLines(id)}
        >
          {t("cart.delete")}
        </RoundButton>
      </Box>
    </Box>
  )
}
