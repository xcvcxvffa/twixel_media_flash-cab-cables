import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { HiPlusCircle, HiTrash } from 'react-icons/hi'
import { Field, FieldArray, FormikErrors, FormikTouched } from 'formik'
import { FormModel } from './ProductForm'

type ProductTechnicalDetailsProps = {
    touched: FormikTouched<FormModel>
    errors: FormikErrors<FormModel>
    values: FormModel
}

const ProductTechnicalDetails = (props: ProductTechnicalDetailsProps) => {
    const { values } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <div className="flex items-center justify-between mb-4">
                <h5>Technical Details</h5>
                <p>Key-value pairs for technical specs (e.g. Standard: IS 7098)</p>
            </div>
            <FieldArray name="technicalDetails">
                {({ push, remove }) => (
                    <div>
                        {values.technicalDetails && values.technicalDetails.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {values.technicalDetails.map((detail, index) => (
                                    <div key={index} className="flex gap-2 items-start">
                                        <div className="flex-1 space-y-2">
                                            <Field
                                                name={`technicalDetails.${index}.label`}
                                                component={Input}
                                                placeholder="Label (e.g. Voltage Grade)"
                                                size="sm"
                                            />
                                            <Field
                                                name={`technicalDetails.${index}.value`}
                                                component={Input}
                                                placeholder="Value (e.g. 11 KV)"
                                                size="sm"
                                            />
                                        </div>
                                        <Button
                                            shape="circle"
                                            size="sm"
                                            icon={<HiTrash />}
                                            onClick={() => remove(index)}
                                            type="button"
                                            className="text-red-500 mt-1"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-4">
                            <Button
                                type="button"
                                className="ltr:mr-2 rtl:ml-2"
                                onClick={() => push({ id: `tech-${Date.now()}`, label: '', value: '' })}
                                icon={<HiPlusCircle />}
                            >
                                Add Detail
                            </Button>
                        </div>
                    </div>
                )}
            </FieldArray>
        </AdaptableCard>
    )
}

export default ProductTechnicalDetails
