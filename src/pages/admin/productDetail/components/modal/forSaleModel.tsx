import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Control, useController } from "react-hook-form"

import { Modal } from "src/components/modal"
import { Group } from "../group"
import { CheckboxItem, Box, Grid, Button } from "src/UILibrary"

import { IAdminProductItem, ISalesTarget } from "src/types/product"

interface ForSaleModalProps {
  open: boolean
  control: Control<IAdminProductItem, any>
  // eslint-disable-next-line no-unused-vars
  handleOpen: (open: boolean) => void
}

export const ForSaleModal: React.FC<ForSaleModalProps> = ({ open, control, handleOpen }) => {
  const { t } = useTranslation()

  const {
    field: { value, onChange },
  } = useController({ name: "salesTarget", control })

  const [salesTarget, setSalesTarget] = useState<ISalesTarget[]>(value)

  const handleClose = () => {
    handleOpen(false)
  }

  const checkValue = (school: string, department: string, grades: number[]): boolean => {
    const exists = grades.map((grade) => {
      const target = salesTarget.find(
        (item) => item.school === school && item.department === department && item.grade === grade
      )
      return !!target
    })
    return exists.every((item) => item)
  }

  const handleChange = (
    school: string,
    department: string,
    grades: number[],
    newValue: boolean
  ) => {
    const temp = grades.reduce(
      (prev, grade) =>
        prev.filter(
          (item) => item.school !== school || item.department !== department || item.grade !== grade
        ),
      [...salesTarget]
    )
    if (newValue) {
      setSalesTarget([
        ...temp,
        ...grades.map((grade) => ({
          school,
          department,
          grade,
        })),
      ])
    } else {
      setSalesTarget(temp)
    }
  }

  useEffect(() => {
    setSalesTarget(value)
  }, [open, value])

  return (
    <Modal
      handleClose={handleClose}
      open={open}
      title="admin.productdetail.detailed_settings_for_what_to_sell"
    >
      <Grid container sx={{ mt: 3 }}>
        <Grid item md={12}>
          <Group label="admin.productdetail.osaka_belebel_beauty_college">
            <Box sx={{ display: "flex" }}>
              <CheckboxItem
                label="admin.productdetail.cosmetology"
                checked={checkValue("osaka", "beauty", [1, 2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("osaka", "beauty", [1, 2], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.one_grade"
                checked={checkValue("osaka", "beauty", [1])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("osaka", "beauty", [1], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.two_grade"
                checked={checkValue("osaka", "beauty", [2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("osaka", "beauty", [2], e.target.checked)
                }
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <CheckboxItem
                label="admin.productdetail.professional_academy_department"
                checked={checkValue("osaka", "professional_academy", [1])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("osaka", "professional_academy", [1], e.target.checked)
                }
              />
            </Box>
          </Group>
        </Grid>
        <Grid item md={12}>
          <Group label="admin.productdetail.kove_belebel_beauty_college">
            <Box sx={{ display: "flex" }}>
              <CheckboxItem
                label="admin.productdetail.cosmetology"
                checked={checkValue("kobe", "beauty", [1, 2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "beauty", [1, 2], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.one_grade"
                checked={checkValue("kobe", "beauty", [1])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "beauty", [1], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.two_grade"
                checked={checkValue("kobe", "beauty", [2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "beauty", [2], e.target.checked)
                }
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <CheckboxItem
                label="admin.productdetail.professional_academy_department"
                checked={checkValue("kobe", "professional_academy", [1])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "professional_academy", [1], e.target.checked)
                }
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <CheckboxItem
                label="admin.productdetail.wedding_planner"
                checked={checkValue("kobe", "wedding_planner", [1, 2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "wedding_planner", [1, 2], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.one_grade"
                checked={checkValue("kobe", "wedding_planner", [1])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "wedding_planner", [1], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.two_grade"
                checked={checkValue("kobe", "wedding_planner", [2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "wedding_planner", [2], e.target.checked)
                }
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <CheckboxItem
                label="admin.productdetail.bridal_stylist_department"
                checked={checkValue("kobe", "bridal_stylist", [1, 2, 3])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "bridal_stylist", [1, 2, 3], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.one_grade"
                checked={checkValue("kobe", "bridal_stylist", [1])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "bridal_stylist", [1], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.two_grade"
                checked={checkValue("kobe", "bridal_stylist", [2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "bridal_stylist", [2], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.three_grade"
                checked={checkValue("kobe", "bridal_stylist", [3])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "bridal_stylist", [3], e.target.checked)
                }
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <CheckboxItem
                label="admin.productdetail.total_beauty_course"
                checked={checkValue("kobe", "total_beauty", [1, 2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "total_beauty", [1, 2], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.one_grade"
                checked={checkValue("kobe", "total_beauty", [1])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "total_beauty", [1], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.two_grade"
                checked={checkValue("kobe", "total_beauty", [2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kobe", "total_beauty", [2], e.target.checked)
                }
              />
            </Box>
          </Group>
        </Grid>
        <Grid item md={12}>
          <Group label="admin.productdetail.osaka_belebel_beauty_and_bridal_college">
            <Box sx={{ display: "flex" }}>
              <CheckboxItem
                label="admin.productdetail.wedding_planner"
                checked={checkValue("osaka_beauty_and_bridal", "wedding_planner", [1, 2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(
                    "osaka_beauty_and_bridal",
                    "wedding_planner",
                    [1, 2],
                    e.target.checked
                  )
                }
              />
              <CheckboxItem
                label="admin.productdetail.one_grade"
                checked={checkValue("osaka_beauty_and_bridal", "wedding_planner", [1])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("osaka_beauty_and_bridal", "wedding_planner", [1], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.two_grade"
                checked={checkValue("osaka_beauty_and_bridal", "wedding_planner", [2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("osaka_beauty_and_bridal", "wedding_planner", [2], e.target.checked)
                }
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <CheckboxItem
                label="admin.productdetail.bridal_stylist_department"
                checked={checkValue("osaka_beauty_and_bridal", "bridal_stylist", [1, 2, 3])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(
                    "osaka_beauty_and_bridal",
                    "bridal_stylist",
                    [1, 2, 3],
                    e.target.checked
                  )
                }
              />
              <CheckboxItem
                label="admin.productdetail.one_grade"
                checked={checkValue("osaka_beauty_and_bridal", "bridal_stylist", [1])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("osaka_beauty_and_bridal", "bridal_stylist", [1], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.two_grade"
                checked={checkValue("osaka_beauty_and_bridal", "bridal_stylist", [2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("osaka_beauty_and_bridal", "bridal_stylist", [2], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.three_grade"
                checked={checkValue("osaka_beauty_and_bridal", "bridal_stylist", [3])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("osaka_beauty_and_bridal", "bridal_stylist", [3], e.target.checked)
                }
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <CheckboxItem
                label="admin.productdetail.total_beauty_course"
                checked={checkValue("osaka_beauty_and_bridal", "total_beauty", [1, 2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("osaka_beauty_and_bridal", "total_beauty", [1, 2], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.one_grade"
                checked={checkValue("osaka_beauty_and_bridal", "total_beauty", [1])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("osaka_beauty_and_bridal", "total_beauty", [1], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.two_grade"
                checked={checkValue("osaka_beauty_and_bridal", "total_beauty", [2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("osaka_beauty_and_bridal", "total_beauty", [2], e.target.checked)
                }
              />
            </Box>
          </Group>
        </Grid>
        <Grid item md={12}>
          <Group label="admin.productdetail.kumamoto_college">
            <Box sx={{ display: "flex" }}>
              <CheckboxItem
                label="admin.productdetail.cosmetology"
                checked={checkValue("kumamoto", "beauty", [1, 2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kumamoto", "beauty", [1, 2], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.one_grade"
                checked={checkValue("kumamoto", "beauty", [1])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kumamoto", "beauty", [1], e.target.checked)
                }
              />
              <CheckboxItem
                label="admin.productdetail.two_grade"
                checked={checkValue("kumamoto", "beauty", [2])}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("kumamoto", "beauty", [2], e.target.checked)
                }
              />
            </Box>
          </Group>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          mt: 3,
          mb: 2.5,
        }}
      >
        <Button
          sx={{
            color: "text.secondary",
            width: "150px",
            height: "44px",
            "&:hover": {
              color: "text.primary",
            },
          }}
          onClick={handleClose}
        >
          {t("admin.productdetail.cancel")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "150px",
            height: "44px",
            color: "background.default",
            borderRadius: 0,
          }}
          onClick={() => {
            onChange(salesTarget)
            handleOpen(false)
          }}
        >
          {t("admin.productdetail.setting")}
        </Button>
      </Box>
    </Modal>
  )
}
