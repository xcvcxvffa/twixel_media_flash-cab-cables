import { APP_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const appsNavigationConfig: NavigationTree[] = [
    {
        key: 'apps',
        path: '',
        title: 'APPS',
        translateKey: 'nav.apps',
        icon: 'apps',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'appsProject.dashboard',
                path: `${APP_PREFIX_PATH}/dashboard`,
                title: 'Dashboard',
                translateKey: 'nav.appsProject.dashboard',
                icon: 'project',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'appsSales.productList',
                path: `${APP_PREFIX_PATH}/product`,
                title: 'Products',
                translateKey: 'nav.appsSales.productList',
                icon: 'sales',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
        ],
    },
]

export default appsNavigationConfig
