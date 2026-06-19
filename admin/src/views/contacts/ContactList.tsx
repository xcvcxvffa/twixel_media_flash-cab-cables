import { useState, useEffect, useMemo, useCallback } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import DataTable from '@/components/shared/DataTable'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { HiOutlineTrash, HiOutlineEye } from 'react-icons/hi'
import { apiGetContacts, apiDeleteContact } from '@/services/ContactService'
import type { ColumnDef, OnSortParam } from '@/components/shared/DataTable'
import dayjs from 'dayjs'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

type Contact = {
    id: number
    firstName: string
    lastName: string
    email: string
    message: string
    createdAt: string
}

const ContactList = () => {
    const [data, setData] = useState<Contact[]>([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    
    const [tableData, setTableData] = useState({
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: {
            order: 'desc',
            key: 'createdAt',
        } as OnSortParam,
    })

    const [viewOpen, setViewOpen] = useState(false)
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [contactToDelete, setContactToDelete] = useState<number | null>(null)

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const response = await apiGetContacts<{data: Contact[], total: number}, any>(tableData)
            if (response.data) {
                setData(response.data.data)
                setTotal(response.data.total)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [tableData])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const onPaginationChange = (page: number) => {
        setTableData(prev => ({ ...prev, pageIndex: page }))
    }

    const onSelectChange = (value: number) => {
        setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }))
    }

    const onSort = (sort: OnSortParam) => {
        setTableData(prev => ({ ...prev, sort }))
    }

    const onView = (contact: Contact) => {
        setSelectedContact(contact)
        setViewOpen(true)
    }

    const onDeleteClick = (id: number) => {
        setContactToDelete(id)
        setDeleteOpen(true)
    }

    const confirmDelete = async () => {
        if (!contactToDelete) return
        setDeleteOpen(false)
        try {
            await apiDeleteContact({ id: contactToDelete })
            toast.push(
                <Notification title="Success" type="success" duration={2500}>
                    Contact deleted successfully
                </Notification>,
                { placement: 'top-center' }
            )
            fetchData()
        } catch (error) {
            toast.push(
                <Notification title="Error" type="danger" duration={2500}>
                    Failed to delete contact
                </Notification>,
                { placement: 'top-center' }
            )
        }
    }

    const columns: ColumnDef<Contact>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'firstName',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="font-semibold">{row.firstName} {row.lastName}</span>
                },
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Date',
                accessorKey: 'createdAt',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{dayjs(row.createdAt).format('DD MMM YYYY, hh:mm A')}</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex justify-end text-lg">
                            <span
                                className="cursor-pointer p-2 hover:text-indigo-500"
                                onClick={() => onView(row)}
                            >
                                <HiOutlineEye />
                            </span>
                            <span
                                className="cursor-pointer p-2 hover:text-red-500"
                                onClick={() => onDeleteClick(row.id)}
                            >
                                <HiOutlineTrash />
                            </span>
                        </div>
                    )
                },
            },
        ],
        []
    )

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex items-center justify-between mb-6">
                <h3>Contact Enquiries</h3>
            </div>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total,
                    pageIndex: tableData.pageIndex,
                    pageSize: tableData.pageSize,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />

            <Dialog
                isOpen={viewOpen}
                onClose={() => setViewOpen(false)}
                onRequestClose={() => setViewOpen(false)}
            >
                {selectedContact && (
                    <div className="mt-4">
                        <h5 className="mb-4">Message Details</h5>
                        <div className="mb-4">
                            <strong>From:</strong> {selectedContact.firstName} {selectedContact.lastName}
                        </div>
                        <div className="mb-4">
                            <strong>Email:</strong> {selectedContact.email}
                        </div>
                        <div className="mb-4">
                            <strong>Date:</strong> {dayjs(selectedContact.createdAt).format('DD MMM YYYY, hh:mm A')}
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                        </div>
                        <div className="mt-6 text-right">
                            <Button onClick={() => setViewOpen(false)}>Close</Button>
                        </div>
                    </div>
                )}
            </Dialog>

            <ConfirmDialog
                isOpen={deleteOpen}
                type="danger"
                title="Delete Message"
                confirmButtonColor="red-600"
                onClose={() => setDeleteOpen(false)}
                onRequestClose={() => setDeleteOpen(false)}
                onCancel={() => setDeleteOpen(false)}
                onConfirm={confirmDelete}
            >
                <p>Are you sure you want to delete this message? This action cannot be undone.</p>
            </ConfirmDialog>
        </AdaptableCard>
    )
}

export default ContactList
