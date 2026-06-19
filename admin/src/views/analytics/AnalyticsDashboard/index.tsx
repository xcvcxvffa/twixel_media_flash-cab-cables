import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import Table from '@/components/ui/Table'
import { Loading } from '@/components/shared'
import ApiService from '@/services/ApiService'
import { HiOutlineEye, HiOutlineUsers } from 'react-icons/hi'

const { Tr, Th, Td, THead, TBody } = Table

const AnalyticsDashboard = () => {
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState<any>(null)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const resp = await ApiService.fetchData<any>({
                    url: '/analytics/stats',
                    method: 'get'
                })
                setStats(resp.data.data)
            } catch (error) {
                console.error("Failed to fetch analytics:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[400px]">
                <Loading loading={true} />
            </div>
        )
    }

    if (!stats) return <div>Failed to load analytics.</div>

    // Chart Data Preparation
    const dates = stats.views_over_time.map((item: any) => item.date)
    const viewCounts = stats.views_over_time.map((item: any) => parseInt(item.views))

    // Pie Chart Data
    const deviceLabels = stats.devices.map((item: any) => item.device_type)
    const deviceCounts = stats.devices.map((item: any) => parseInt(item.count))

    // Browser Chart Data
    const browserLabels = stats.browsers ? stats.browsers.map((item: any) => item.browser) : []
    const browserCounts = stats.browsers ? stats.browsers.map((item: any) => parseInt(item.count)) : []

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-indigo-100 text-indigo-600 rounded-lg">
                            <HiOutlineEye size={32} />
                        </div>
                        <div>
                            <p className="text-gray-500 font-semibold mb-1">Total Page Views</p>
                            <h3 className="mb-0">{stats.total_views}</h3>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-emerald-100 text-emerald-600 rounded-lg">
                            <HiOutlineUsers size={32} />
                        </div>
                        <div>
                            <p className="text-gray-500 font-semibold mb-1">Unique Visitors</p>
                            <h3 className="mb-0">{stats.unique_visitors}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="mb-6">
                <h4 className="mb-4">Views Over Time (Last 30 Days)</h4>
                <Chart
                    customOptions={{
                        chart: { zoom: { enabled: false }, toolbar: { show: false } },
                        colors: ['#4f46e5'],
                        fill: {
                            type: 'gradient',
                            gradient: {
                                shadeIntensity: 1,
                                opacityFrom: 0.6,
                                opacityTo: 0.05,
                                stops: [0, 100]
                            }
                        },
                        dataLabels: { enabled: false },
                        stroke: { curve: 'smooth', width: 3 },
                        tooltip: { theme: 'light' }
                    }}
                    series={[{ name: 'Page Views', data: viewCounts }]}
                    type="area"
                    xAxis={dates}
                    height={300}
                />
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <Card>
                    <h4 className="mb-4">Traffic by Device</h4>
                    <Chart
                        customOptions={{
                            labels: deviceLabels,
                            colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                            plotOptions: {
                                pie: { donut: { size: '70%', labels: { show: true, total: { show: true, label: 'Devices', fontSize: '18px', fontWeight: 600 } } } }
                            },
                            dataLabels: { enabled: false },
                            legend: { position: 'bottom' }
                        }}
                        series={deviceCounts}
                        type="donut"
                        height={300}
                    />
                </Card>
                <Card>
                    <h4 className="mb-4">Traffic by Browser</h4>
                    <Chart
                        customOptions={{
                            labels: browserLabels,
                            colors: ['#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e'],
                            plotOptions: {
                                pie: { donut: { size: '70%', labels: { show: true, total: { show: true, label: 'Browsers', fontSize: '18px', fontWeight: 600 } } } }
                            },
                            dataLabels: { enabled: false },
                            legend: { position: 'bottom' }
                        }}
                        series={browserCounts}
                        type="donut"
                        height={300}
                    />
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <Card>
                    <h4 className="mb-4">Top Pages Visited</h4>
                    <div className="overflow-x-auto">
                        <Table>
                            <THead>
                                <Tr>
                                    <Th>Page Title</Th>
                                    <Th>Total Views</Th>
                                </Tr>
                            </THead>
                            <TBody>
                                {stats.top_pages.map((page: any, index: number) => (
                                    <Tr key={index}>
                                        <Td>{page.page_title || 'Unknown Title'}</Td>
                                        <Td className="font-semibold">{page.views}</Td>
                                    </Tr>
                                ))}
                                {stats.top_pages.length === 0 && (
                                    <Tr>
                                        <Td colSpan={2} className="text-center">No data available yet.</Td>
                                    </Tr>
                                )}
                            </TBody>
                        </Table>
                    </div>
                </Card>

                <Card>
                    <h4 className="mb-4">Top Referrers</h4>
                    <div className="overflow-x-auto">
                        <Table>
                            <THead>
                                <Tr>
                                    <Th>Referrer Source</Th>
                                    <Th>Visits</Th>
                                </Tr>
                            </THead>
                            <TBody>
                                {stats.referrers && stats.referrers.map((ref: any, index: number) => (
                                    <Tr key={index}>
                                        <Td>{ref.referrer}</Td>
                                        <Td className="font-semibold">{ref.count}</Td>
                                    </Tr>
                                ))}
                                {(!stats.referrers || stats.referrers.length === 0) && (
                                    <Tr>
                                        <Td colSpan={2} className="text-center">No referrers recorded yet.</Td>
                                    </Tr>
                                )}
                            </TBody>
                        </Table>
                    </div>
                </Card>
            </div>

            <Card>
                <h4 className="mb-4">Recent Activity</h4>
                <div className="overflow-x-auto">
                    <Table>
                        <THead>
                            <Tr>
                                <Th>Page</Th>
                                <Th>Device</Th>
                                <Th>Browser</Th>
                                <Th>Time</Th>
                            </Tr>
                        </THead>
                        <TBody>
                            {stats.recent_activity && stats.recent_activity.map((act: any, index: number) => (
                                <Tr key={index}>
                                    <Td>{act.page_title || act.page_url}</Td>
                                    <Td>{act.device_type}</Td>
                                    <Td>{act.browser}</Td>
                                    <Td>{new Date(act.created_at).toLocaleString()}</Td>
                                </Tr>
                            ))}
                            {(!stats.recent_activity || stats.recent_activity.length === 0) && (
                                <Tr>
                                    <Td colSpan={4} className="text-center">No recent activity.</Td>
                                </Tr>
                            )}
                        </TBody>
                    </Table>
                </div>
            </Card>
        </div>
    )
}

export default AnalyticsDashboard
