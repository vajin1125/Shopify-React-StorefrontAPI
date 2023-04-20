import React from "react"

import { Box } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const CreditCardIcon: React.FC<IconProps> = ({ sx, width, height, color }: IconProps) => {
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
          d="M53.431 2H6.56895C4.04559 2 2 4.11053 2 6.714V37.286C2 39.8895 4.04559 42 6.56895 42H53.431C55.9544 42 58 39.8895 58 37.286V6.714C58 4.11053 55.9544 2 53.431 2Z"
          stroke={color || "#E8244D"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 13.1113H49.3846"
          stroke={color || "#E8244D"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6155 30.8887H19.2309"
          stroke={color || "#E8244D"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27.8462 30.8887H36.4616"
          stroke={color || "#E8244D"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  )
}
