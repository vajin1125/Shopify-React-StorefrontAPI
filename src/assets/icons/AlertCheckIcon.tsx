import React from "react"

import { Box } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const AlertCheckIcon: React.FC<IconProps> = ({ sx, width, height, color }: IconProps) => {
  return (
    <Box sx={{ ...sx }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.336 0C13.0504 3.06813 7.69977 11.7958 7.69977 11.7958L2.87145 6.06851L0 8.93208L6.98172 18L9.52664 17.8978C12.7896 7.67001 20 0.818215 20 0.818215L18.336 0Z"
          fill={color || "white"}
        />
      </svg>
    </Box>
  )
}
