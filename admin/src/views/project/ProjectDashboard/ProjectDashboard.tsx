import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ApiService from '@/services/ApiService'
import { Card, Button, Avatar } from '@/components/ui'
import { 
    HiOutlineCube, 
    HiOutlineDocumentText, 
    HiOutlineMail, 
    HiOutlinePlus,
    HiOutlineArrowRight,
    HiOutlineEye
} from 'react-icons/hi'
import dayjs from 'dayjs'
import { APP_PREFIX_PATH } from '@/constants/route.constant'

const ProjectDashboard = () => {
    const navigate = useNavigate()
    const [stats, setStats] = useState({ products: 0, blogs: 0, enquiries: 0 })
    const [recentEnquiries, setRecentEnquiries] = useState<any[]>([])
    const [recentBlogs, setRecentBlogs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch products
                const prodRes = await ApiService.fetchData({ url: '/products', method: 'get' })
                // Fetch blogs
                const blogRes = await ApiService.fetchData({ url: '/blogs', method: 'get' })
                // Fetch enquiries/contacts
                const contactRes = await ApiService.fetchData({ url: '/contacts', method: 'get' })

                const prodData = prodRes.data as any
                const blogData = blogRes.data as any
                const contactData = contactRes.data as any

                const productsList = prodData.data || prodData || []
                const blogsList = blogData.data || blogData || []
                const contactsList = contactData.data || contactData || []

                setStats({
                    products: prodData.total !== undefined ? prodData.total : productsList.length,
                    blogs: blogData.total !== undefined ? blogData.total : blogsList.length,
                    enquiries: contactData.total !== undefined ? contactData.total : contactsList.length,
                })

                // Sort & slice for recent enquiries
                const sortedContacts = [...contactsList].sort((a, b) => {
                    const dateB = new Date(b.createdAt || b.created_at).getTime()
                    const dateA = new Date(a.createdAt || a.created_at).getTime()
                    return dateB - dateA
                })
                setRecentEnquiries(sortedContacts.slice(0, 5))

                // Sort & slice for recent blogs
                const sortedBlogs = [...blogsList].sort((a, b) => {
                    const dateB = new Date(b.createdAt || b.created_at).getTime()
                    const dateA = new Date(a.createdAt || a.created_at).getTime()
                    return dateB - dateA
                })
                setRecentBlogs(sortedBlogs.slice(0, 4))
                
            } catch (err) {
                console.error("Error fetching dashboard stats", err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    const getInitials = (firstName: string, lastName: string) => {
        const first = firstName ? firstName.charAt(0).toUpperCase() : ''
        const last = lastName ? lastName.charAt(0).toUpperCase() : ''
        return first + last
    }

    const getRandomColorClass = (str: string) => {
        const colors = [
            'bg-red-100 text-red-600', 
            'bg-blue-100 text-blue-600', 
            'bg-green-100 text-green-600', 
            'bg-yellow-100 text-yellow-600', 
            'bg-indigo-100 text-indigo-600', 
            'bg-purple-100 text-purple-600', 
            'bg-pink-100 text-pink-600',
            'bg-orange-100 text-orange-600',
            'bg-teal-100 text-teal-600'
        ];
        if (!str) return colors[0];
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }

    return (
        <div className="flex flex-col gap-6 h-full pb-6">
            <div className="mb-2">
                <h3 className="mb-2">Dashboard</h3>
                <p className="text-gray-500">Welcome back! Here's an overview of your site's data.</p>
            </div>
            
            {loading ? (
                <div className="flex items-center justify-center p-10">Loading statistics...</div>
            ) : (
                <>
                    {/* STATS ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="mb-2 font-semibold text-gray-500">Total Products</p>
                                    <h3 className="text-3xl text-gray-800">{stats.products}</h3>
                                </div>
                                <div className="flex justify-center items-center bg-blue-100 text-blue-600 rounded-full p-4">
                                    <HiOutlineCube className="text-3xl" />
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="mb-2 font-semibold text-gray-500">Total Blogs</p>
                                    <h3 className="text-3xl text-gray-800">{stats.blogs}</h3>
                                </div>
                                <div className="flex justify-center items-center bg-emerald-100 text-emerald-600 rounded-full p-4">
                                    <HiOutlineDocumentText className="text-3xl" />
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="mb-2 font-semibold text-gray-500">Total Enquiries</p>
                                    <h3 className="text-3xl text-gray-800">{stats.enquiries}</h3>
                                </div>
                                <div className="flex justify-center items-center bg-purple-100 text-purple-600 rounded-full p-4">
                                    <HiOutlineMail className="text-3xl" />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* CONTENT ROW */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* RECENT ENQUIRIES */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <Card className="flex-1">
                                <div className="flex items-center justify-between mb-6">
                                    <h4>Recent Enquiries</h4>
                                    <Button size="sm" variant="plain" icon={<HiOutlineArrowRight />} onClick={() => navigate(`${APP_PREFIX_PATH}/contacts`)}>
                                        View All
                                    </Button>
                                </div>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Name</th>
                                                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Email</th>
                                                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentEnquiries.length > 0 ? (
                                                recentEnquiries.map((contact, index) => {
                                                    const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'Unknown'
                                                    const initials = getInitials(contact.firstName, contact.lastName) || '?'
                                                    
                                                    return (
                                                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    <Avatar size={36} shape="circle" className={`${getRandomColorClass(fullName)} font-bold text-sm`}>
                                                                        {initials}
                                                                    </Avatar>
                                                                    <span className="font-semibold text-gray-700">{fullName}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4 text-gray-600 text-sm">{contact.email}</td>
                                                            <td className="py-3 px-4 text-gray-500 text-sm">{dayjs(contact.createdAt || contact.created_at).format('DD MMM YYYY')}</td>
                                                        </tr>
                                                    )
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan={3} className="py-6 text-center text-gray-400">No enquiries found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>

                        {/* QUICK ACTIONS & RECENT BLOGS */}
                        <div className="flex flex-col gap-6">
                            <Card>
                                <h4 className="mb-4">Quick Actions</h4>
                                <div className="flex flex-col gap-3">
                                    <Button className="w-full justify-start" icon={<HiOutlinePlus />} variant="twoTone" color="blue" onClick={() => navigate(`${APP_PREFIX_PATH}/product`)}>
                                        Manage Products
                                    </Button>
                                    <Button className="w-full justify-start" icon={<HiOutlineDocumentText />} variant="twoTone" color="emerald" onClick={() => navigate(`${APP_PREFIX_PATH}/blog`)}>
                                        Manage Blogs
                                    </Button>
                                    <a href="http://localhost:5173" target="_blank" rel="noreferrer">
                                        <Button className="w-full justify-start" icon={<HiOutlineEye />} variant="twoTone" color="indigo">
                                            View Live Website
                                        </Button>
                                    </a>
                                </div>
                            </Card>

                            <Card className="flex-1">
                                <h4 className="mb-4">Recent Blogs</h4>
                                <div className="flex flex-col gap-4">
                                    {recentBlogs.length > 0 ? (
                                        recentBlogs.map((blog, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                                                    {blog.image ? (
                                                        <img src={blog.image?.startsWith('http') ? blog.image : `http://localhost:8000${blog.image}`} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <HiOutlineDocumentText size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <h6 className="truncate text-sm font-semibold">{blog.title}</h6>
                                                    <p className="text-xs text-gray-500">{dayjs(blog.createdAt || blog.created_at).format('MMM DD, YYYY')}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center text-gray-400 py-4">No blogs found.</div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProjectDashboard
