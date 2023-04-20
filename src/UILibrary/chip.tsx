import React from "react"

import { Chip as MuiChip, ChipProps } from "@mui/material"
import { Image } from "./image"
import ChipDeleteIcon from "src/assets/icons/chipDelete.svg"

export const Chip: React.FC<ChipProps> = ({ sx, ...rest }) => {
  return (
    <MuiChip
      variant="filled"
      deleteIcon={<Image src={ChipDeleteIcon} />}
      sx={{
        bgcolor: "info.dark",
        borderRadius: "40px",
        height: "28px",
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: "1.25rem",
        color: "text.secondary",
        pl: 0.5,
        "& .MuiChip-deleteIcon": {
          fontSize: "1.25rem",
          mr: "0.625rem",
        },
        ...sx,
      }}
      {...rest}
    />
  )
}
