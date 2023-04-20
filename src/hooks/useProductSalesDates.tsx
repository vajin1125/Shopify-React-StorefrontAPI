import { Control, useController } from "react-hook-form"
import { IAdminProductItem } from "src/types/product"

export const useProductSalesDates = (control: Control<IAdminProductItem, any>) => {
  const {
    field: { value: osakaSalesStartDate, onChange: onOsakaSalesStartDateChange },
  } = useController({ name: "osakaSalesStartDate", control })
  const {
    field: { value: osakaSalesEndDate, onChange: onOsakaSalesEndDateChange },
  } = useController({ name: "osakaSalesEndDate", control })
  const {
    field: { value: kumamotoSalesStartDate, onChange: onKumamotoSalesStartDateChange },
  } = useController({ name: "kumamotoSalesStartDate", control })
  const {
    field: { value: kumamotoSalesEndDate, onChange: onKumamotoSalesEndDateChange },
  } = useController({ name: "kumamotoSalesEndDate", control })
  const {
    field: { value: kobeSalesStartDate, onChange: onKobeSalesStartDateChange },
  } = useController({ name: "kobeSalesStartDate", control })
  const {
    field: { value: kobeSalesEndDate, onChange: onKobeSalesEndDateChange },
  } = useController({ name: "kobeSalesEndDate", control })
  const {
    field: {
      value: osakaBeautyAndBridalSalesStartDate,
      onChange: onOsakaBeautyAndBridalSalesStartDateChange,
    },
  } = useController({ name: "osakaBeautyAndBridalSalesStartDate", control })
  const {
    field: {
      value: osakaBeautyAndBridalSalesEndDate,
      onChange: onOsakaBeautyAndBridalSalesEndDateChange,
    },
  } = useController({ name: "osakaBeautyAndBridalSalesEndDate", control })

  return {
    osakaSalesStartDate,
    osakaSalesEndDate,
    kumamotoSalesStartDate,
    kumamotoSalesEndDate,
    kobeSalesStartDate,
    kobeSalesEndDate,
    osakaBeautyAndBridalSalesStartDate,
    osakaBeautyAndBridalSalesEndDate,
    onOsakaSalesStartDateChange,
    onOsakaSalesEndDateChange,
    onKumamotoSalesStartDateChange,
    onKumamotoSalesEndDateChange,
    onKobeSalesStartDateChange,
    onKobeSalesEndDateChange,
    onOsakaBeautyAndBridalSalesStartDateChange,
    onOsakaBeautyAndBridalSalesEndDateChange,
  }
}
