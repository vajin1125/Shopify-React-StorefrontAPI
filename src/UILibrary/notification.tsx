import React from "react"
import { Alert as MuiAlert, AlertProps, Snackbar, SnackbarProps, AlertColor } from "@mui/material"
import { AlertCheckIcon } from "src/assets/icons/AlertCheckIcon"

export interface NotificationProps extends SnackbarProps {
  type: AlertColor
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return (
    <MuiAlert
      ref={ref}
      variant="filled"
      icon={<AlertCheckIcon width="20" height="18" />}
      sx={{
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: "20px",
        letterSpacing: "2px",
        py: 0.25,
        px: 3.25,
        borderRadius: "10px",
      }}
      {...props}
    />
  )
})

export default function Notification({ message, type, ...snackbarProps }: NotificationProps) {
  return (
    <Snackbar sx={{ top: "108px" }} {...snackbarProps}>
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  )
}
