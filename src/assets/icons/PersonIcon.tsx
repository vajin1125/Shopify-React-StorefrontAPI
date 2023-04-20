import React from "react"

import { Box } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const PersonIcon: React.FC<IconProps> = ({ sx, width, height }: IconProps) => {
  const color = "#909090"
  return (
    <Box sx={{ ...sx }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 23 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_615_3315)">
          <path
            d="M11.5005 1C8.74365 1 6.5 3.33749 6.5 6.21091V6.78806C6.5 9.66148 8.74365 12 11.5005 12C14.2573 12 16.5 9.66148 16.5 6.78806V6.21091C16.5 3.33749 14.2573 1 11.5005 1ZM11.5005 10.6602C9.45263 10.6602 7.78547 8.92251 7.78547 6.78806V6.21091C7.78547 4.07645 9.45263 2.33983 11.5005 2.33983C13.5484 2.33983 15.2145 4.07645 15.2145 6.21091V6.78806C15.2145 8.92251 13.5484 10.6602 11.5005 10.6602Z"
            fill={color}
          />
          <path
            d="M15.9425 13H8.05745C4.44202 13 1.5 15.8299 1.5 19.3087V24H22.5V19.3087C22.5 15.8299 19.558 13 15.9425 13ZM8.05745 14.2629H15.9425C18.8341 14.2629 21.1875 16.5265 21.1875 19.3087V22.7371H2.8125V19.3087C2.8125 16.5265 5.16591 14.2629 8.05745 14.2629Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_615_3315">
            <rect width="22" height="24" fill="white" transform="translate(0.5 0.5)" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  )
}
