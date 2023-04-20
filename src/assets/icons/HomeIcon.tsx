import React from "react"

import { Box } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const HomeIcon: React.FC<IconProps> = ({ sx, width, height, color }: IconProps) => {
  return (
    <Box sx={{ ...sx }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_567_6742)">
          <path
            d="M22.4989 24.1931L22.4916 10.3942V10.2597L22.3893 10.1689L15.1603 3.7573L11.7014 0.690646L11.4873 0.5L11.2733 0.690646L5.93831 5.43641L0.602288 10.1812L0.5 10.2729V10.4075L0.517925 24.1829V24.4888H8.91952V18.2505H14.0784L14.0879 24.187L14.0889 24.4918L14.4042 24.4929L22.1826 24.5H22.5L22.4989 24.1931ZM7.5486 17.5878V23.1624H1.87724V10.8489L11.4989 2.29636L21.1206 10.8489V23.1624H15.4493V17.5878C15.4493 17.2218 15.1414 16.9251 14.7638 16.9251H8.23406C7.85653 16.9251 7.5486 17.2218 7.5486 17.5878Z"
            fill={color || "#E8244D"}
          />
        </g>
        <defs>
          <clipPath id="clip0_567_6742">
            <rect
              width={parseInt(width) - 1}
              height={parseInt(height) - 1}
              fill="white"
              transform="translate(0.5 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  )
}
