import React, { useState } from "react"
import { DropzoneAreaBase, FileObject } from "react-mui-dropzone"
import { useTranslation } from "react-i18next"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { Box, Image, CircularProgress, IconButton, DeleteIcon, LinearProgress } from "src/UILibrary"
import { CustomIcon } from "./customIcon"
import { ConfirmDialog } from "src/components/shared/confirmDialog"

import { useDeleteProductMedias, useCreateProductMedia } from "src/queries/product"
import { IProductMedia } from "src/types/product"
import { useAdminSession } from "src/modules/adminSessionProvider"

import AddIcon from "src/assets/icons/add.svg"

interface DropZoneProps {
  id: string
  files: IProductMedia[]
  // eslint-disable-next-line no-unused-vars
  handleErrors: (err: AxiosError) => void
}

export const Dropzone: React.FC<DropZoneProps> = ({ id, files, handleErrors }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const session = useAdminSession()
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [uploadProgress, setUploadProgress] = useState<number>(0)

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
      queryClient.invalidateQueries(["getProductMedias", id, ""])
      setSelectedImage("")
    },
    onError: handleErrors,
  })

  const handleCreate = (newFiles: FileObject[]) => {
    if (!!newFiles.length && !isCreating) {
      createMedia({
        id,
        variantId: "",
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
        variantId: "",
        mediaId: selectedImage,
        token: session?.value.writeAdminAccessToken || "",
      })
    }
    setDeleteConfirmOpen(false)
  }

  return (
    <>
      {isCreating && <LinearProgress variant="determinate" value={uploadProgress} sx={{ mb: 1 }} />}
      {files.length === 0 ? (
        <Box
          sx={{
            flexGrow: 1,
            "& .MuiDropzoneArea-root": {
              display: "flex",
              pl: "2.625rem",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              minHeight: "150px",
              borderColor: "info.dark",
              borderRadius: "5px",
              "& .MuiTypography-root": {
                mt: 0,
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
                color: "text.secondary",
              },
            },
          }}
        >
          <DropzoneAreaBase
            dropzoneText={t("admin.productdetail.drop_file_here")}
            Icon={() => <CustomIcon />}
            acceptedFiles={[]}
            showPreviewsInDropzone={false}
            onAdd={handleCreate}
            maxFileSize={52428800} // 50MB
            fileObjects={[]}
            showAlerts={false}
          />
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            py: "0.625rem",
            "& .MuiDropzoneArea-root": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "60px",
              height: "60px",
              width: "60px",
              borderColor: "info.dark",
            },
          }}
        >
          {files.map((file, index) => (
            <Box
              key={file.mediaId}
              sx={{
                width: index === 0 ? "130px" : "60px",
                height: index === 0 ? "130px" : "60px",
                mr: index === 0 ? 1 : 2,
                position: "relative",
              }}
            >
              <Image src={file.imageUrl} />
              <Box sx={{ position: "absolute", top: 1, right: 1 }}>
                {isDeleting ? (
                  <CircularProgress color="primary" size="10px" />
                ) : (
                  <IconButton
                    color="primary"
                    sx={{ p: 0.25 }}
                    onClick={() => {
                      if (!selectedImage) {
                        setSelectedImage(file.mediaId)
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
      )}
      <ConfirmDialog
        open={deleteConfirmOpen}
        setOpen={setDeleteConfirmOpen}
        label={t("admin.productdetail.delete_image_confirm")}
        confirmLabel={t("admin.share.delete")}
        onConfirm={handleDelete}
      />
    </>
  )
}
