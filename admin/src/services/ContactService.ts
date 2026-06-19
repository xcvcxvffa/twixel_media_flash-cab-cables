import ApiService from './ApiService'

export async function apiGetContacts<T, U extends Record<string, unknown>>(params: U) {
    return ApiService.fetchData<T>({
        url: '/contacts',
        method: 'get',
        params,
    })
}

export async function apiDeleteContact<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/contacts',
        method: 'delete',
        data,
    })
}
