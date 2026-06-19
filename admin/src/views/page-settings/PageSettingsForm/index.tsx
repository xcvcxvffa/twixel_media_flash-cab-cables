import { useState, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import ApiService from '@/services/ApiService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import Card from '@/components/ui/Card'
import Upload from '@/components/ui/Upload'
import { HiOutlineCloudUpload } from 'react-icons/hi'

const validationSchema = Yup.object().shape({
    meta_title: Yup.string().max(255, 'Meta title must be at most 255 characters'),
    meta_keywords: Yup.string(),
    meta_description: Yup.string(),
})

const getSeoStatus = (text: string, type: 'title' | 'description') => {
    const len = text?.length || 0;
    if (len === 0) return null;

    if (type === 'title') {
        if (len < 30) return { text: 'Too Short', color: 'text-amber-500' };
        if (len <= 60) return { text: 'Great', color: 'text-emerald-500' };
        return { text: 'Too Long', color: 'text-red-500' };
    } else {
        if (len < 100) return { text: 'Too Short', color: 'text-amber-500' };
        if (len <= 160) return { text: 'Great', color: 'text-emerald-500' };
        return { text: 'Too Long', color: 'text-red-500' };
    }
}


const PageSettingsForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [pageName, setPageName] = useState('')
    const [initialData, setInitialData] = useState({
        meta_title: '',
        meta_keywords: '',
        meta_description: '',
        other_settings: {
            breadcrumb_image: ''
        }
    })

    useEffect(() => {
        if (id) {
            fetchPageSettings(id)
        }
    }, [id])

    const fetchPageSettings = async (pageId: string) => {
        try {
            const resp = await ApiService.fetchData<any>({
                url: `/page-settings/${pageId}`,
                method: 'get',
            })
            if (resp.data && resp.data.data) {
                const data = resp.data.data
                setPageName(data.page_name)
                setInitialData({
                    meta_title: data.meta_title || '',
                    meta_keywords: data.meta_keywords || '',
                    meta_description: data.meta_description || '',
                    other_settings: data.other_settings || { breadcrumb_image: '' }
                })
            }
        } catch (error) {
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to fetch page settings
                </Notification>,
                { placement: 'top-center' }
            )
        }
    }

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            await ApiService.fetchData({
                url: `/page-settings/${id}`,
                method: 'put',
                data: values
            })
            
            toast.push(
                <Notification title="Success" type="success">
                    Page settings updated successfully
                </Notification>,
                { placement: 'top-center' }
            )
            navigate('/admin/page-settings')
        } catch (error: any) {
            toast.push(
                <Notification title="Error" type="danger">
                    {error?.response?.data?.message || 'Failed to update page settings'}
                </Notification>,
                { placement: 'top-center' }
            )
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Card>
            <p className="mb-6 text-gray-500">Update SEO tags and other configurations for the <strong className="text-gray-900">{pageName}</strong> page.</p>
            
            <Formik
                enableReinitialize
                initialValues={initialData}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors, isSubmitting, values, setFieldValue }) => {
                    const titleStatus = getSeoStatus(values.meta_title, 'title')
                    const descStatus = getSeoStatus(values.meta_description, 'description')
                    
                    const handleImageUpload = async (files: File[]) => {
                        if (files && files.length > 0) {
                            const formData = new FormData()
                            formData.append('file', files[0])
                            
                            try {
                                const resp = await ApiService.fetchData<any, FormData>({
                                    url: '/upload',
                                    method: 'post',
                                    data: formData,
                                    headers: { 'Content-Type': 'multipart/form-data' }
                                })
                                if (resp.data && resp.data.url) {
                                    setFieldValue('other_settings.breadcrumb_image', resp.data.url)
                                    toast.push(
                                        <Notification title="Uploaded" type="success">Image uploaded successfully</Notification>,
                                        { placement: 'top-center' }
                                    )
                                }
                            } catch (error) {
                                toast.push(
                                    <Notification title="Error" type="danger">Failed to upload image</Notification>,
                                    { placement: 'top-center' }
                                )
                            }
                        }
                    }

                    return (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Meta Title"
                                invalid={errors.meta_title && touched.meta_title}
                                errorMessage={errors.meta_title as string}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="meta_title"
                                    placeholder="Enter SEO Meta Title"
                                    component={Input}
                                />
                                <div className="mt-1 flex justify-between items-center text-xs">
                                    <span className="text-gray-500">For optimal SEO, title should be around 60 characters.</span>
                                    {titleStatus && (
                                        <span className={`font-semibold ${titleStatus.color}`}>
                                            {titleStatus.text} ({values.meta_title?.length || 0}/60 chars)
                                        </span>
                                    )}
                                </div>
                            </FormItem>

                            <FormItem
                                label="Meta Keywords"
                                invalid={errors.meta_keywords && touched.meta_keywords}
                                errorMessage={errors.meta_keywords as string}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="meta_keywords"
                                    placeholder="keyword1, keyword2, keyword3"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="Meta Description"
                                invalid={errors.meta_description && touched.meta_description}
                                errorMessage={errors.meta_description as string}
                            >
                                <Field
                                    textArea
                                    type="text"
                                    autoComplete="off"
                                    name="meta_description"
                                    placeholder="Enter a brief description for search engines..."
                                    component={Input}
                                />
                                <div className="mt-1 flex justify-between items-center text-xs">
                                    <span className="text-gray-500">For optimal SEO, description should be around 160 characters.</span>
                                    {descStatus && (
                                        <span className={`font-semibold ${descStatus.color}`}>
                                            {descStatus.text} ({values.meta_description?.length || 0}/160 chars)
                                        </span>
                                    )}
                                </div>
                            </FormItem>

                            {pageName?.toLowerCase() !== 'home' && (
                                <FormItem label="Breadcrumb Background Image">
                                    <Upload 
                                        className="cursor-pointer"
                                        showList={false}
                                        uploadLimit={1}
                                        onChange={handleImageUpload}
                                    >
                                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            {values.other_settings?.breadcrumb_image ? (
                                                <div className="relative">
                                                    <img 
                                                        src={values.other_settings.breadcrumb_image} 
                                                        alt="Breadcrumb Preview" 
                                                        className="w-full h-32 object-cover rounded"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                        <span className="text-white font-medium flex items-center gap-2">
                                                            <HiOutlineCloudUpload size={24} /> Click to change
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="py-6 flex flex-col items-center justify-center">
                                                    <HiOutlineCloudUpload size={40} className="text-gray-400 mb-2" />
                                                    <p className="font-semibold text-gray-700 dark:text-gray-300">Upload Image</p>
                                                    <p className="text-sm text-gray-500">Supports JPG, PNG, WEBP</p>
                                                </div>
                                            )}
                                        </div>
                                    </Upload>
                                </FormItem>
                            )}

                            <div className="flex justify-end gap-2 mt-6">
                                <Button
                                    type="button"
                                    onClick={() => navigate('/admin/page-settings')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="solid"
                                    type="submit"
                                    loading={isSubmitting}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                    )
                }}
            </Formik>
        </Card>
    )
}

export default PageSettingsForm
