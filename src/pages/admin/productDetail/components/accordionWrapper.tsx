import React, { PropsWithChildren } from "react"

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ExpandMoreIcon,
  Typography,
} from "src/UILibrary"

export const AccordionWrapper: React.FC<PropsWithChildren<{ label: string }>> = ({
  label,
  children,
}) => {
  return (
    <Accordion
      disableGutters
      sx={{ mb: "1.5rem", bgcolor: "background.default", "&:before": { height: 0 } }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          minHeight: "1.25rem",
          p: "0.375rem 1.25rem",
          "& .MuiAccordionSummary-content": { m: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "3rem",
            px: "1rem",
          }}
        >
          <Typography.Title sx={{ fontWeight: 600, lineHeight: "1.25rem", letterSpacing: "2px" }}>
            {label}
          </Typography.Title>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          borderTop: "2px solid",
          borderColor: "info.dark",
          p: 0,
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  )
}
