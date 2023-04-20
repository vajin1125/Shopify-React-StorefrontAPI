import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Typography } from "src/UILibrary"
import { FOOTER_CONSTANT } from "src/constants/footer"
import { StudentOrTeacherPanel } from "./components/StudentOrTeacherPanel"
// TODO: Will be used after 1st Release (2023/01/31)
// import { GraduatePanel } from "./components/GraduatePanel"
// import { Navigation } from "./components/Navigation"

export const SignIn: React.FC = () => {
  const { t } = useTranslation()
  // TODO: Will be used after 1st Release (2023/01/31)
  // const [userType, setUserType] = useState<"student_or_teacher" | "graduate">("student_or_teacher")
  const [userType] = useState<"student_or_teacher" | "graduate">("student_or_teacher")

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        minHeight: { xs: "calc(100vh - 85px)", md: "100vh" },
        bgcolor: "background.paper",
      }}
    >
      <Typography.Title
        color="primary"
        sx={{ lineHeight: "1.5rem", mt: { md: "11.5625rem", xs: "6.375rem" } }}
      >
        {t("header.login")}
      </Typography.Title>
      {/* // TODO: Will be used after 1st Release (2023/01/31) */}
      {/* <Navigation userType={userType} setUserType={setUserType} /> */}
      {userType === "student_or_teacher" && <StudentOrTeacherPanel />}
      {/* // TODO: Will be used after 1st Release (2023/01/31) */}
      {/* {userType === "graduate" && <GraduatePanel />} */}
      <Typography.Caption
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          lineHeight: "1.5rem",
          textAlign: "center",
          bgcolor: "primary.dark",
          mt: "0.5rem",
          width: "100%",
          color: "background.default",
          display: { xs: "none", md: "block" },
        }}
      >
        {FOOTER_CONSTANT}
      </Typography.Caption>
    </Box>
  )
}
