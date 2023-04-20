import React from "react"

import { Box } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const CycleArrowIcon: React.FC<IconProps> = ({ sx, width, height }: IconProps) => {
  const color = "#909090"
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
          d="M14.4902 1L17 3.57142L14.4902 6.14285"
          stroke={color}
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M1.88892 3.57227H16.1111"
          stroke={color}
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M3.5098 13.0003L1 10.4288L3.5098 7.85742"
          stroke={color}
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M16.1111 10.4277H1.88892"
          stroke={color}
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  )
}
