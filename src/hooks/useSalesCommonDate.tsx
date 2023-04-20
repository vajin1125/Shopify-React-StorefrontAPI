import { useMemo } from "react"

export const useSalesCommonDate = (dates: string[]) => {
  const result = useMemo(() => {
    const datesObj = dates.reduce(
      (prev: Record<string, number>, curr: string) => ({ ...prev, [curr]: (prev[curr] || 0) + 1 }),
      {}
    )
    const sortedDates = Object.keys(datesObj).sort((prev, curr) =>
      datesObj[prev] < datesObj[curr] ? 1 : datesObj[prev] > datesObj[curr] ? -1 : 0
    )
    return { date: sortedDates[0], isDifferent: sortedDates.length > 1 }
  }, [dates])
  return result
}
