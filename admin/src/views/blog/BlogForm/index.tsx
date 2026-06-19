import { useState, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { RichTextEditor } from '@/components/shared'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import ApiService from '@/services/ApiService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import Card from '@/components/ui/Card'
import Upload from '@/components/ui/Upload'

const statuses = [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
]

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    slug: Yup.string().required('Slug is required'),
    content: Yup.string().required('Content is required'),
    category: Yup.string().required('Category is required'),
})

const BlogForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = Boolean(id)
    const [initialData, setInitialData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        category: '',
        status: 'draft',
        image: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: ''
    })

    useEffect(() => {
        if (isEdit && id) {
            fetchBlog(id)
        }
    }, [id])

    const fetchBlog = async (blogId: string) => {
        try {
            const resp = await ApiService.fetchData<any>({
                url: `/blogs/${blogId}`,
                method: 'get',
            })
            if (resp.data) {
                setInitialData(resp.data)
            }
        } catch (error) {
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to fetch blog details
                </Notification>,
                { placement: 'top-center' }
            )
        }
    }

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            const url = isEdit ? `/blogs/${id}` : '/blogs'
            const method = isEdit ? 'put' : 'post'
            
            await ApiService.fetchData({
                url,
                method,
                data: values
            })
            
            toast.push(
                <Notification title="Success" type="success">
                    Blog {isEdit ? 'updated' : 'created'} successfully
                </Notification>,
                { placement: 'top-center' }
            )
            navigate('/admin/blog')
        } catch (error: any) {
            toast.push(
                <Notification title="Error" type="danger">
                    {error?.response?.data?.message || 'Failed to save blog'}
                </Notification>,
                { placement: 'top-center' }
            )
        } finally {
            setSubmitting(false)
        }
    }

    const handleUpload = async (files: File[], form: any, field: any) => {
        if (files && files.length > 0) {
            const formData = new FormData()
            formData.append('file', files[0])
            
            try {
                const response = await ApiService.fetchData<any, FormData>({
                    url: '/upload',
                    method: 'post',
                    data: formData,
                })
                
                if (response.data && response.data.url) {
                    form.setFieldValue(field.name, response.data.url)
                    toast.push(
                        <Notification title="Success" type="success">
                            Image uploaded successfully
                        </Notification>,
                        { placement: 'top-center' }
                    )
                }
            } catch (error) {
                toast.push(
                    <Notification title="Error" type="danger">
                        Failed to upload image
                    </Notification>,
                    { placement: 'top-center' }
                )
            }
        }
    }

    return (
        <Card>
            <h3 className="mb-4">{isEdit ? 'Edit Blog' : 'Add New Blog'}</h3>
            <Formik
                enableReinitialize
                initialValues={initialData}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, touched, errors, setFieldValue, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="Title"
                                    invalid={errors.title && touched.title}
                                    errorMessage={errors.title as string}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="title"
                                        placeholder="Blog Title"
                                        component={Input}
                                        onChange={(e: any) => {
                                            const val = e.target.value;
                                            setFieldValue('title', val);
                                            if (!isEdit) {
                                                setFieldValue('slug', val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                                            }
                                        }}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Slug"
                                    invalid={errors.slug && touched.slug}
                                    errorMessage={errors.slug as string}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="slug"
                                        placeholder="blog-title"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="Category"
                                    invalid={errors.category && touched.category}
                                    errorMessage={errors.category as string}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="category"
                                        placeholder="e.g., Company News, Technical..."
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem label="Status">
                                    <Field name="status">
                                        {({ field, form }: any) => (
                                            <Select
                                                field={field}
                                                form={form}
                                                options={statuses}
                                                value={statuses.filter(option => option.value === values.status)}
                                                onChange={option => form.setFieldValue(field.name, option?.value)}
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                            </div>

                            <FormItem label="Cover Image">
                                <Field name="image">
                                    {({ field, form }: any) => (
                                        <div>
                                            <Upload
                                                className="mb-4"
                                                showList={false}
                                                uploadLimit={1}
                                                onChange={(files) => handleUpload(files, form, field)}
                                            />
                                            {values.image && (
                                                <div className="mt-4">
                                                    <img src={values.image.startsWith('http') ? values.image : `http://localhost:8000${values.image}`} alt="Preview" className="h-40 object-cover rounded" />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem
                                label="Short Description"
                                invalid={errors.excerpt && touched.excerpt}
                                errorMessage={errors.excerpt as string}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="excerpt"
                                    textArea
                                    placeholder="Enter a brief description for the blog preview..."
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="Content"
                                invalid={errors.content && touched.content}
                                errorMessage={errors.content as string}
                            >
                                <Field name="content">
                                    {({ field, form }: any) => (
                                        <RichTextEditor
                                            value={field.value}
                                            onChange={val => form.setFieldValue(field.name, val)}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-bold mb-4 text-gray-800">SEO Settings</h3>
                                <FormItem label="Meta Title">
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="meta_title"
                                        placeholder="SEO Title (e.g., Best Cables in 2026)"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem label="Meta Keywords">
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="meta_keywords"
                                        placeholder="cables, manufacturing, flash cab"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem label="Meta Description">
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="meta_description"
                                        textArea
                                        placeholder="Brief description for search engines..."
                                        component={Input}
                                    />
                                </FormItem>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <Button
                                    type="button"
                                    onClick={() => navigate('/admin/blog')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="solid"
                                    type="submit"
                                    loading={isSubmitting}
                                >
                                    {isEdit ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </Card>
    )
}

export default BlogForm
