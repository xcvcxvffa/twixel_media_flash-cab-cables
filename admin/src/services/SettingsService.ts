import ApiService from './ApiService'

export async function apiGetSettings<T>() {
    return ApiService.fetchData<T>({
        url: '/settings',
        method: 'get',
    })
}

export async function apiUpdateSettings<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/settings',
        method: 'put',
        data,
    })
}
