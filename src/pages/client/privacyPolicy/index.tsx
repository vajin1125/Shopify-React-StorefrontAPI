import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Typography } from "src/UILibrary"
import { SectionHeader } from "src/components/shared/sectionHeader"
import { PRIVACY_POLICIES } from "src/constants/privacyPolicy"

export const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Box sx={{ flexGrow: 1, mt: { md: "10.3125rem", xs: "3.125rem" }, mb: 12.5, px: 2 }}>
      <Box sx={{ maxWidth: 1200, width: "100%", mx: "auto" }}>
        <Box sx={{ maxWidth: 830, width: "100%" }}>
          <Typography.Heading sx={{ color: "primary.main", mb: { xs: 3, md: 5 } }}>
            {t("privacy_policy.privacy_policy")}
          </Typography.Heading>
          <Typography.SubTitle sx={{ color: "text.primary", fontWeight: 400, mb: 3 }}>
            {t("privacy_policy.description")}
          </Typography.SubTitle>
          {PRIVACY_POLICIES.map((policy, index) => (
            <Box key={`section-${index}`} sx={{ mb: 3 }}>
              <SectionHeader title={t(`privacy_policy.section_${index + 1}`)} />
              <Box sx={{ px: 1.25 }}>
                {policy.map((item, sIndex) => (
                  <Box
                    key={`content-${index}-${sIndex}`}
                    sx={{
                      display: "flex",
                      color: "text.primary",
                      mb: item.mb ? { xs: 1.25, md: 2 } : 0,
                    }}
                  >
                    {item.sectionStart && (
                      <Typography.SubTitle sx={{ fontWeight: 400, width: 20, flexShrink: 0 }}>
                        {sIndex + 1}.
                      </Typography.SubTitle>
                    )}
                    <Box sx={{ flexGrow: 1 }}>
                      {Array.from({ length: item.count }).map((_, cIndex) => (
                        <Box key={`content-${index}-${sIndex}-${cIndex}`} sx={{ display: "flex" }}>
                          {item.contentStart === "dot" && (
                            <Typography.SubTitle sx={{ fontWeight: 400, width: 20, flexShrink: 0 }}>
                              {"・"}
                            </Typography.SubTitle>
                          )}
                          {item.contentStart === "number" && (
                            <Typography.SubTitle sx={{ fontWeight: 400, width: 20, flexShrink: 0 }}>
                              {cIndex + 1}
                            </Typography.SubTitle>
                          )}
                          <Typography.SubTitle
                            sx={{ fontWeight: item.bold ? 600 : 400, flexGrow: 1 }}
                          >
                            {t(`privacy_policy.content_${index + 1}_${sIndex + 1}_${cIndex + 1}`)}
                          </Typography.SubTitle>
                        </Box>
                      ))}
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
