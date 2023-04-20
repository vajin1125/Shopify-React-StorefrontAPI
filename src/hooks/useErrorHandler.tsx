import { useTranslation } from "react-i18next"
import { AxiosError } from "axios"

import { usePushAlerts } from "src/hooks/alerts"

export const useErrorHandler = () => {
  const { t } = useTranslation()
  const pushAlerts = usePushAlerts()

  const handleError = (err: AxiosError) => {
    let message

    switch (err.status) {
      case 400:
        message = t("errors.error_400")
        break
      case 403:
        message = t("errors.error_403")
        break
      case 500:
        message = t("errors.error_500")
        break
      default:
        message = t("errors.error_other")
    }

    pushAlerts({ message: message, color: "error" })
  }
  return handleError
}
