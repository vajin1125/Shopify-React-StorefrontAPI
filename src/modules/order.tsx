import { formatDate } from "./date"

export const formatDateOfOrder = (
  date: string | undefined,
  variant: "datetime" | "date" | "time" = "datetime"
) => {
  if (!date) {
    return ""
  }
  switch (variant) {
    case "datetime":
      return formatDate(date, "yyyy/MM/dd hh:mm")
    case "date":
      return formatDate(date, "yyyy/MM/dd")
    case "time":
      return formatDate(date, "hh:mm")
    default:
      return ""
  }
}
