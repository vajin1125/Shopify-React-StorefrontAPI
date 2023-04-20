import React from "react"

import { Typography } from "src/UILibrary"

interface SectionHeaderProps {
  title: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Typography.Title
      sx={{
        letterSpacing: "2px",
        px: 1.25,
        py: 0.75,
        color: "text.primary",
        bgcolor: "background.paper",
        mb: { xs: 1.25, md: 2 },
      }}
    >
      {title}
    </Typography.Title>
  )
}
