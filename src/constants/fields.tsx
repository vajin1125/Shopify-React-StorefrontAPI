import React from "react"
import { Link } from "react-router-dom"

import { Typography } from "src/UILibrary"
import { FieldDefinition } from "src/components/adminTable"
import { MerchandiseManagement } from "src/types/merchandise"
import { ICustomer } from "src/types/user"

export const ADMIN_PRODUCT_LIST_FIELDS: FieldDefinition<MerchandiseManagement>[] = [
  {
    attribute: "id",
    label: "admin.productlist.id",
    width: 120,
  },
  {
    attribute: "name",
    label: "admin.productlist.product_name",
  },
  {
    attribute: "is_on_sale",
    label: "admin.productlist.on_sale",
    width: 100,
  },
  {
    attribute: "category",
    label: "admin.productlist.category",
    width: 120,
  },
  {
    attribute: "sales_period",
    label: "admin.productlist.sales_period",
  },
  {
    attribute: "for_sale",
    label: "admin.productlist.for_sale",
  },
]

export const ADMIN_USER_LIST_FIELDS: FieldDefinition<ICustomer>[] = [
  {
    attribute: "entranceYear",
    label: "admin.userlist.entrance_year",
    width: 120,
  },
  {
    attribute: "fullName",
    label: "admin.userlist.full_name",
    widget: ({ value, row }) => (
      <Link to={`/admin/user/${row?.id}`} style={{ textDecoration: "none" }}>
        <Typography.Action
          sx={{
            color: "text.primary",
            fontWeight: 400,
            lineHeight: "20px",
            "&:hover": {
              color: "text.secondary",
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          {value}
        </Typography.Action>
      </Link>
    ),
  },
  {
    attribute: "school",
    label: "admin.userlist.school_building",
    width: 100,
  },
  {
    attribute: "department",
    label: "admin.userlist.subject",
    width: 120,
  },
  {
    attribute: "grade",
    label: "admin.userlist.school_year",
  },
  {
    attribute: "classroom",
    label: "admin.userlist.class",
  },
  {
    attribute: "studentId",
    label: "admin.userlist.student_number",
  },
]
