import React, { useState, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Grid, Typography, MenuItem } from "src/UILibrary"
import { AddornmentLabelField } from "src/components/shared/addornmentLabelField"

import { IAdminCustomerListFilters } from "src/types/user"
import { DEPARTMENT_LIST } from "src/constants/adminProductList"
import { MAXIMUM_GRADE, SCHOOLS, MAXIMUM_CLASSROOM_NUMBER } from "src/constants/adminUserList"
import { START_SCHOOL_YEAR } from "src/constants/common"

interface SearchBoxProps {
  initialData: IAdminCustomerListFilters
  // eslint-disable-next-line no-unused-vars
  handleFilterChange: (data: IAdminCustomerListFilters) => void
}

export const SearchBox: React.FC<SearchBoxProps> = ({ initialData, handleFilterChange }) => {
  const { t } = useTranslation()
  const [department, setDepartment] = useState<string>(initialData.department)
  const [school, setSchool] = useState<string>(initialData.school)
  const [grade, setGrade] = useState<number>(initialData.grade)
  const [classroom, setClassroom] = useState<number>(initialData.classroom)
  const [fullName, setFullName] = useState<string>(initialData.fullName)
  const [entranceYear, setEntranceYear] = useState<string>(initialData.entranceYear)
  const currentYear = new Date().getFullYear()

  const departmentsForSchool = useMemo(() => {
    if (school === "all") {
      return DEPARTMENT_LIST.map((d) => d.key)
    }
    const selectedSchool = SCHOOLS.find((s) => s.key === school)
    if (selectedSchool) {
      return [...selectedSchool.departments]
    } else {
      return []
    }
  }, [school])

  const handleClick = () => {
    handleFilterChange({ department, school, grade, classroom, fullName, entranceYear })
  }

  useEffect(() => {
    setDepartment(initialData.department)
    setSchool(initialData.school)
    setGrade(initialData.grade)
    setClassroom(initialData.classroom)
    setFullName(initialData.fullName)
    setEntranceYear(initialData.entranceYear)
  }, [initialData])

  return (
    <Grid
      container
      sx={{
        bgcolor: "background.default",
        p: "1rem 1.75rem 1rem 0.75rem",
        boxShadow: "1px 1px 8px rgba(169, 169, 169, 0.25)",
      }}
      spacing={2}
    >
      <Grid item md={3}>
        <AddornmentLabelField
          label="admin.userlist.subject"
          type="select"
          value={department}
          handleChange={(value: string) => setDepartment(value)}
        >
          <MenuItem value="all">{t("admin.userlist.unspecified")}</MenuItem>
          {departmentsForSchool.map((d) => (
            <MenuItem key={d} value={d}>
              {t(`admin.productlist.${d}`)}
            </MenuItem>
          ))}
        </AddornmentLabelField>
      </Grid>
      <Grid item md={3}>
        <AddornmentLabelField
          label="admin.userlist.school_building"
          type="select"
          value={school}
          handleChange={(value: string) => {
            setSchool(value)
            setDepartment("all")
          }}
        >
          <MenuItem value="all">{t("admin.userlist.unspecified")}</MenuItem>
          {SCHOOLS.map((s) => (
            <MenuItem key={s.key} value={s.key}>
              {t(s.label)}
            </MenuItem>
          ))}
        </AddornmentLabelField>
      </Grid>
      <Grid item md={3}>
        <AddornmentLabelField
          label="admin.userlist.entrance_year"
          type="select"
          value={entranceYear}
          handleChange={(value: string) => setEntranceYear(value)}
        >
          <MenuItem value="all">{t("admin.userlist.unspecified")}</MenuItem>
          {Array.from({ length: currentYear - START_SCHOOL_YEAR + 1 }).map((_, index) => (
            <MenuItem key={currentYear - index} value={`${currentYear - index}`}>
              {`${currentYear - index}`}
            </MenuItem>
          ))}
        </AddornmentLabelField>
      </Grid>
      <Grid item md={3}>
        <AddornmentLabelField
          label="admin.userlist.school_year"
          type="select"
          value={grade}
          handleChange={(value: string) => setGrade(parseInt(value))}
        >
          <MenuItem value={0}>{t("admin.userlist.unspecified")}</MenuItem>
          {Array.from({ length: MAXIMUM_GRADE }).map((_, index) => (
            <MenuItem key={`grade-${index}`} value={index + 1}>
              {`${index + 1}${t("admin.userlist.year")}`}
            </MenuItem>
          ))}
        </AddornmentLabelField>
      </Grid>
      <Grid item md={3}>
        <AddornmentLabelField
          label="admin.userlist.class"
          type="select"
          value={classroom}
          handleChange={(value: string) => setClassroom(parseInt(value))}
        >
          <MenuItem value={0}>{t("admin.userlist.unspecified")}</MenuItem>
          {Array.from({ length: MAXIMUM_CLASSROOM_NUMBER }).map((_, index) => (
            <MenuItem key={`classroom-${index}`} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </AddornmentLabelField>
      </Grid>
      <Grid item md={9}>
        <AddornmentLabelField
          label="admin.userlist.full_name"
          type="input"
          value={fullName}
          handleChange={(value: string) => setFullName(value)}
        />
      </Grid>
      <Grid
        item
        md={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 1,
          position: "relative",
        }}
      >
        <Typography.Action
          sx={{
            lineHeight: "1.25rem",
            letterSpacing: "2px",
            color: "primary.main",
            position: "absolute",
            bottom: -5,
            left: 16,
            cursor: "pointer",
          }}
          onClick={() =>
            handleFilterChange({
              department: "all",
              school: "all",
              grade: 0,
              classroom: 0,
              fullName: "",
              entranceYear: "all",
            })
          }
        >
          {t("admin.productlist.search_condition_reset")}
        </Typography.Action>
        <Button
          variant="contained"
          color="primary"
          sx={{
            minWidth: "122px",
            color: "background.default",
            borderRadius: 0,
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            py: "0.5rem",
            letterSpacing: "3px",
          }}
          onClick={handleClick}
        >
          {t("admin.productlist.search")}
        </Button>
        <Box />
      </Grid>
    </Grid>
  )
}
