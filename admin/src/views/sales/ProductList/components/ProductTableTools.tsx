import Button from '@/components/ui/Button'
import { HiPlusCircle } from 'react-icons/hi'
import ProductTableSearch from './ProductTableSearch'
import { Link } from 'react-router-dom'
import { APP_PREFIX_PATH } from '@/constants/route.constant'

const ProductTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ProductTableSearch />
            <Link
                className="block lg:inline-block md:mb-0 mb-4 !ml-2 lg:ml-0"
                to={`${APP_PREFIX_PATH}/sales/product-new`}
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Product
                </Button>
            </Link>
        </div>
    )
}

export default ProductTableTools
