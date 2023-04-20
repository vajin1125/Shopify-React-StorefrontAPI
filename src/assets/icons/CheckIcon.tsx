import React from "react"

import { Box } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const CheckIcon: React.FC<IconProps> = ({ sx, width, height, color }: IconProps) => {
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
          d="M9.16801 0C6.5252 1.36361 3.84988 5.24259 3.84988 5.24259L1.43572 2.69712L0 3.96982L3.49086 8L4.76332 7.95458C6.3948 3.40889 10 0.363651 10 0.363651L9.16801 0Z"
          fill={color || "#909090"}
        />
      </svg>
    </Box>
  )
}
