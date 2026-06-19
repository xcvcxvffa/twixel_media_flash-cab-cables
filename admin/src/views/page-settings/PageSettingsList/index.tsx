import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import { HiOutlinePencil } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import ApiService from '@/services/ApiService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

const { Tr, Th, Td, THead, TBody } = Table

const PageSettingsList = () => {
    const navigate = useNavigate()
    const [pages, setPages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPages()
    }, [])

    const fetchPages = async () => {
        try {
            const resp = await ApiService.fetchData<any>({
                url: '/page-settings',
                method: 'get',
            })
            if (resp.data && resp.data.data) {
                setPages(resp.data.data)
            }
        } catch (error) {
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to fetch page settings
                </Notification>,
                { placement: 'top-center' }
            )
        } finally {
            setLoading(false)
        }
    }

    const onEdit = (id: string | number) => {
        navigate(`/admin/page-settings/edit/${id}`)
    }

    return (
        <Card>
            <p className="mb-6 text-gray-500">Manage SEO attributes and settings for individual pages.</p>
            <Table>
                <THead>
                    <Tr>
                        <Th>Page Name</Th>
                        <Th>Slug</Th>
                        <Th>Meta Title</Th>
                        <Th className="text-right">Action</Th>
                    </Tr>
                </THead>
                <TBody>
                    {loading ? (
                        <Tr>
                            <Td colSpan={4} className="text-center py-4">Loading...</Td>
                        </Tr>
                    ) : pages.length === 0 ? (
                        <Tr>
                            <Td colSpan={4} className="text-center py-4">No pages found.</Td>
                        </Tr>
                    ) : (
                        pages.map((page) => (
                            <Tr key={page.id}>
                                <Td className="font-semibold">{page.page_name}</Td>
                                <Td>/{page.slug}</Td>
                                <Td>
                                    {page.meta_title ? (
                                        page.meta_title.split(' ').length > 8 
                                            ? page.meta_title.split(' ').slice(0, 8).join(' ') + '...' 
                                            : page.meta_title
                                    ) : (
                                        <span className="text-gray-400 italic">Not set</span>
                                    )}
                                </Td>
                                <Td className="text-right">
                                    <Button
                                        size="sm"
                                        variant="twoTone"
                                        icon={<HiOutlinePencil />}
                                        onClick={() => onEdit(page.id)}
                                    >
                                        Edit
                                    </Button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </TBody>
            </Table>
        </Card>
    )
}

export default PageSettingsList
