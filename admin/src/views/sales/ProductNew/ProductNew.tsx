import ProductForm, {
    FormModel,
    SetSubmitting,
} from '@/views/sales/ProductForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import { apiCreateSalesProduct } from '@/services/SalesService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data: FormModel) => {
        const response = await apiCreateSalesProduct<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        try {
            const success = await addProduct(values)
            setSubmitting(false)
            if (success) {
                toast.push(
                    <Notification
                        title={'Successfuly added'}
                        type="success"
                        duration={2500}
                    >
                        Product successfuly added
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate(`${APP_PREFIX_PATH}/product`)
            }
        } catch (error: any) {
            setSubmitting(false)
            toast.push(
                <Notification title="Error" type="danger" duration={3000}>
                    {error?.response?.data?.message || 'Failed to add product. The image size might be too large.'}
                </Notification>,
                { placement: 'top-center' }
            )
        }
    }

    const handleDiscard = () => {
        navigate(`${APP_PREFIX_PATH}/product`)
    }

    return (
        <>
            <ProductForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew
