import ScissorIcon from "src/assets/icons/scissor.svg"
import BookIcon from "src/assets/icons/book.svg"
import IdenticationIcon from "src/assets/icons/identication.svg"

export const CATEGORY_LIST = [
  {
    key: "external_exam",
    label: "sidebar.certification",
    link: "",
  },
  {
    key: "supplemental_exam",
    label: "sidebar.supplementary_exam",
    link: "",
  },
  {
    key: "textbook",
    label: "sidebar.textbook",
    link: "",
  },
  {
    key: "practice_or_training",
    label: "sidebar.courses",
    link: "",
  },
  {
    key: "student_id_reIssue",
    label: "sidebar.student_card",
    link: "",
  },
  {
    key: "picture_of_job_interview",
    label: "sidebar.employment_photographs",
    link: "",
  },
]

export const CUSTOMER_SIDEBAR = [
  {
    label: "sidebar.test",
    icon: ScissorIcon,
    hasBottom: true,
    items: [
      { label: "sidebar.certification", link: "/search", category: "certification" },
      { label: "sidebar.supplementary_exam", link: "/search", category: "supplementary_exam" },
    ],
  },
  {
    label: "sidebar.class",
    icon: BookIcon,
    hasBottom: true,
    items: [
      { label: "sidebar.textbook", link: "/search", category: "textbook" },
      { label: "sidebar.courses", link: "/search", category: "courses" },
    ],
  },
  {
    label: "sidebar.identification",
    icon: IdenticationIcon,
    hasBottom: true,
    items: [
      { label: "sidebar.student_card", link: "/search", category: "student_card" },
      {
        label: "sidebar.employment_photographs",
        link: "/search",
        category: "employment_photographs",
      },
    ],
  },
]
