import { useState, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import Upload from '@/components/ui/Upload'
import AdaptableCard from '@/components/shared/AdaptableCard'
import { Formik, Form, Field } from 'formik'
import { HiOutlineUpload } from 'react-icons/hi'
import ApiService from '@/services/ApiService'
import { apiGetSettings, apiUpdateSettings } from '@/services/SettingsService'

type SettingsFormModel = {
    phone: string
    email: string
    address: string
    facebook: string
    linkedin: string
    instagram: string
    whatsapp: string
    map_url: string
    header_logo: string
    footer_logo: string
    favicon: string
}

const SiteSettings = () => {
    const [loading, setLoading] = useState(true)
    const [initialData, setInitialData] = useState<SettingsFormModel>({
        phone: '',
        email: '',
        address: '',
        facebook: '',
        linkedin: '',
        instagram: '',
        whatsapp: '',
        map_url: '',
        header_logo: '',
        footer_logo: '',
        favicon: '',
    })

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await apiGetSettings<SettingsFormModel>()
                if (response.data) {
                    setInitialData({
                        phone: response.data.phone || '',
                        email: response.data.email || '',
                        address: response.data.address || '',
                        facebook: response.data.facebook || '',
                        linkedin: response.data.linkedin || '',
                        instagram: response.data.instagram || '',
                        whatsapp: response.data.whatsapp || '',
                        map_url: response.data.map_url || '',
                        header_logo: response.data.header_logo || '',
                        footer_logo: response.data.footer_logo || '',
                        favicon: response.data.favicon || '',
                    })
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchSettings()
    }, [])

    const onFormSubmit = async (values: SettingsFormModel, setSubmitting: (isSubmitting: boolean) => void) => {
        try {
            await apiUpdateSettings(values)
            toast.push(
                <Notification title="Success" type="success" duration={2500}>
                    Settings updated successfully
                </Notification>,
                { placement: 'top-center' }
            )
        } catch (error) {
            toast.push(
                <Notification title="Error" type="danger" duration={2500}>
                    Failed to update settings
                </Notification>,
                { placement: 'top-center' }
            )
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <div className="p-4">Loading settings...</div>

    const handleImageUpload = async (
        files: File[], 
        fieldName: string, 
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    ) => {
        if (files.length > 0) {
            const file = files[0]
            const formData = new FormData()
            formData.append('file', file)
            
            try {
                const response = await ApiService.fetchData<any, FormData>({
                    url: '/upload',
                    method: 'post',
                    data: formData,
                })
                const result = response.data
                if (result.url) {
                    setFieldValue(fieldName, result.url)
                    toast.push(
                        <Notification title="Success" type="success" duration={2500}>
                            Image uploaded successfully
                        </Notification>,
                        { placement: 'top-center' }
                    )
                } else {
                    throw new Error(result.message || 'Upload failed')
                }
            } catch (error: any) {
                toast.push(
                    <Notification title="Error" type="danger" duration={2500}>
                        {error.message || 'Failed to upload image'}
                    </Notification>,
                    { placement: 'top-center' }
                )
            }
        }
    }

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <Formik
                initialValues={initialData}
                enableReinitialize
                onSubmit={(values, { setSubmitting }) => {
                    onFormSubmit(values, setSubmitting)
                }}
            >
                {({ values, isSubmitting, setFieldValue }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h5 className="mb-4">Contact Info</h5>
                                    
                                    <FormItem label="Phone Number">
                                        <Field type="text" name="phone" placeholder="Phone Number" component={Input} />
                                    </FormItem>
                                    
                                    <FormItem label="Email Address">
                                        <Field type="email" name="email" placeholder="Email Address" component={Input} />
                                    </FormItem>

                                    <FormItem label="Address">
                                        <Field textArea name="address" placeholder="Physical Address" component={Input} />
                                    </FormItem>
                                    
                                    <FormItem label="Google Maps Embed URL">
                                        <Field textArea name="map_url" placeholder="https://www.google.com/maps?q=..." component={Input} />
                                    </FormItem>
                                </div>
                                
                                <div>
                                    <h5 className="mb-4">Social Media Links</h5>
                                    
                                    <FormItem label="Facebook URL">
                                        <Field type="text" name="facebook" placeholder="https://facebook.com/..." component={Input} />
                                    </FormItem>
                                    
                                    <FormItem label="LinkedIn URL">
                                        <Field type="text" name="linkedin" placeholder="https://linkedin.com/..." component={Input} />
                                    </FormItem>

                                    <FormItem label="Instagram URL">
                                        <Field type="text" name="instagram" placeholder="https://instagram.com/..." component={Input} />
                                    </FormItem>

                                    <FormItem label="WhatsApp URL">
                                        <Field type="text" name="whatsapp" placeholder="https://wa.me/..." component={Input} />
                                    </FormItem>
                                </div>
                            </div>

                            <hr className="my-6" />

                            <h5 className="mb-4">Brand Assets</h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <FormItem label="Header Logo">
                                    <Upload className="cursor-pointer" onChange={(files) => handleImageUpload(files, 'header_logo', setFieldValue)} showList={false} uploadLimit={1}>
                                        {values.header_logo ? <div className="border border-gray-200 rounded-lg p-2 h-32 flex items-center justify-center"><img src={values.header_logo} alt="Header Logo" className="max-h-full max-w-full" /></div> : <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center h-32 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><HiOutlineUpload className="text-3xl text-gray-400 mb-2" /><span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Upload Header Logo</span></div>}
                                    </Upload>
                                </FormItem>

                                <FormItem label="Footer Logo">
                                    <Upload className="cursor-pointer" onChange={(files) => handleImageUpload(files, 'footer_logo', setFieldValue)} showList={false} uploadLimit={1}>
                                        {values.footer_logo ? <div className="border border-gray-200 rounded-lg p-2 h-32 flex items-center justify-center"><img src={values.footer_logo} alt="Footer Logo" className="max-h-full max-w-full" /></div> : <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center h-32 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><HiOutlineUpload className="text-3xl text-gray-400 mb-2" /><span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Upload Footer Logo</span></div>}
                                    </Upload>
                                </FormItem>

                                <FormItem label="Favicon">
                                    <Upload className="cursor-pointer" onChange={(files) => handleImageUpload(files, 'favicon', setFieldValue)} showList={false} uploadLimit={1}>
                                        {values.favicon ? <div className="border border-gray-200 rounded-lg p-2 h-32 flex items-center justify-center"><img src={values.favicon} alt="Favicon" className="max-h-full max-w-full" /></div> : <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center h-32 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><HiOutlineUpload className="text-3xl text-gray-400 mb-2" /><span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Upload Favicon</span></div>}
                                    </Upload>
                                </FormItem>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <Button
                                    variant="solid"
                                    type="submit"
                                    loading={isSubmitting}
                                >
                                    Save Settings
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </AdaptableCard>
    )
}

export default SiteSettings
