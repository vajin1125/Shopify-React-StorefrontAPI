import { useState } from "react"
import { AlertColor, SnackbarOrigin } from "@mui/material"

import { NotificationProps } from "src/UILibrary/notification"

const AUTO_HIDE_DURATION = 6000
const ANCHOR_ORIGIN: SnackbarOrigin = {
  vertical: "top",
  horizontal: "center",
}

const useNotification = (type: AlertColor, message: string) => {
  const [show, setShow] = useState<boolean>(false)

  const notify = () => setShow(true)

  const props: NotificationProps = {
    open: show,
    autoHideDuration: AUTO_HIDE_DURATION,
    onClose: () => setShow(false),
    message,
    anchorOrigin: ANCHOR_ORIGIN,
    type,
  }

  return { props, notify }
}

export default useNotification
