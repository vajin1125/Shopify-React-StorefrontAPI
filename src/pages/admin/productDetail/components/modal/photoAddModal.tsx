import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { DropzoneAreaBase, FileObject } from "react-mui-dropzone"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import {
  Image,
  Button,
  Box,
  Grid,
  Typography,
  CircularProgress,
  IconButton,
  DeleteIcon,
  LinearProgress,
} from "src/UILibrary"
import { Modal } from "src/components/modal"
import { ConfirmDialog } from "src/components/shared/confirmDialog"

import {
  useGetProductMedias,
  useDeleteProductMedias,
  useCreateProductMedia,
} from "src/queries/product"
import { useAdminSession } from "src/modules/adminSessionProvider"
import AddIcon from "src/assets/icons/add.svg"

interface PhotoAddModalProps {
  id: string
  variantId: number
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleOpen: (open: boolean) => void
  // eslint-disable-next-line no-unused-vars
  handleErrors: (err: AxiosError) => void
}

export const PhotoAddModal: React.FC<PhotoAddModalProps> = ({
  id,
  variantId,
  open,
  handleOpen,
  handleErrors,
}) => {
  const { t } = useTranslation()
  const session = useAdminSession()
  const queryClient = useQueryClient()
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const {
    data: medias,
    isLoading: isMediasLoading,
    error: mediaErrors,
  } = useGetProductMedias(id, variantId.toString(), session?.value.readAdminAccessToken || "")

  const { mutate: createMedia, isLoading: isCreating } = useCreateProductMedia({
    onSuccess: () => {
      queryClient.invalidateQueries(["getProductMedias", id, ""])
      setSelectedImage("")
      setUploadProgress(0)
    },
    onError: (err: AxiosError) => {
      handleErrors(err)
      setUploadProgress(0)
    },
  })

  const { mutate: deleteMedia, isLoading: isDeleting } = useDeleteProductMedias({
    onSuccess: () => {
      queryClient.invalidateQueries(["getProductMedias", id, variantId])
      setSelectedImage("")
    },
    onError: handleErrors,
  })

  const handleCreate = (newFiles: FileObject[]) => {
    if (!!newFiles.length && !isCreating) {
      createMedia({
        id,
        variantId,
        image: newFiles[0].file,
        token: session?.value.writeAdminAccessToken || "",
        setProgress: setUploadProgress,
      })
    }
  }

  const handleDelete = () => {
    if (selectedImage) {
      deleteMedia({
        id,
        variantId,
        mediaId: selectedImage,
        token: session?.value.writeAdminAccessToken || "",
      })
    }
    setDeleteConfirmOpen(false)
  }

  const handleClose = () => {
    handleOpen(false)
  }

  return (
    <Modal handleClose={handleClose} open={open} title="admin.productdetail.photo_selection">
      {isCreating && <LinearProgress variant="determinate" value={uploadProgress} sx={{ mb: 1 }} />}
      {mediaErrors ? (
        <Typography.DetailHeading sx={{ color: "error.main" }}>
          {t("admin.productdetail.cannot_get_images")}
        </Typography.DetailHeading>
      ) : isMediasLoading ? (
        <CircularProgress color="primary" size="20px" />
      ) : (
        <Grid
          container
          sx={{
            bgcolor: "#FAFAFA",
            p: "1.25rem 2.375rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {(medias?.data.photos || []).map((media) => (
            <Box key={media.mediaId} sx={{ height: "90px", width: "90px", position: "relative" }}>
              <Image src={media.imageUrl} />
              <Box sx={{ position: "absolute", top: 1, right: 1 }}>
                {isDeleting && selectedImage === media.mediaId ? (
                  <CircularProgress color="primary" size="10px" />
                ) : (
                  <IconButton
                    color="primary"
                    sx={{ p: 0.25 }}
                    onClick={() => {
                      if (!selectedImage) {
                        setSelectedImage(media.mediaId)
                        setDeleteConfirmOpen(true)
                      }
                    }}
                  >
                    <DeleteIcon sx={{ width: 10, height: 10 }} />
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              "& .MuiDropzoneArea-root": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "90px",
                height: "90px",
                width: "90px",
                borderColor: "info.dark",
              },
            }}
          >
            <DropzoneAreaBase
              dropzoneText=""
              Icon={() => <Image src={AddIcon} alt="Add" />}
              acceptedFiles={[".png", ".jpg", ".jpeg"]}
              showPreviewsInDropzone={false}
              onAdd={handleCreate}
              maxFileSize={52428800} // 50MB
              fileObjects={[]}
              showAlerts={false}
            />
          </Box>
        </Grid>
      )}
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
          onClick={handleClose}
        >
          {t("admin.productdetail.addition")}
        </Button>
      </Box>
      <ConfirmDialog
        open={deleteConfirmOpen}
        setOpen={setDeleteConfirmOpen}
        label={t("admin.productdetail.delete_image_confirm")}
        confirmLabel={t("admin.share.delete")}
        onConfirm={handleDelete}
      />
    </Modal>
  )
}
