import React from "react"

import { Box } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const RightArrowIcon: React.FC<IconProps> = ({ sx, width, height, color }: IconProps) => {
  return (
    <Box sx={{ ...sx }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 24 22`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.5153 10.0517L10.7233 0.817211C10.3628 0.584007 9.89728 0.593148 9.54628 0.84046C9.19575 1.08782 9.02962 1.5223 9.12778 1.94038L10.1839 6.46222H1.52067C0.681422 6.4618 0.00046875 7.14271 0.00046875 7.98247L0 14.0173C0.00046875 14.8575 0.681422 15.538 1.52067 15.538H10.1842L9.12727 20.0594C9.02958 20.477 9.19523 20.9124 9.54623 21.1593C9.89723 21.4062 10.3627 21.4158 10.7233 21.183L23.5153 11.948C23.8197 11.728 24 11.3752 24 10.9996C24 10.624 23.8198 10.2712 23.5153 10.0517Z"
          fill={color || "#E8244D"}
        />
      </svg>
    </Box>
  )
}
