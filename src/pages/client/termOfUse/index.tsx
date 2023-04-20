import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Typography } from "src/UILibrary"
import { SectionHeader } from "src/components/shared/sectionHeader"

import { CONTENT_COUNTS } from "src/constants/termOfUse"

export const TermOfUse: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Box sx={{ flexGrow: 1, mt: 20, mb: 12.5, px: 2 }}>
      <Box sx={{ maxWidth: 1200, width: "100%", mx: "auto" }}>
        <Box sx={{ maxWidth: 830, width: "100%" }}>
          <Typography.Heading sx={{ color: "primary.main", mb: { xs: 3, md: 5 } }}>
            {t("term_of_use.term_of_use")}
          </Typography.Heading>
          {CONTENT_COUNTS.map((count, index) => (
            <Box key={`section-${index}`} sx={{ mb: 3 }}>
              <SectionHeader title={t(`term_of_use.section_${index + 1}`)} />
              <Box sx={{ px: 1.25 }}>
                {Array.from({ length: count }).map((_, cIndex) => (
                  <Box
                    key={`content-${index}-${cIndex}`}
                    sx={{ display: "flex", color: "text.primary" }}
                  >
                    <Typography.SubTitle sx={{ fontWeight: 400, width: 20, flexShrink: 0 }}>
                      {cIndex + 1}.
                    </Typography.SubTitle>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography.SubTitle sx={{ fontWeight: 400 }}>
                        {t(`term_of_use.content_${index + 1}_${cIndex + 1}`)}
                      </Typography.SubTitle>
                      {index === 12 && cIndex === 0 && (
                        <>
                          {["address", "phone", "email"].map((key) => (
                            <Typography.SubTitle key={key} sx={{ fontWeight: 400 }}>
                              {t(`term_of_use.${key}`)}
                            </Typography.SubTitle>
                          ))}
                        </>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
