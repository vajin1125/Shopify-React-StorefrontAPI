import React from "react"

import { Box } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const SettingIcon: React.FC<IconProps> = ({ sx, width, height, color }: IconProps) => {
  const clr = color || "#909090"
  return (
    <Box sx={{ ...sx }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1156_6534)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.70989 15.5H9.29014C9.41232 15.5 9.51534 15.4089 9.53025 15.2877L9.81195 13.0036C9.96275 12.9489 10.1115 12.8872 10.2567 12.8192L12.0711 14.2352C12.1674 14.3104 12.3047 14.302 12.391 14.2155L14.2155 12.391C14.3019 12.3047 14.3104 12.1674 14.2352 12.0711L12.8192 10.2567C12.8872 10.1115 12.9489 9.96275 13.0036 9.81195L15.2877 9.53026C15.4089 9.51534 15.5 9.41232 15.5 9.29014V6.70989C15.5 6.58774 15.4089 6.48473 15.2877 6.46978L13.0036 6.18808C12.9489 6.03721 12.8872 5.88843 12.8192 5.74329L14.2352 3.92888C14.3104 3.83259 14.3019 3.69535 14.2155 3.60895L12.391 1.78444C12.3047 1.6981 12.1674 1.6896 12.0711 1.7648L10.2567 3.1808C10.1115 3.11279 9.96275 3.05113 9.81195 2.99648L9.53025 0.712336C9.51534 0.591065 9.41232 0.5 9.29014 0.5H6.70989C6.58774 0.5 6.48473 0.591065 6.46978 0.712336L6.18808 2.99644C6.03725 3.05109 5.88846 3.11276 5.74329 3.1808L3.92888 1.7648C3.83258 1.6896 3.69535 1.6981 3.60895 1.78444L1.78444 3.60895C1.69806 3.69535 1.68963 3.83259 1.7648 3.92888L3.1808 5.74329C3.11276 5.88846 3.05109 6.03725 2.99644 6.18808L0.712336 6.46978C0.591065 6.48473 0.5 6.58774 0.5 6.70989V9.29014C0.5 9.41232 0.591065 9.51534 0.712336 9.53026L2.99648 9.81195C3.05113 9.96275 3.11279 10.1115 3.1808 10.2567L1.7648 12.0711C1.68963 12.1674 1.69806 12.3047 1.78444 12.391L3.60895 14.2155C3.69528 14.3019 3.83255 14.3104 3.92888 14.2352L5.74329 12.8192C5.88843 12.8872 6.03721 12.9489 6.18808 13.0036L6.46978 15.2877C6.48473 15.4089 6.58774 15.5 6.70989 15.5ZM9.07622 15.0161H6.92381L6.64985 12.7946C6.6384 12.7017 6.57434 12.6238 6.48544 12.5945C6.25849 12.5197 6.03546 12.4273 5.82251 12.3197C5.73901 12.2775 5.63846 12.2873 5.56458 12.3449L3.79985 13.7221L2.27786 12.2002L3.65511 10.4354C3.71273 10.3616 3.72255 10.2611 3.68033 10.1775C3.57276 9.96444 3.48031 9.74141 3.40555 9.51453C3.37626 9.42562 3.29829 9.36163 3.20537 9.35015L0.983871 9.07622V6.92382L3.20537 6.64985C3.29829 6.6384 3.37626 6.57434 3.40555 6.48544C3.48031 6.25856 3.57276 6.03553 3.68033 5.82251C3.72255 5.73888 3.71273 5.63843 3.65511 5.56458L2.27786 3.79985L3.79985 2.27786L5.56458 3.65512C5.63833 3.71273 5.73891 3.72259 5.82251 3.68033C6.03552 3.57276 6.25855 3.48031 6.48544 3.40556C6.57434 3.37626 6.6384 3.29829 6.64985 3.20537L6.92381 0.983871H9.07622L9.35015 3.20537C9.36162 3.29829 9.42562 3.37626 9.51453 3.40556C9.74141 3.48031 9.96444 3.57276 10.1775 3.68033C10.2613 3.72269 10.3616 3.71267 10.4354 3.65512L12.2002 2.27786L13.7221 3.79985L12.3449 5.56458C12.2873 5.63843 12.2774 5.73891 12.3197 5.82251C12.4273 6.03546 12.5197 6.25849 12.5945 6.48544C12.6238 6.57434 12.7017 6.6384 12.7946 6.64985L15.0161 6.92382V9.07622L12.7946 9.35015C12.7017 9.36163 12.6238 9.42562 12.5945 9.51453C12.5197 9.74148 12.4273 9.96451 12.3197 10.1775C12.2774 10.2611 12.2873 10.3616 12.3449 10.4354L13.7221 12.2002L12.2002 13.7221L10.4354 12.3449C10.3616 12.2873 10.2612 12.2774 10.1775 12.3197C9.96451 12.4273 9.74148 12.5197 9.51453 12.5945C9.42562 12.6238 9.36162 12.7017 9.35015 12.7946L9.07622 15.0161ZM5.5 8C5.5 9.37852 6.62148 10.5 8 10.5C9.37852 10.5 10.5 9.37852 10.5 8C10.5 6.62148 9.37852 5.5 8 5.5C6.62148 5.5 5.5 6.62148 5.5 8ZM5.9174 8C5.9174 6.85164 6.85164 5.9174 8 5.9174C9.14833 5.9174 10.0826 6.85167 10.0826 8C10.0826 9.14833 9.14836 10.0826 8 10.0826C6.85164 10.0826 5.9174 9.14836 5.9174 8Z"
            fill={color}
          />
          <path
            d="M9.53025 15.2877L9.28213 15.2571L9.28213 15.2572L9.53025 15.2877ZM9.81195 13.0036L9.72674 12.7685L9.5826 12.8208L9.56383 12.973L9.81195 13.0036ZM10.2567 12.8192L10.4105 12.6221L10.2896 12.5277L10.1507 12.5928L10.2567 12.8192ZM12.0711 14.2352L12.2251 14.0382L12.2249 14.0381L12.0711 14.2352ZM12.391 14.2155L12.2142 14.0388L12.2141 14.0389L12.391 14.2155ZM14.2155 12.391L14.0388 12.2142L14.0388 12.2142L14.2155 12.391ZM14.2352 12.0711L14.0381 12.2249L14.0381 12.225L14.2352 12.0711ZM12.8192 10.2567L12.5928 10.1507L12.5277 10.2896L12.6221 10.4105L12.8192 10.2567ZM13.0036 9.81195L12.973 9.56383L12.8208 9.5826L12.7685 9.72674L13.0036 9.81195ZM15.2877 9.53026L15.2572 9.28213L15.2571 9.28214L15.2877 9.53026ZM15.2877 6.46978L15.2571 6.7179L15.2877 6.46978ZM13.0036 6.18808L12.7685 6.27318L12.8207 6.41743L12.973 6.4362L13.0036 6.18808ZM12.8192 5.74329L12.6221 5.58949L12.5277 5.71047L12.5928 5.84941L12.8192 5.74329ZM14.2352 3.92888L14.0381 3.77501L14.0381 3.77508L14.2352 3.92888ZM14.2155 3.60895L14.0388 3.78572V3.78572L14.2155 3.60895ZM12.391 1.78444L12.2142 1.96121V1.96121L12.391 1.78444ZM12.0711 1.7648L12.2249 1.96188L12.225 1.96181L12.0711 1.7648ZM10.2567 3.1808L10.1506 3.40717L10.2895 3.47228L10.4105 3.37788L10.2567 3.1808ZM9.81195 2.99648L9.56383 3.02708L9.5826 3.17927L9.72677 3.23152L9.81195 2.99648ZM9.53025 0.712336L9.28212 0.742856L9.28213 0.742936L9.53025 0.712336ZM6.46978 0.712336L6.7179 0.742937L6.7179 0.742927L6.46978 0.712336ZM6.18808 2.99644L6.27324 3.23149L6.41743 3.17925L6.4362 3.02704L6.18808 2.99644ZM5.74329 3.1808L5.58949 3.37788L5.71045 3.47229L5.84939 3.40717L5.74329 3.1808ZM3.92888 1.7648L3.77501 1.96183L3.77507 1.96188L3.92888 1.7648ZM3.60895 1.78444L3.43224 1.60759L3.43217 1.60766L3.60895 1.78444ZM1.78444 3.60895L1.60766 3.43217L1.60762 3.43221L1.78444 3.60895ZM1.7648 3.92888L1.96188 3.77507L1.96187 3.77506L1.7648 3.92888ZM3.1808 5.74329L3.40717 5.84939L3.47229 5.71045L3.37788 5.58949L3.1808 5.74329ZM2.99644 6.18808L3.02704 6.4362L3.17925 6.41743L3.23149 6.27324L2.99644 6.18808ZM0.712336 6.46978L0.742927 6.7179L0.742937 6.7179L0.712336 6.46978ZM0.712336 9.53026L0.742936 9.28214L0.742856 9.28213L0.712336 9.53026ZM2.99648 9.81195L3.23152 9.72677L3.17927 9.5826L3.02708 9.56383L2.99648 9.81195ZM3.1808 10.2567L3.37788 10.4105L3.47228 10.2895L3.40717 10.1506L3.1808 10.2567ZM1.7648 12.0711L1.56771 11.9173L1.5677 11.9173L1.7648 12.0711ZM1.78444 12.391L1.96121 12.2142L1.96118 12.2142L1.78444 12.391ZM3.60895 14.2155L3.78579 14.0388L3.78572 14.0388L3.60895 14.2155ZM3.92888 14.2352L3.77508 14.0381L3.77505 14.0381L3.92888 14.2352ZM5.74329 12.8192L5.84941 12.5928L5.71047 12.5277L5.58949 12.6221L5.74329 12.8192ZM6.18808 13.0036L6.4362 12.973L6.41743 12.8207L6.27318 12.7685L6.18808 13.0036ZM6.46978 15.2877L6.7179 15.2571L6.46978 15.2877ZM6.92381 15.0161L6.67569 15.0467L6.70275 15.2661H6.92381V15.0161ZM9.07622 15.0161V15.2661H9.29728L9.32434 15.0467L9.07622 15.0161ZM6.64985 12.7946L6.40172 12.8252L6.40173 12.8252L6.64985 12.7946ZM6.48544 12.5945L6.40719 12.8319L6.4072 12.8319L6.48544 12.5945ZM5.82251 12.3197L5.93526 12.0965L5.93525 12.0965L5.82251 12.3197ZM5.56458 12.3449L5.41079 12.1478L5.41077 12.1478L5.56458 12.3449ZM3.79985 13.7221L3.62307 13.8989L3.77939 14.0552L3.95366 13.9192L3.79985 13.7221ZM2.27786 12.2002L2.08077 12.0464L1.94477 12.2207L2.10108 12.377L2.27786 12.2002ZM3.65511 10.4354L3.8522 10.5892L3.85222 10.5892L3.65511 10.4354ZM3.68033 10.1775L3.90351 10.0648L3.9035 10.0648L3.68033 10.1775ZM3.40555 9.51453L3.16811 9.59277L3.16811 9.59277L3.40555 9.51453ZM3.20537 9.35015L3.23601 9.10204L3.23597 9.10203L3.20537 9.35015ZM0.983871 9.07622H0.733871V9.29728L0.953275 9.32434L0.983871 9.07622ZM0.983871 6.92382L0.953271 6.6757L0.733871 6.70275V6.92382H0.983871ZM3.20537 6.64985L3.1748 6.40172L3.17477 6.40173L3.20537 6.64985ZM3.40555 6.48544L3.643 6.56368L3.643 6.56368L3.40555 6.48544ZM3.68033 5.82251L3.90349 5.93521L3.90351 5.93518L3.68033 5.82251ZM3.65511 5.56458L3.85222 5.4108L3.8522 5.41077L3.65511 5.56458ZM2.27786 3.79985L2.10108 3.62307L1.94477 3.77939L2.08078 3.95366L2.27786 3.79985ZM3.79985 2.27786L3.95366 2.08078L3.77939 1.94477L3.62307 2.10108L3.79985 2.27786ZM5.56458 3.65512L5.71849 3.45811L5.71839 3.45803L5.56458 3.65512ZM5.82251 3.68033L5.70982 3.45717L5.70973 3.45721L5.82251 3.68033ZM6.48544 3.40556L6.56368 3.643L6.56368 3.643L6.48544 3.40556ZM6.64985 3.20537L6.40173 3.17477L6.40172 3.1748L6.64985 3.20537ZM6.92381 0.983871V0.733871H6.70275L6.67569 0.953271L6.92381 0.983871ZM9.07622 0.983871L9.32434 0.953275L9.29728 0.733871H9.07622V0.983871ZM9.35015 3.20537L9.10203 3.23597L9.10203 3.23601L9.35015 3.20537ZM9.51453 3.40556L9.59277 3.16811V3.16811L9.51453 3.40556ZM10.1775 3.68033L10.2903 3.45723L10.2902 3.45717L10.1775 3.68033ZM10.4354 3.65512L10.5892 3.85224L10.5892 3.8522L10.4354 3.65512ZM12.2002 2.27786L12.377 2.10108L12.2206 1.94477L12.0464 2.08077L12.2002 2.27786ZM13.7221 3.79985L13.9192 3.95366L14.0552 3.77939L13.8989 3.62307L13.7221 3.79985ZM12.3449 5.56458L12.542 5.71841L12.542 5.71839L12.3449 5.56458ZM12.3197 5.82251L12.5428 5.70976L12.5428 5.70973L12.3197 5.82251ZM12.5945 6.48544L12.8319 6.4072L12.8319 6.40719L12.5945 6.48544ZM12.7946 6.64985L12.8252 6.40173L12.8252 6.40172L12.7946 6.64985ZM15.0161 6.92382H15.2661V6.70275L15.0467 6.6757L15.0161 6.92382ZM15.0161 9.07622L15.0467 9.32434L15.2661 9.29728V9.07622H15.0161ZM12.7946 9.35015L12.764 9.10203L12.764 9.10204L12.7946 9.35015ZM12.5945 9.51453L12.8319 9.59278L12.8319 9.59277L12.5945 9.51453ZM12.3197 10.1775L12.5428 10.2902L12.5428 10.2902L12.3197 10.1775ZM12.3449 10.4354L12.542 10.2816L12.542 10.2816L12.3449 10.4354ZM13.7221 12.2002L13.8989 12.377L14.0552 12.2207L13.9192 12.0464L13.7221 12.2002ZM12.2002 13.7221L12.0464 13.9192L12.2206 14.0552L12.377 13.8989L12.2002 13.7221ZM10.4354 12.3449L10.2816 12.542L10.2816 12.542L10.4354 12.3449ZM10.1775 12.3197L10.0648 12.0965L10.0647 12.0965L10.1775 12.3197ZM9.51453 12.5945L9.59277 12.8319L9.59278 12.8319L9.51453 12.5945ZM9.35015 12.7946L9.10204 12.764L9.10203 12.764L9.35015 12.7946ZM9.29014 15.25H6.70989V15.75H9.29014V15.25ZM9.28213 15.2572C9.28264 15.253 9.28615 15.25 9.29014 15.25V15.75C9.53849 15.75 9.74804 15.5649 9.77838 15.3182L9.28213 15.2572ZM9.56383 12.973L9.28213 15.2571L9.77837 15.3183L10.0601 13.0342L9.56383 12.973ZM10.1507 12.5928C10.0123 12.6576 9.8705 12.7164 9.72674 12.7685L9.89717 13.2386C10.055 13.1814 10.2108 13.1168 10.3628 13.0456L10.1507 12.5928ZM12.2249 14.0381L10.4105 12.6221L10.1029 13.0163L11.9173 14.4323L12.2249 14.0381ZM12.2141 14.0389C12.2171 14.0359 12.2218 14.0356 12.2251 14.0382L11.9171 14.4321C12.113 14.5853 12.3923 14.5681 12.5679 14.3922L12.2141 14.0389ZM14.0388 12.2142L12.2142 14.0388L12.5678 14.3923L14.3923 12.5678L14.0388 12.2142ZM14.0381 12.225C14.0356 12.2218 14.0358 12.2171 14.0388 12.2142L14.3922 12.5679C14.568 12.3922 14.5851 12.1131 14.4322 11.9173L14.0381 12.225ZM12.6221 10.4105L14.0381 12.2249L14.4323 11.9173L13.0163 10.1029L12.6221 10.4105ZM12.7685 9.72674C12.7164 9.8705 12.6576 10.0123 12.5928 10.1507L13.0456 10.3628C13.1168 10.2108 13.1814 10.055 13.2386 9.89717L12.7685 9.72674ZM15.2571 9.28214L12.973 9.56383L13.0342 10.0601L15.3183 9.77838L15.2571 9.28214ZM15.25 9.29014C15.25 9.28615 15.253 9.28264 15.2572 9.28213L15.3182 9.77838C15.5649 9.74804 15.75 9.5385 15.75 9.29014H15.25ZM15.25 6.70989V9.29014H15.75V6.70989H15.25ZM15.2571 6.7179C15.253 6.7174 15.25 6.71395 15.25 6.70989H15.75C15.75 6.46153 15.5648 6.25206 15.3183 6.22166L15.2571 6.7179ZM12.973 6.4362L15.2571 6.7179L15.3183 6.22166L13.0342 5.93996L12.973 6.4362ZM12.5928 5.84941C12.6577 5.98771 12.7165 6.12948 12.7685 6.27318L13.2386 6.10299C13.1814 5.94494 13.1168 5.78915 13.0456 5.63718L12.5928 5.84941ZM14.0381 3.77508L12.6221 5.58949L13.0163 5.8971L14.4323 4.08269L14.0381 3.77508ZM14.0388 3.78572C14.0359 3.78288 14.0356 3.77827 14.0381 3.77501L14.4322 4.08275C14.5852 3.8869 14.568 3.60782 14.3923 3.43217L14.0388 3.78572ZM12.2142 1.96121L14.0388 3.78572L14.3923 3.43217L12.5678 1.60766L12.2142 1.96121ZM12.225 1.96181C12.2216 1.96445 12.2171 1.96406 12.2142 1.96121L12.5678 1.60766C12.3923 1.43214 12.1131 1.41474 11.9172 1.56779L12.225 1.96181ZM10.4105 3.37788L12.2249 1.96188L11.9173 1.56771L10.1029 2.98371L10.4105 3.37788ZM9.72677 3.23152C9.87049 3.2836 10.0123 3.34237 10.1506 3.40717L10.3628 2.95442C10.2108 2.8832 10.055 2.81865 9.89713 2.76144L9.72677 3.23152ZM9.28213 0.742936L9.56383 3.02708L10.0601 2.96588L9.77837 0.681736L9.28213 0.742936ZM9.29014 0.75C9.28613 0.75 9.28263 0.746986 9.28212 0.742856L9.77838 0.681816C9.74804 0.435143 9.53851 0.25 9.29014 0.25V0.75ZM6.70989 0.75H9.29014V0.25H6.70989V0.75ZM6.7179 0.742927C6.7174 0.746958 6.71397 0.75 6.70989 0.75V0.25C6.46151 0.25 6.25206 0.435171 6.22166 0.681745L6.7179 0.742927ZM6.4362 3.02704L6.7179 0.742937L6.22166 0.681736L5.93996 2.96584L6.4362 3.02704ZM5.84939 3.40717C5.98771 3.34234 6.12951 3.28357 6.27324 3.23149L6.10292 2.76139C5.94499 2.81862 5.78922 2.88318 5.6372 2.95443L5.84939 3.40717ZM3.77507 1.96188L5.58949 3.37788L5.8971 2.98371L4.08269 1.56771L3.77507 1.96188ZM3.78565 1.96128C3.78292 1.96402 3.77837 1.96446 3.77501 1.96183L4.08275 1.56776C3.8868 1.41474 3.60779 1.43218 3.43224 1.60759L3.78565 1.96128ZM1.96121 3.78572L3.78572 1.96121L3.43217 1.60766L1.60766 3.43217L1.96121 3.78572ZM1.96187 3.77506C1.9644 3.7783 1.96408 3.78286 1.96125 3.78569L1.60762 3.43221C1.43205 3.60785 1.41486 3.88687 1.56773 4.08271L1.96187 3.77506ZM3.37788 5.58949L1.96188 3.77507L1.56771 4.08269L2.98371 5.8971L3.37788 5.58949ZM3.23149 6.27324C3.28357 6.12951 3.34234 5.98771 3.40717 5.84939L2.95443 5.6372C2.88318 5.78922 2.81862 5.94499 2.76139 6.10292L3.23149 6.27324ZM0.742937 6.7179L3.02704 6.4362L2.96584 5.93996L0.681736 6.22166L0.742937 6.7179ZM0.75 6.70989C0.75 6.71397 0.746958 6.7174 0.742927 6.7179L0.681745 6.22166C0.435171 6.25206 0.25 6.46151 0.25 6.70989H0.75ZM0.75 9.29014V6.70989H0.25V9.29014H0.75ZM0.742856 9.28213C0.746986 9.28263 0.75 9.28613 0.75 9.29014H0.25C0.25 9.53851 0.435143 9.74804 0.681816 9.77839L0.742856 9.28213ZM3.02708 9.56383L0.742936 9.28214L0.681736 9.77838L2.96588 10.0601L3.02708 9.56383ZM3.40717 10.1506C3.34237 10.0123 3.2836 9.87049 3.23152 9.72677L2.76143 9.89713C2.81865 10.055 2.8832 10.2108 2.95442 10.3628L3.40717 10.1506ZM1.96188 12.2249L3.37788 10.4105L2.98371 10.1029L1.56771 11.9173L1.96188 12.2249ZM1.96118 12.2142C1.96415 12.2172 1.96435 12.2218 1.9619 12.2249L1.5677 11.9173C1.41491 12.1131 1.43198 12.3922 1.60769 12.5678L1.96118 12.2142ZM3.78572 14.0388L1.96121 12.2142L1.60766 12.5678L3.43217 14.3923L3.78572 14.0388ZM3.77505 14.0381C3.7782 14.0356 3.78281 14.0358 3.78579 14.0388L3.4321 14.3922C3.60775 14.568 3.8869 14.5851 4.08272 14.4322L3.77505 14.0381ZM5.58949 12.6221L3.77508 14.0381L4.08269 14.4323L5.8971 13.0163L5.58949 12.6221ZM6.27318 12.7685C6.12948 12.7165 5.98771 12.6577 5.84941 12.5928L5.63717 13.0456C5.78914 13.1168 5.94494 13.1814 6.10299 13.2386L6.27318 12.7685ZM6.7179 15.2571L6.4362 12.973L5.93996 13.0342L6.22166 15.3183L6.7179 15.2571ZM6.70989 15.25C6.71395 15.25 6.7174 15.253 6.7179 15.2571L6.22166 15.3183C6.25206 15.5649 6.46153 15.75 6.70989 15.75V15.25ZM6.92381 15.2661H9.07622V14.7661H6.92381V15.2661ZM6.40173 12.8252L6.67569 15.0467L7.17194 14.9855L6.89797 12.764L6.40173 12.8252ZM6.4072 12.8319C6.40427 12.831 6.40212 12.8284 6.40172 12.8252L6.89797 12.7641C6.87468 12.5751 6.74442 12.4166 6.56368 12.357L6.4072 12.8319ZM5.70976 12.5428C5.93389 12.6561 6.16846 12.7532 6.40719 12.8319L6.56369 12.357C6.34852 12.2861 6.13702 12.1985 5.93526 12.0965L5.70976 12.5428ZM5.71837 12.542C5.71595 12.5439 5.71268 12.5443 5.70978 12.5428L5.93525 12.0965C5.76534 12.0107 5.56097 12.0306 5.41079 12.1478L5.71837 12.542ZM3.95366 13.9192L5.71839 12.542L5.41077 12.1478L3.64604 13.5251L3.95366 13.9192ZM2.10108 12.377L3.62307 13.8989L3.97662 13.5454L2.45463 12.0234L2.10108 12.377ZM3.45803 10.2816L2.08077 12.0464L2.47494 12.354L3.8522 10.5892L3.45803 10.2816ZM3.45716 10.2902C3.45578 10.2874 3.45609 10.2841 3.45801 10.2816L3.85222 10.5892C3.96937 10.439 3.98932 10.2348 3.90351 10.0648L3.45716 10.2902ZM3.16811 9.59277C3.24676 9.83146 3.34398 10.066 3.45717 10.2902L3.9035 10.0648C3.80154 9.86287 3.71386 9.65136 3.643 9.43629L3.16811 9.59277ZM3.17473 9.59827C3.17176 9.5979 3.16912 9.59582 3.16811 9.59277L3.643 9.43629C3.5834 9.25543 3.42482 9.12535 3.23601 9.10204L3.17473 9.59827ZM0.953275 9.32434L3.17477 9.59827L3.23597 9.10203L1.01447 8.8281L0.953275 9.32434ZM0.733871 6.92382V9.07622H1.23387V6.92382H0.733871ZM3.17477 6.40173L0.953271 6.6757L1.01447 7.17194L3.23597 6.89797L3.17477 6.40173ZM3.16811 6.4072C3.16909 6.40425 3.17166 6.40211 3.1748 6.40172L3.23594 6.89797C3.42491 6.87469 3.58343 6.74444 3.643 6.56368L3.16811 6.4072ZM3.45717 5.70982C3.34398 5.93395 3.24676 6.1685 3.16811 6.40721L3.643 6.56368C3.71386 6.34861 3.80154 6.1371 3.90349 5.93521L3.45717 5.70982ZM3.45801 5.71836C3.45609 5.7159 3.45578 5.71257 3.45716 5.70985L3.90351 5.93518C3.98932 5.76519 3.96937 5.56095 3.85222 5.4108L3.45801 5.71836ZM2.08078 3.95366L3.45803 5.71839L3.8522 5.41077L2.47494 3.64604L2.08078 3.95366ZM3.62307 2.10108L2.10108 3.62307L2.45464 3.97662L3.97662 2.45464L3.62307 2.10108ZM5.71839 3.45803L3.95366 2.08078L3.64604 2.47494L5.41077 3.8522L5.71839 3.45803ZM5.70973 3.45721C5.71256 3.45579 5.71588 3.45607 5.71849 3.45811L5.41067 3.85212C5.56077 3.96939 5.76527 3.98939 5.93529 3.90345L5.70973 3.45721ZM6.40721 3.16811C6.1685 3.24676 5.93395 3.34398 5.70982 3.45717L5.93521 3.90349C6.1371 3.80154 6.34861 3.71386 6.56368 3.643L6.40721 3.16811ZM6.40172 3.1748C6.40211 3.17166 6.40425 3.16909 6.4072 3.16811L6.56368 3.643C6.74444 3.58343 6.87469 3.42491 6.89797 3.23594L6.40172 3.1748ZM6.67569 0.953271L6.40173 3.17477L6.89797 3.23597L7.17194 1.01447L6.67569 0.953271ZM9.07622 0.733871H6.92381V1.23387H9.07622V0.733871ZM9.59827 3.17478L9.32434 0.953275L8.8281 1.01447L9.10203 3.23597L9.59827 3.17478ZM9.59277 3.16811C9.59582 3.16912 9.5979 3.17176 9.59827 3.17473L9.10203 3.23601C9.12535 3.42482 9.25543 3.5834 9.43629 3.643L9.59277 3.16811ZM10.2902 3.45717C10.066 3.34398 9.83146 3.24676 9.59277 3.16811L9.43629 3.643C9.65135 3.71386 9.86287 3.80154 10.0648 3.9035L10.2902 3.45717ZM10.2817 3.45799C10.2839 3.45622 10.2874 3.45575 10.2903 3.45723L10.0647 3.90343C10.2352 3.98963 10.4393 3.96912 10.5892 3.85224L10.2817 3.45799ZM12.0464 2.08077L10.2816 3.45803L10.5892 3.8522L12.354 2.47495L12.0464 2.08077ZM13.8989 3.62307L12.377 2.10108L12.0234 2.45463L13.5454 3.97662L13.8989 3.62307ZM12.542 5.71839L13.9192 3.95366L13.5251 3.64604L12.1478 5.41077L12.542 5.71839ZM12.5428 5.70973C12.5442 5.71263 12.5439 5.716 12.542 5.71841L12.1478 5.41075C12.0307 5.56085 12.0106 5.76519 12.0965 5.93529L12.5428 5.70973ZM12.8319 6.40719C12.7532 6.16846 12.6561 5.93389 12.5428 5.70976L12.0965 5.93526C12.1985 6.13702 12.2861 6.34852 12.357 6.56369L12.8319 6.40719ZM12.8252 6.40172C12.8284 6.40212 12.831 6.40427 12.8319 6.4072L12.357 6.56368C12.4166 6.74442 12.5751 6.87468 12.764 6.89797L12.8252 6.40172ZM15.0467 6.6757L12.8252 6.40173L12.764 6.89797L14.9855 7.17194L15.0467 6.6757ZM15.2661 9.07622V6.92382H14.7661V9.07622H15.2661ZM12.8252 9.59827L15.0467 9.32434L14.9855 8.8281L12.764 9.10203L12.8252 9.59827ZM12.8319 9.59277C12.8309 9.5958 12.8283 9.59789 12.8253 9.59827L12.764 9.10204C12.5752 9.12536 12.4166 9.25544 12.357 9.43629L12.8319 9.59277ZM12.5428 10.2902C12.6561 10.0661 12.7532 9.83151 12.8319 9.59278L12.357 9.43628C12.2861 9.65145 12.1985 9.86294 12.0965 10.0647L12.5428 10.2902ZM12.542 10.2816C12.5439 10.284 12.5442 10.2874 12.5428 10.2902L12.0965 10.0647C12.0106 10.2348 12.0307 10.4391 12.1478 10.5892L12.542 10.2816ZM13.9192 12.0464L12.542 10.2816L12.1478 10.5892L13.5251 12.354L13.9192 12.0464ZM12.377 13.8989L13.8989 12.377L13.5454 12.0234L12.0234 13.5454L12.377 13.8989ZM10.2816 12.542L12.0464 13.9192L12.354 13.5251L10.5892 12.1478L10.2816 12.542ZM10.2902 12.5428C10.2875 12.5442 10.284 12.5439 10.2816 12.542L10.5892 12.1478C10.4391 12.0307 10.2349 12.0106 10.0648 12.0965L10.2902 12.5428ZM9.59278 12.8319C9.83151 12.7532 10.0661 12.6561 10.2902 12.5428L10.0647 12.0965C9.86294 12.1985 9.65144 12.2861 9.43628 12.357L9.59278 12.8319ZM9.59826 12.8253C9.59789 12.8283 9.5958 12.8309 9.59277 12.8319L9.43629 12.357C9.25544 12.4166 9.12536 12.5752 9.10204 12.764L9.59826 12.8253ZM9.32434 15.0467L9.59827 12.8252L9.10203 12.764L8.8281 14.9855L9.32434 15.0467ZM8 10.25C6.75955 10.25 5.75 9.24045 5.75 8H5.25C5.25 9.51659 6.48341 10.75 8 10.75V10.25ZM10.25 8C10.25 9.24045 9.24045 10.25 8 10.25V10.75C9.51659 10.75 10.75 9.51659 10.75 8H10.25ZM8 5.75C9.24045 5.75 10.25 6.75955 10.25 8H10.75C10.75 6.48341 9.51659 5.25 8 5.25V5.75ZM5.75 8C5.75 6.75955 6.75955 5.75 8 5.75V5.25C6.48341 5.25 5.25 6.48341 5.25 8H5.75ZM8 5.6674C6.71357 5.6674 5.6674 6.71357 5.6674 8H6.1674C6.1674 6.98971 6.98971 6.1674 8 6.1674V5.6674ZM10.3326 8C10.3326 6.7136 9.2864 5.6674 8 5.6674V6.1674C9.01026 6.1674 9.8326 6.98974 9.8326 8H10.3326ZM8 10.3326C9.28643 10.3326 10.3326 9.2864 10.3326 8H9.8326C9.8326 9.01026 9.01028 9.8326 8 9.8326V10.3326ZM5.6674 8C5.6674 9.28643 6.71357 10.3326 8 10.3326V9.8326C6.98971 9.8326 6.1674 9.01029 6.1674 8H5.6674Z"
            fill={clr}
          />
        </g>
        <defs>
          <clipPath id="clip0_1156_6534">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  )
}
