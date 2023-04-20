export const makeQuery = ({
  title,
  categories,
  tags,
}: {
  title: string
  categories: string[]
  tags: string[]
}) => {
  let result = ""
  let hasMore = false
  let cats = categories.filter((c) => c !== "unspecified")

  if (title) {
    if (hasMore) {
      result += " AND "
    } else {
      hasMore = true
    }
    result += `(title:${title})`
  }

  if (cats.length) {
    if (hasMore) {
      result += " AND "
    } else {
      hasMore = true
    }
    result += `(product_type:${cats.join(" OR ")})`
  }

  if (tags.length) {
    if (hasMore) {
      result += " AND "
    } else {
      hasMore = true
    }
    result += `(tag:${tags.join(" AND ")})`
  }

  return result
}
