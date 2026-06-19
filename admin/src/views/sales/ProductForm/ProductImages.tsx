import { useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { FormItem } from '@/components/ui/Form'
import Dialog from '@/components/ui/Dialog'
import Upload from '@/components/ui/Upload'
import { HiEye, HiTrash } from 'react-icons/hi'
import cloneDeep from 'lodash/cloneDeep'
import { Field, FieldProps, FieldInputProps, FormikProps } from 'formik'

type Image = {
    id: string
    name: string
    img: string
}

type FormModel = {
    imgList: Image[]
    [key: string]: unknown
}

type ProductImagesProps = {
    values: FormModel
}

const ProductImages = (props: ProductImagesProps) => {
    const { values } = props

    const [selectedImg, setSelectedImg] = useState<Image>({} as Image)
    const [viewOpen, setViewOpen] = useState(false)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null)

    const onViewOpen = (img: Image) => {
        if (!img?.img) return;
        setSelectedImg(img)
        setViewOpen(true)
    }

    const onDialogClose = () => {
        setViewOpen(false)
        setTimeout(() => setSelectedImg({} as Image), 300)
    }

    const onDeleteConfirmation = (img: Image, index: number) => {
        setSelectedImg(img)
        setDeletingIndex(index)
        setDeleteConfirmationOpen(true)
    }

    const onDeleteConfirmationClose = () => {
        setSelectedImg({} as Image)
        setDeletingIndex(null)
        setDeleteConfirmationOpen(false)
    }

    const beforeUpload = (file: FileList | null) => {
        let valid: boolean | string = true
        const allowedFileType = ['image/jpeg', 'image/png', 'image/webp']
        const maxFileSize = 5000000 // Increased to 5MB since we support LONGTEXT

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg, .png or .webp file!'
                }
                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot be more than 5MB!'
                }
            }
        }
        return valid
    }

    const generateId = (imgList: Image[]) => {
        let imageId = 'img-0'
        if (imgList && imgList.length > 0) {
            imageId = `img-${Date.now()}-${Math.floor(Math.random() * 1000)}`
        }
        return imageId
    }

    const onSpecificUpload = (
        form: FormikProps<FormModel>,
        field: FieldInputProps<FormModel>,
        files: File[],
        targetIndex: number
    ) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            if (e.target?.result) {
                const image = {
                    id: generateId(values.imgList),
                    name: files[0].name,
                    img: e.target.result as string,
                }
                let newList = cloneDeep(values.imgList || [])
                while (newList.length <= targetIndex) {
                    newList.push({ id: '', name: '', img: '' })
                }
                newList[targetIndex] = image
                form.setFieldValue(field.name, newList)
            }
        }
        if (files[0]) {
            reader.readAsDataURL(files[0])
        }
    }

    const onGalleryUpload = (
        form: FormikProps<FormModel>,
        field: FieldInputProps<FormModel>,
        files: File[]
    ) => {
        const latestUpload = files.length - 1
        const reader = new FileReader()
        reader.onload = (e) => {
            if (e.target?.result) {
                const image = {
                    id: generateId(values.imgList),
                    name: files[latestUpload].name,
                    img: e.target.result as string,
                }
                let newList = cloneDeep(values.imgList || [])
                while (newList.length < 3) {
                    newList.push({ id: '', name: '', img: '' })
                }
                newList.push(image)
                form.setFieldValue(field.name, newList)
            }
        }
        if (files[latestUpload]) {
            reader.readAsDataURL(files[latestUpload])
        }
    }

    const handleImageDelete = (
        form: FormikProps<FormModel>,
        field: FieldInputProps<FormModel>
    ) => {
        let newList = cloneDeep(values.imgList || [])
        if (deletingIndex !== null && newList[deletingIndex]) {
            if (deletingIndex < 3) {
                // Nullify specific slot so indices remain stable
                newList[deletingIndex] = { id: '', name: '', img: '' }
            } else {
                // Remove from gallery completely
                newList.splice(deletingIndex, 1)
            }
        }
        form.setFieldValue(field.name, newList)
        setDeleteConfirmationOpen(false)
    }

    const specificRoles = [
        { label: 'Product Main Image', color: 'bg-blue-100 text-blue-600' },
        { label: 'Hero Section Image', color: 'bg-purple-100 text-purple-600' },
        { label: 'Breadcrumb Banner', color: 'bg-pink-100 text-pink-600' },
    ]

    const imgList = values.imgList || []
    const galleryImages = imgList.length > 3 ? imgList.slice(3) : []

    return (
        <AdaptableCard className="mb-4">
            <h5>Product Media</h5>
            <p className="mb-6">Upload designated images for specific areas of the product page.</p>
            <FormItem>
                <Field name="imgList">
                    {({ field, form }: FieldProps) => {
                        return (
                            <div className="flex flex-col gap-8">
                                {/* Fixed Slots */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {specificRoles.map((role, idx) => {
                                        const img = imgList[idx]
                                        const hasImage = img && img.img && img.img !== ''

                                        return (
                                            <div key={idx} className="flex flex-col gap-2">
                                                <div className={`text-xs font-bold px-3 py-1.5 rounded-t-md uppercase tracking-wide text-center ${role.color}`}>
                                                    {role.label}
                                                </div>
                                                <div className="border border-gray-200 rounded-b-md p-3 min-h-[160px] flex items-center justify-center bg-gray-50 relative group">
                                                    {hasImage ? (
                                                        <>
                                                            <img
                                                                className="max-h-[140px] max-w-full rounded object-contain"
                                                                src={img.img}
                                                                alt={img.name}
                                                            />
                                                            <div className="absolute inset-0 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center rounded-b-md transition-all">
                                                                <span
                                                                    className="text-gray-100 hover:text-white cursor-pointer p-2 mx-1"
                                                                    onClick={() => onViewOpen(img)}
                                                                >
                                                                    <HiEye />
                                                                </span>
                                                                <span
                                                                    className="text-gray-100 hover:text-red-400 cursor-pointer p-2 mx-1"
                                                                    onClick={() => onDeleteConfirmation(img, idx)}
                                                                >
                                                                    <HiTrash />
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <Upload
                                                            draggable
                                                            className="w-full h-full border-none shadow-none"
                                                            beforeUpload={beforeUpload}
                                                            showList={false}
                                                            onChange={(files) => onSpecificUpload(form, field, files, idx)}
                                                        >
                                                            <div className="flex flex-col justify-center items-center h-full opacity-60 hover:opacity-100 transition-opacity">
                                                                <DoubleSidedImage
                                                                    className="w-8 h-8 mb-2"
                                                                    src="/img/others/upload.png"
                                                                    darkModeSrc="/img/others/upload-dark.png"
                                                                />
                                                                <span className="text-xs font-semibold text-center px-4">Upload {role.label}</span>
                                                            </div>
                                                        </Upload>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="border-t border-gray-200 my-2"></div>

                                {/* Gallery Section */}
                                <div>
                                    <h6 className="mb-2">Additional Gallery Images</h6>
                                    <p className="mb-4 text-sm text-gray-500">Add more images to show in the product gallery.</p>
                                    
                                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {galleryImages.map((img, index) => {
                                            const actualIndex = index + 3;
                                            return (
                                                <div key={img.id || img.img} className="group relative rounded border p-2 flex flex-col items-center justify-center bg-white h-[120px]">
                                                    <img
                                                        className="rounded max-h-full max-w-full object-contain"
                                                        src={img.img}
                                                        alt={img.name}
                                                    />
                                                    <div className="absolute inset-0 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center rounded">
                                                        <span
                                                            className="text-gray-100 hover:text-white cursor-pointer p-1.5"
                                                            onClick={() => onViewOpen(img)}
                                                        >
                                                            <HiEye />
                                                        </span>
                                                        <span
                                                            className="text-gray-100 hover:text-red-400 cursor-pointer p-1.5"
                                                            onClick={() => onDeleteConfirmation(img, actualIndex)}
                                                        >
                                                            <HiTrash />
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        
                                        <Upload
                                            draggable
                                            className="min-h-[120px]"
                                            beforeUpload={beforeUpload}
                                            showList={false}
                                            onChange={(files) => onGalleryUpload(form, field, files)}
                                        >
                                            <div className="h-full flex flex-col justify-center items-center bg-gray-50 border border-dashed border-gray-300 rounded hover:bg-gray-100 transition-colors">
                                                <DoubleSidedImage
                                                    className="w-6 h-6 mb-1"
                                                    src="/img/others/upload.png"
                                                    darkModeSrc="/img/others/upload-dark.png"
                                                />
                                                <span className="text-xs font-semibold">Add Image</span>
                                            </div>
                                        </Upload>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </Field>
            </FormItem>
            
            <Dialog
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">{selectedImg?.name || 'Image'}</h5>
                <img
                    className="w-full"
                    src={selectedImg?.img}
                    alt={selectedImg?.name || 'Preview'}
                />
            </Dialog>

            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove image"
                confirmButtonColor="red-600"
                onClose={onDeleteConfirmationClose}
                onRequestClose={onDeleteConfirmationClose}
                onCancel={onDeleteConfirmationClose}
                onConfirm={() => {
                    const formElement = document.querySelector('form') as any;
                    // We need a way to pass form and field to onDelete or use Formik context
                    // Since ConfirmDialog is outside Field, we can use a trick:
                    // we already stored deletingIndex. We can trigger a hidden button or just use Formik Context.
                    // Wait, this is tricky. We'll use a hack to click a hidden button that calls handleImageDelete.
                    const deleteBtn = document.getElementById('hidden-delete-img-btn');
                    if (deleteBtn) deleteBtn.click();
                }}
            >
                <p>Are you sure you want to remove this image?</p>
            </ConfirmDialog>

            {/* Hidden Field consumer just for delete button */}
            <Field name="imgList">
                {({ field, form }: FieldProps) => (
                    <button 
                        id="hidden-delete-img-btn" 
                        type="button" 
                        className="hidden" 
                        onClick={() => handleImageDelete(form, field)}
                    />
                )}
            </Field>
        </AdaptableCard>
    )
}

export default ProductImages
