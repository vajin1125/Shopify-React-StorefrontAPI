import React from "react"
import { useTranslation } from "react-i18next"

import { Label } from "src/types/sidebar"
import { Accordion, AccordionDetails, AccordionSummary, ExpandMoreIcon } from "src/UILibrary"
import { SidebarLabel } from "./sidebarLabel"
import { IconProps } from "src/types/icon"

export const SidebarAccordion = ({
  expanded,
  handleChange,
  label,
  labelIcon,
  sublist,
}: {
  expanded: boolean
  handleChange: () => void
  label: string
  labelIcon?: React.FC<IconProps>
  sublist?: Label[]
}) => {
  const { t } = useTranslation()
  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      elevation={0}
      disableGutters
      sx={{
        borderBottom: "1px solid",
        borderBottomColor: "primary.light",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={`${label}bh-header`}
        sx={{
          height: "2rem",
          minHeight: "2.5rem",
          "&.Mui-expanded": { minHeight: "2.5rem" },
          "& .MuiAccordionSummary-content": { my: 0 },
          bgcolor: "info.dark",
        }}
      >
        <SidebarLabel label={t(label)} Icon={labelIcon} />
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: "background.default", py: "0.25rem" }}>
        {sublist?.map(({ id, name, link }) => (
          <SidebarLabel key={id} label={t(name)} link={link} />
        ))}
      </AccordionDetails>
    </Accordion>
  )
}
