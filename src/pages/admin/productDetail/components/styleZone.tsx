import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Image, Typography } from "src/UILibrary"
import AddIcon from "src/assets/icons/add.svg"

type StyleZoneProps = {
  // eslint-disable-next-line no-unused-vars
  onClick: () => void
}

export const StyleZone = ({ onClick }: StyleZoneProps) => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "40px",
        height: "40px",
        borderRadius: "5px",
        pl: "1rem",
        border: "2px dashed",
        borderColor: "info.dark",
        width: "100%",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      <Image src={AddIcon} />
      <Typography.Description
        sx={{
          fontWeight: 400,
          lineHeight: "1.25rem",
          ml: 1,
          color: "text.secondary",
        }}
      >
        {t("admin.productdetail.add_style")}
      </Typography.Description>
    </Box>
  )
}
