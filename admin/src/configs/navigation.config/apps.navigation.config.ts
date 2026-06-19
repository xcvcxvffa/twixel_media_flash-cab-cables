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
            {
                key: 'appsCrm.contacts',
                path: `${APP_PREFIX_PATH}/contacts`,
                title: 'Enquiries',
                translateKey: 'nav.appsCrm.contacts',
                icon: 'crm',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'appsBlog.blogList',
                path: `${APP_PREFIX_PATH}/blog`,
                title: 'Blogs',
                translateKey: 'nav.appsBlog.blogList',
                icon: 'docs',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'appsProject.settings',
                path: `${APP_PREFIX_PATH}/settings`,
                title: 'Site Settings',
                translateKey: 'nav.appsProject.settings',
                icon: 'settings',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'appsProject.pageSettings',
                path: `${APP_PREFIX_PATH}/page-settings`,
                title: 'Page Settings',
                translateKey: 'nav.appsProject.pageSettings',
                icon: 'uiComponents',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'apps.analytics',
                path: `${APP_PREFIX_PATH}/analytics`,
                title: 'Analytics',
                translateKey: 'nav.appsAnalytics',
                icon: 'graph',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
        ],
    },
]

export default appsNavigationConfig
