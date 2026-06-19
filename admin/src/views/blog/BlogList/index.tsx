import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import { HiOutlinePencil, HiOutlineTrash, HiPlusCircle, HiOutlineSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import ApiService from '@/services/ApiService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

const { Tr, Th, Td, THead, TBody } = Table

const BlogList = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const resp = await ApiService.fetchData({
                url: '/blogs',
                method: 'get',
            })
            if (resp.data) {
                setBlogs(resp.data)
            }
        } catch (error) {
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to fetch blogs
                </Notification>,
                { placement: 'top-center' }
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await ApiService.fetchData({
                    url: `/blogs/${id}`,
                    method: 'delete',
                })
                toast.push(
                    <Notification title="Success" type="success">
                        Blog deleted successfully
                    </Notification>,
                    { placement: 'top-center' }
                )
                fetchBlogs()
            } catch (error) {
                toast.push(
                    <Notification title="Error" type="danger">
                        Failed to delete blog
                    </Notification>,
                    { placement: 'top-center' }
                )
            }
        }
    }

    const filteredBlogs = blogs.filter((blog: any) => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (blog.category && blog.category.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    return (
        <Card>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
                <h3 className="mb-4 lg:mb-0">Blogs</h3>
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    <Input
                        className="max-w-md md:w-52"
                        size="sm"
                        placeholder="Search blog..."
                        prefix={<HiOutlineSearch className="text-lg" />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                        variant="solid"
                        size="sm"
                        icon={<HiPlusCircle />}
                        onClick={() => navigate('/admin/blog/new')}
                    >
                        Add Blog
                    </Button>
                </div>
            </div>
            <Table>
                <THead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Category</Th>
                        <Th>Status</Th>
                        <Th>Created At</Th>
                        <Th></Th>
                    </Tr>
                </THead>
                <TBody>
                    {loading ? (
                        <Tr>
                            <Td colSpan={5} className="text-center">Loading...</Td>
                        </Tr>
                    ) : filteredBlogs.length === 0 ? (
                        <Tr>
                            <Td colSpan={5} className="text-center">No blogs found.</Td>
                        </Tr>
                    ) : (
                        filteredBlogs.map((blog: any) => (
                            <Tr key={blog.id}>
                                <Td>{blog.title}</Td>
                                <Td>{blog.category}</Td>
                                <Td>
                                    <span className={`capitalize ${blog.status === 'published' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {blog.status}
                                    </span>
                                </Td>
                                <Td>{new Date(blog.created_at).toLocaleDateString()}</Td>
                                <Td className="text-right">
                                    <Button
                                        size="sm"
                                        variant="twoTone"
                                        className="mr-2"
                                        icon={<HiOutlinePencil />}
                                        onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}
                                    />
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        color="red-600"
                                        icon={<HiOutlineTrash />}
                                        onClick={() => handleDelete(blog.id)}
                                    />
                                </Td>
                            </Tr>
                        ))
                    )}
                </TBody>
            </Table>
        </Card>
    )
}

export default BlogList
