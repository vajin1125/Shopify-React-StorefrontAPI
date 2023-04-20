import React from "react"
import { useNavigate } from "react-router-dom"

import { MobileCategoryItem } from "./components/mobileCategoryItem"

import { Grid } from "src/UILibrary"
import { PageContainer } from "src/components/client/pageContainer"
import { CUSTOMER_SIDEBAR } from "src/constants/customerSidebar"
import { useProductSearch } from "src/hooks/useProductSearch"

export const Top = () => {
  const navigate = useNavigate()
  const { onSelectCategories } = useProductSearch()

  const handleClick = (link: string, category: string) => {
    onSelectCategories([category])
    navigate(link)
  }
  return (
    <PageContainer>
      <Grid container rowSpacing={3} columnSpacing={2} sx={{ p: "2rem 0.875rem" }}>
        {CUSTOMER_SIDEBAR.map(({ label, icon, items }) => (
          <React.Fragment key={label}>
            {items.map(({ label, link, category }) => (
              <Grid item key={`mobile-${label}`} xs={6}>
                <MobileCategoryItem
                  icon={icon}
                  label={label}
                  onClick={() => handleClick(link, category)}
                />
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </PageContainer>
  )
}
