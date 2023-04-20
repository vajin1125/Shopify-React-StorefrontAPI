import React from "react"

import { Box } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const MinusIcon: React.FC<IconProps> = ({ sx, width, height, color }: IconProps) => {
  return (
    <Box sx={{ ...sx }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H8V2H0V0Z" fill={color || "white"} />
      </svg>
    </Box>
  )
}
