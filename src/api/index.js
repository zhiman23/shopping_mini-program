import request from '@/utils/request'

export function homeSwiper() {
    return request({
        method: 'GET',
        url: '/home/swiperdata'
    })
}

export const getGoodsList = (data) => {
    return request({
        method: 'get',
        url: '/goods/search',
        data,
    })
}