import React from "react"
import { Box, Button } from "@mui/material"

import { MinusIcon } from "src/assets/icons/MinusIcon"
import { PlusIcon } from "src/assets/icons/PlusIcon"
import { TextField } from "src/UILibrary/textfield"
import { Typography } from "src/UILibrary/typography"
import { useTranslation } from "react-i18next"

interface CounterProps {
  count: number
  setCount: Function
  totalCount: number
}

export const Counter: React.FC<CounterProps> = ({ count, setCount, totalCount }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography.Description sx={{ mr: 2 }}>
        {t("productDetail.number_of_copies")}
      </Typography.Description>
      <TextField
        variant="outlined"
        type="number"
        value={count}
        sx={{
          minWidth: "50px",
          height: "26px",
          width: "50px",
          color: "text.primary",
          borderWidth: "2px",
          borderColor: "divider",
          mr: 1,
        }}
        InputProps={{
          sx: {
            height: "26px",
            "& input": { py: 0.25, px: 0.5, textAlign: "center" },
          },
        }}
        onChange={(e) => {
          const value = parseInt(e.target.value)
          value > 0 ? (value < totalCount ? setCount(value) : setCount(totalCount)) : setCount(0)
        }}
      />
      <Box sx={{ width: "50px", height: "24px", display: "flex", gap: "2px" }}>
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
          onClick={() => (count > 0 ? setCount(count - 1) : setCount(0))}
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
          onClick={() => (count < totalCount ? setCount(count + 1) : setCount(totalCount))}
        >
          <PlusIcon width="8" height="8" />
        </Button>
      </Box>
    </Box>
  )
}
