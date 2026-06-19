import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { HiPlusCircle, HiTrash } from 'react-icons/hi'
import { Field, FieldArray, FormikErrors, FormikTouched } from 'formik'
import RichTextEditor from '@/components/shared/RichTextEditor'
import { FormModel } from './ProductForm'

type ProductFeaturesProps = {
    touched: FormikTouched<FormModel>
    errors: FormikErrors<FormModel>
    values: FormModel
}

const ProductFeatures = (props: ProductFeaturesProps) => {
    const { values } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <div className="flex items-center justify-between mb-4">
                <h5>Features / Extra Sections</h5>
                <p>Add sections like "Standard Packing", "Current Rating", etc.</p>
            </div>
            <FieldArray name="features">
                {({ push, remove }) => (
                    <div>
                        {values.features && values.features.length > 0 && (
                            <div className="space-y-6">
                                {values.features.map((feature, index) => (
                                    <div key={index} className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-1/2">
                                                <FormItem label="Feature Title">
                                                    <Field
                                                        name={`features.${index}.title`}
                                                        component={Input}
                                                        placeholder="e.g. Standard Packing"
                                                    />
                                                </FormItem>
                                            </div>
                                            <Button
                                                shape="circle"
                                                size="sm"
                                                icon={<HiTrash />}
                                                onClick={() => remove(index)}
                                                type="button"
                                                className="text-red-500"
                                            />
                                        </div>
                                        <FormItem label="Description">
                                            <Field name={`features.${index}.description`}>
                                                {({ field, form }: any) => (
                                                    <RichTextEditor
                                                        value={field.value}
                                                        onChange={(val) =>
                                                            form.setFieldValue(field.name, val)
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-4">
                            <Button
                                type="button"
                                className="ltr:mr-2 rtl:ml-2"
                                onClick={() => push({ id: `feat-${Date.now()}`, title: '', description: '' })}
                                icon={<HiPlusCircle />}
                            >
                                Add Feature Section
                            </Button>
                        </div>
                    </div>
                )}
            </FieldArray>
        </AdaptableCard>
    )
}

export default ProductFeatures
