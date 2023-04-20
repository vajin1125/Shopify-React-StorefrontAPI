import React from "react"

import { Box } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const BagIcon: React.FC<IconProps> = ({ sx, width, height }: IconProps) => {
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
          d="M6.2 4.36914H1.8C1.58783 4.36914 1.38434 4.45786 1.23431 4.61578C1.08429 4.7737 1 4.98788 1 5.21122V16.1582C1 16.3815 1.08429 16.5957 1.23431 16.7536C1.38434 16.9116 1.58783 17.0003 1.8 17.0003H17"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.8001 4.36914H8.6001"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 14.474V5.21122C17 4.98788 16.9157 4.7737 16.7656 4.61578C16.6156 4.45786 16.4121 4.36914 16.2 4.36914H14.2"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.8 6.05245V1.84208C11.8 1.61874 11.7157 1.40456 11.5656 1.24664C11.4156 1.08872 11.2121 1 11 1H6.99995C6.78778 1 6.5843 1.08872 6.43427 1.24664C6.28424 1.40456 6.19995 1.61874 6.19995 1.84208V6.05245"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  )
}
