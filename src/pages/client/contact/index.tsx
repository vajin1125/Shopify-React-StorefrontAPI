import React, { useState, useEffect } from "react"
import { useForm } from "@formspree/react"

import { Box } from "src/UILibrary"
import { ContactInputs } from "./components/contactInputs"
import { ConfirmInputs } from "./components/confirmInputs"
import { Complete } from "./components/complete"
import { ContactFormInput } from "src/types/contact"

export const Contact: React.FC = () => {
  const [step, setStep] = useState<number>(0)
  const [inquiryData, setInquiryData] = useState<ContactFormInput | undefined>(undefined)

  const [state, handleSubmit] = useForm(process.env.REACT_APP_FORMSPREE_ID || "")

  useEffect(() => {
    if (state.succeeded) {
      setStep(2)
    }
  }, [state.succeeded])

  return (
    <Box sx={{ flexGrow: 1, px: { xs: 2, md: 10 }, pt: { xs: 6, md: 16 }, pb: 6 }}>
      {step === 1 && !!inquiryData ? (
        <Box sx={{ maxWidth: 850, width: "100%" }}>
          <ConfirmInputs
            data={inquiryData}
            handleSubmit={handleSubmit}
            isSending={state.submitting}
          />
        </Box>
      ) : step === 2 ? (
        <Complete />
      ) : (
        <Box sx={{ maxWidth: 850, width: "100%" }}>
          <ContactInputs
            initialValues={{
              fullName: "",
              fullNameKatakana: "",
              email: "",
              studentId: "",
              inquiryType: "",
              inquiryDetail: "",
            }}
            setData={setInquiryData}
            setStep={setStep}
          />
        </Box>
      )}
    </Box>
  )
}
