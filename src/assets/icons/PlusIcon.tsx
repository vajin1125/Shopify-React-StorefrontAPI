import React from "react"

import { Box } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const PlusIcon: React.FC<IconProps> = ({ sx, width, height, color }: IconProps) => {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.99998 3V0H2.99998V3H0V5H2.99998V8H4.99998V5H8V3H4.99998Z"
          fill={color || "white"}
        />
      </svg>
    </Box>
  )
}
