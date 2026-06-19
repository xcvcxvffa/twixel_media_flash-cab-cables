import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { useAppSelector } from '@/store'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi'
import { FiActivity } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import type { CommonProps } from '@/@types/common'

const ToastContent = ({ title, message }: { title: string, message: string }) => (
    <div className="ml-2">
        <div className="text-slate-800 font-semibold text-[15px] mb-0.5">{title}</div>
        <div className="text-slate-500 text-[13px]">{message}</div>
    </div>
)

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
    {
        label: 'Account Setting',
        path: `${APP_PREFIX_PATH}/account/settings/profile`,
        icon: <HiOutlineCog />,
    },
    {
        label: 'Activity Log',
        path: `${APP_PREFIX_PATH}/account/activity-log`,
        icon: <FiActivity />,
    },
]

const _UserDropdown = ({ className }: CommonProps) => {
    const { avatar, userName, authority, email } = useAppSelector(
        (state) => state.auth.user
    )

    const { signOut } = useAuth()

    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            <Avatar size={32} shape="circle" src={avatar} />
            <div className="hidden md:block">
                <div className="text-xs capitalize">
                    {authority?.[0] || 'guest'}
                </div>
                <div className="font-bold">{userName}</div>
            </div>
        </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                        <Avatar shape="circle" src={avatar} />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {userName}
                            </div>
                            <div className="text-xs">{email}</div>
                        </div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        key={item.label}
                        eventKey={item.label}
                        className="mb-1 px-0"
                    >
                        <Link 
                            className="flex h-full w-full px-2" 
                            to={item.path}
                        >
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl opacity-50">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Item variant="divider" />
                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"
                    onClick={async () => {
                        try {
                            await signOut()
                            toast.success(<ToastContent title="Logged Out" message="You have successfully logged out." />, {
                                className: '!bg-emerald-50/90 !border-emerald-100',
                            })
                        } catch (error) {
                            toast.error(<ToastContent title="Logout Failed" message="There was a problem logging you out." />, {
                                className: '!bg-red-50/90 !border-red-100',
                            })
                        }
                    }}
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>Sign Out</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
