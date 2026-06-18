import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { HiPlusCircle, HiTrash } from 'react-icons/hi'
import { Field, FieldArray, FormikErrors, FormikTouched } from 'formik'
import Upload from '@/components/ui/Upload'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { FormModel } from './ProductForm'

type ProductApplicationsProps = {
    touched: FormikTouched<FormModel>
    errors: FormikErrors<FormModel>
    values: FormModel
}

const ProductApplications = (props: ProductApplicationsProps) => {
    const { values } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <div className="flex items-center justify-between mb-4">
                <h5>Applications</h5>
                <p>Add application icons and titles for this product</p>
            </div>
            <FieldArray name="applications">
                {({ push, remove }) => (
                    <div>
                        {values.applications && values.applications.length > 0 && (
                            <div className="space-y-4">
                                {values.applications.map((app, index) => (
                                    <div key={index} className="flex items-center gap-4 border p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                                        <div className="w-32 h-32 shrink-0">
                                            <Field name={`applications.${index}.icon`}>
                                                {({ field, form }: any) => {
                                                    const onUpload = (files: File[]) => {
                                                        if (files.length > 0) {
                                                            const reader = new FileReader()
                                                            reader.onload = (e) => {
                                                                if (e.target?.result) {
                                                                    form.setFieldValue(field.name, e.target.result as string)
                                                                }
                                                            }
                                                            reader.readAsDataURL(files[0])
                                                        }
                                                    }
                                                    return (
                                                        <Upload
                                                            draggable
                                                            className="cursor-pointer h-full w-full"
                                                            showList={false}
                                                            uploadLimit={1}
                                                            onChange={onUpload}
                                                        >
                                                            {field.value ? (
                                                                <img className="w-full h-full object-contain rounded" src={field.value} alt="icon" />
                                                            ) : (
                                                                <div className="flex flex-col items-center justify-center h-full text-xs font-medium text-gray-500 dark:text-gray-300">
                                                                    <DoubleSidedImage className="w-8 h-8 mb-2 opacity-70" src="/img/others/upload.png" darkModeSrc="/img/others/upload-dark.png" />
                                                                    <span>Upload</span>
                                                                </div>
                                                            )}
                                                        </Upload>
                                                    )
                                                }}
                                            </Field>
                                        </div>
                                        <div className="flex-1">
                                            <FormItem label="Title">
                                                <Field
                                                    name={`applications.${index}.title`}
                                                    component={Input}
                                                    placeholder="e.g., Industrial Plants"
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
                                ))}
                            </div>
                        )}
                        <div className="mt-4">
                            <Button
                                type="button"
                                className="ltr:mr-2 rtl:ml-2"
                                onClick={() => push({ id: `app-${Date.now()}`, title: '', icon: '' })}
                                icon={<HiPlusCircle />}
                            >
                                Add Application
                            </Button>
                        </div>
                    </div>
                )}
            </FieldArray>
        </AdaptableCard>
    )
}

export default ProductApplications
