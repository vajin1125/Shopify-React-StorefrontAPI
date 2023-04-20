import React from "react"
import { useTranslation } from "react-i18next"

import { Image, Typography, Box, Grid } from "src/UILibrary"
import CircleIcon from "src/assets/icons/elipse.svg"
import { FOOTER_CONSTANT, FOOTER_ITEMS } from "src/constants/footer"

const CategoryTypoSubTitle = ({ translationKey }: { translationKey: string }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: "0.5rem" }}>
      <Image src={CircleIcon} alt="list-circle" sx={{ display: "flex", alignItems: "center" }} />
      <Typography.Description
        sx={{
          ml: "0.5rem",
          fontWeight: 500,
          lineHeight: "1.125rem",
          color: "background.default",
          pb: "0.125rem",
        }}
      >
        {t(translationKey)}
      </Typography.Description>
    </Box>
  )
}

const CategoryTypo = ({ translationKey }: { translationKey: string }) => {
  const { t } = useTranslation()

  return (
    <Typography.Description
      sx={{
        ml: "1rem",
        mb: "0.5rem",
        lineHeight: "1.125rem",
        color: "background.default",
      }}
    >
      {t(translationKey)}
    </Typography.Description>
  )
}

const CategoryList = ({ title, labels }: { title: string; labels: string[] }) => {
  return (
    <>
      <CategoryTypoSubTitle translationKey={title} />
      <Box sx={{ mb: "0.5rem" }}>
        {labels.map((tKey) => (
          <CategoryTypo key={tKey} translationKey={tKey} />
        ))}
      </Box>
    </>
  )
}

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "primary.main",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Grid container maxWidth="1060px" py={4}>
        <Grid item sm={4}>
          <Typography.SubTitle sx={{ mb: "1rem", color: "background.default" }}>
            {t("sidebar.category")}
          </Typography.SubTitle>
          <Grid container>
            <Grid item sm={6}>
              <CategoryList
                title="sidebar.test"
                labels={["sidebar.certification", "sidebar.supplementary_exam"]}
              />
              <CategoryList
                title="sidebar.class"
                labels={["sidebar.textbook", "sidebar.courses"]}
              />
            </Grid>
            <Grid item sm={6}>
              <CategoryList
                title="sidebar.identification"
                labels={["sidebar.student_card", "sidebar.employment_photographs"]}
              />
            </Grid>
          </Grid>
        </Grid>
        {FOOTER_ITEMS.map(({ title, items }, index) => (
          <Grid key={`col-${index}`} item sm={4}>
            <Typography.SubTitle sx={{ lineHeight: "1.125rem", color: "background.default" }}>
              {t(title)}
            </Typography.SubTitle>
            {items.map((translationKey, index) => (
              <Typography.Description
                key={`footer-cell-${index}`}
                sx={{
                  mt: "1rem",
                  color: "background.default",
                }}
              >
                {t(translationKey)}
              </Typography.Description>
            ))}
          </Grid>
        ))}
      </Grid>
      <Typography.Caption
        sx={{
          lineHeight: "1.5rem",
          textAlign: "center",
          bgcolor: "primary.dark",
          mt: "0.5rem",
          width: "100%",
          color: "background.default",
        }}
      >
        {FOOTER_CONSTANT}
      </Typography.Caption>
    </Box>
  )
}
