import React, { useState } from "react"
import { Box, BoxProps, Skeleton } from "@mui/material"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

export const Image: React.FC<BoxProps & { src: string; alt?: string }> = ({
  src,
  alt,
  sx,
  ...rest
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Box
      sx={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        position: "relative",
        "& img": { objectFit: "cover", maxWidth: "100%", height: "auto" },
        ...sx,
      }}
      {...rest}
    >
      {loading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ position: "absolute", width: "100%", height: "100%" }}
        />
      )}
      <LazyLoadImage
        alt={alt}
        src={src}
        effect="blur"
        beforeLoad={() => setLoading(true)}
        afterLoad={() => setLoading(false)}
      />
    </Box>
  )
}
