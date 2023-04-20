import * as Yup from "yup"
import valid from "card-validator"

export const emailSchema = () => {
  return Yup.string()
    .email("invalid_email_shape")
    .max(150, "invalid_email_length")
    .required("required")
}

export const fullNameSchema = () => {
  return Yup.string()
    .required("required")
    .min(1, "invalid_fullname_length")
    .max(50, "invalid_fullname_length")
  // Kanji or Hiragana or Katakana.
  // .matches(
  //   // [\u0020,\u00A0,\u1680,\u180E,\u2000-\u200A,\u202F,\u205F,\u3000] is space character.
  //   /^[\u3400-\u9FFF,\u3040-\u309F,\u30A0-\u30FF,\u0020,\u00A0,\u1680,\u180E,\u2000-\u200A,\u202F,\u205F,\u3000]+$/,
  //   "invalid_katakana_or_hiragana_or_kanji"
  // )
}

export const fullNameKatakanaSchema = () => {
  return Yup.string()
    .required("required")
    .min(1, "invalid_fullname_ferigana_length")
    .max(50, "invalid_fullname_ferigana_length")
  // Kanji or Hiragana or Katakana.
  // .matches(
  //   // [\u0020,\u00A0,\u1680,\u180E,\u2000-\u200A,\u202F,\u205F,\u3000] is space character.
  //   /^[\u3400-\u9FFF,\u3040-\u309F,\u30A0-\u30FF,\u0020,\u00A0,\u1680,\u180E,\u2000-\u200A,\u202F,\u205F,\u3000]+$/,
  //   "invalid_katakana_or_hiragana_or_kanji"
  // )
}

export const studentIdSchema = () => {
  return Yup.string().length(7, "invalid_studentId_length")
}

export const inquiryTypeSchema = () => {
  return Yup.string()
}

export const inquiryDetailSchema = () => {
  return Yup.string().required("required")
}

export const nameSchema = () => {
  return Yup.string()
    .required("required")
    .min(1, "invalid_manufacture_name_length")
    .max(50, "invalid_manufacture_name_length")
}

export const representativeNameSchema = () => {
  return Yup.string()
    .required("required")
    .min(1, "invalid_representative_name_length")
    .max(50, "invalid_representative_name_length")
}

export const representativeEmailSchema = () => {
  return Yup.string()
    .required("required")
    .matches(/^([a-z0-9_.-]+@[\da-z.-]+\.[a-z.]{2,6})$/gm, "invalid_email_shape")
    .max(100, "invalid_representative_email_length")
}

export const accountingDepartmentEmailSchema = () => {
  return Yup.string()
    .required("required")
    .matches(/^([a-z0-9_.-]+@[\da-z.-]+\.[a-z.]{2,6})$/gm, "invalid_email_shape")
    .max(100, "invalid_accountingdepartment_email_length")
}

export const productTitle = () => {
  return Yup.string().required("required")
}

export const productCategory = () => {
  return Yup.string().required("required")
}

export const productMakerId = () => {
  return Yup.number()
    .required("required")
    .test("valid_maker_id", (value) => !!value)
}

export const productItemCode = () => {
  return Yup.string().required("required")
}

export const productIsOnSale = () => {
  return Yup.boolean().required("required")
}

export const creditCardSchema = () => {
  return Yup.string()
    .max(16, "invalid_card_number")
    .test("test-card-number", "invalid_card_number", (value) => valid.number(value).isValid)
    .required("required")
}

export const expYearSchema = () => {
  return Yup.number().required("required")
}

export const expMonthSchema = () => {
  return Yup.number().required("required")
}

export const cvcSchema = () => {
  return Yup.string()
    .test("test-card-cvc", "invalid_cvc_number", (value) => valid.cvv(value).isValid)
    .required("required")
}

export const holderNameSchema = () => {
  return Yup.string().required("required")
}
