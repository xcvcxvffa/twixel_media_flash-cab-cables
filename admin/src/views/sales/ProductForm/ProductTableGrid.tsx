import React from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import { Field, useFormikContext } from 'formik'
import { Editor } from '@tinymce/tinymce-react'
import { FormModel } from './ProductForm'

type ProductTableGridProps = {
    values: FormModel
}

const ProductTableGrid = (props: ProductTableGridProps) => {
    const { setFieldValue } = useFormikContext<FormModel>()

    const defaultTableHtml = `
        <table style="border-collapse: collapse; width: 100%;" border="1">
            <tbody>
                <tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
                <tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
                <tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
                <tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
                <tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr>
            </tbody>
        </table>
    `

    return (
        <AdaptableCard className="mb-4" divider>
            <style>
                {`
                /* Completely hide ALL TinyMCE notifications/banners */
                .tox-notifications-container { display: none !important; }
                .tox-promotion { display: none !important; }
                .tox-statusbar__right-container { display: none !important; }
                `}
            </style>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h5>Spreadsheet Builder</h5>
                    <p className="text-sm text-gray-500 mt-1">
                        Build your complex tables here. Highlight multiple cells to <b>Merge</b> them, add rows/columns, and set properties.
                    </p>
                </div>
            </div>
            
            <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-2 bg-blue-50/30 dark:bg-gray-800">
                <FormItem>
                    <Field name="specificationHtml">
                        {({ field, form }: any) => {
                            // Safe fallback in case old DB data has an object
                            const isString = typeof field.value === 'string'
                            const currentValue = isString ? field.value : defaultTableHtml

                            return (
                                <Editor
                                    apiKey="b1f5nvis1uj0nopyudtz1hszt0rgmgsky6gogr2t1ncyut08"
                                    value={currentValue}
                                    init={{
                                        height: 600,
                                        menubar: false,
                                        plugins: ['table', 'code'],
                                        toolbar: 'table tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | tablemergecells tablesplitcells | tablecellprops tableprops | code',
                                        content_style: `
                                            body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; margin: 10px; }
                                            table { border-collapse: collapse; width: 100%; border: 1px solid #ccc; }
                                            td, th { border: 1px solid #ccc; padding: 10px; min-width: 50px; }
                                            td[data-mce-selected], th[data-mce-selected] { background-color: #b4d7ff !important; }
                                        `,
                                        table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | tablemergecells tablesplitcells | tablecellvalign tablecellhalign',
                                        table_appearance_options: false,
                                        table_advtab: false,
                                        table_cell_advtab: false,
                                        table_row_advtab: false,
                                        branding: false,
                                        promotion: false, // Hides the thunderbolt promotion
                                    }}
                                    onEditorChange={(content: string) => {
                                        form.setFieldValue(field.name, content)
                                    }}
                                />
                            )
                        }}
                    </Field>
                </FormItem>
            </div>
        </AdaptableCard>
    )
}

export default ProductTableGrid
