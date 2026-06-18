import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

type FormFieldsName = {
    name: string
    slug: string
    description: string
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const BasicInformationFields = (props: BasicInformationFields) => {
    const { touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic product information</p>
            <FormItem
                label="Product Name"
                invalid={(errors.name && touched.name) as boolean}
                errorMessage={errors.name}
            >
                <Field name="name">
                    {({ field, form }: FieldProps) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Name"
                            {...field}
                            onChange={(e) => {
                                const val = e.target.value
                                form.setFieldValue(field.name, val)
                                // Auto generate slug
                                const generatedSlug = val
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, '-')
                                    .replace(/(^-|-$)+/g, '')
                                form.setFieldValue('slug', generatedSlug)
                            }}
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Slug"
                invalid={(errors.slug && touched.slug) as boolean}
                errorMessage={errors.slug}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="slug"
                    placeholder="Slug"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Description"
                labelClass="!justify-start"
                invalid={(errors.description && touched.description) as boolean}
                errorMessage={errors.description}
            >
                <Field name="description">
                    {({ field, form }: FieldProps) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
