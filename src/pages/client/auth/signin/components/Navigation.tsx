import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Typography } from "src/UILibrary"

interface NavigationProps {
  userType: "student_or_teacher" | "graduate"
  setUserType: React.Dispatch<React.SetStateAction<"student_or_teacher" | "graduate">>
}

export const Navigation = ({ userType, setUserType }: NavigationProps) => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        pl: "30px",
        pr: "33px",
        display: "flex",
        mt: "1.5rem",
        width: "100%",
        boxSizing: "border-box",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "250px",
          minWidth: "154px",
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: "13px",
          border: "2px solid",
          borderColor: userType === "student_or_teacher" ? "primary.main" : "divider",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => setUserType("student_or_teacher")}
      >
        <Typography.SubTitle
          sx={{
            lineHeight: "1.5rem",
            color: userType === "student_or_teacher" ? "primary.main" : "divider",
          }}
        >
          {t("auth.students_or_teachers")}
        </Typography.SubTitle>
      </Box>
      <Box
        sx={{
          maxWidth: "250px",
          minWidth: "156px",
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: "0.8125rem",
          border: "2px solid",
          borderColor: userType === "graduate" ? "primary.main" : "divider",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => setUserType("graduate")}
      >
        <Typography.SubTitle
          sx={{
            lineHeight: "1.5rem",
            color: userType === "graduate" ? "primary.main" : "divider",
          }}
        >
          {t("auth.graduate")}
        </Typography.SubTitle>
      </Box>
    </Box>
  )
}
