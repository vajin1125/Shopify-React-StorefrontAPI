import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Typography } from "src/UILibrary"
import { SectionHeader } from "src/components/shared/sectionHeader"

import { TRANSACTION_ACTIONS } from "src/constants/actOnTransaction"

export const ActOnTransaction: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Box sx={{ flexGrow: 1, mt: 20, mb: 12.5, px: 2 }}>
      <Box sx={{ maxWidth: 1200, width: "100%", mx: "auto" }}>
        <Box sx={{ maxWidth: 830, width: "100%" }}>
          <Typography.Heading sx={{ color: "primary.main", mb: { xs: 3, md: 5 } }}>
            {t("act_on_transaction.act_on_transaction")}
          </Typography.Heading>
          {TRANSACTION_ACTIONS.map((acts, index) => (
            <Box key={`section-${index}`} sx={{ mb: 3 }}>
              <SectionHeader title={t(`act_on_transaction.section_${index + 1}`)} />
              <Box sx={{ px: 1.25, color: "text.primary" }}>
                {acts.map((act, cIndex) => (
                  <Box
                    key={`content-${index}-${cIndex}`}
                    sx={{ mb: act.mb ? 1 : 0, pl: act.ml ? 2.5 : 0 }}
                  >
                    {act.format === "number" ? (
                      <Box sx={{ display: "flex" }}>
                        <Typography.SubTitle
                          sx={{ fontWeight: act.bold ? 600 : 400, width: 20, flexShrink: 0 }}
                        >
                          {`${cIndex + 1}.`}
                        </Typography.SubTitle>
                        <Typography.SubTitle sx={{ fontWeight: act.bold ? 600 : 400, flexGrow: 1 }}>
                          {t(`act_on_transaction.content_${index + 1}_${cIndex + 1}`)}
                        </Typography.SubTitle>
                      </Box>
                    ) : act.format === "dot" ? (
                      <Box sx={{ display: "flex" }}>
                        <Typography.SubTitle
                          sx={{ fontWeight: act.bold ? 600 : 400, width: 20, flexShrink: 0 }}
                        >
                          {"・"}
                        </Typography.SubTitle>
                        <Typography.SubTitle sx={{ fontWeight: act.bold ? 600 : 400, flexGrow: 1 }}>
                          {t(`act_on_transaction.content_${index + 1}_${cIndex + 1}`)}
                        </Typography.SubTitle>
                      </Box>
                    ) : (
                      <Typography.SubTitle sx={{ fontWeight: act.bold ? 600 : 400 }}>
                        {t(`act_on_transaction.content_${index + 1}_${cIndex + 1}`)}
                      </Typography.SubTitle>
                    )}
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
