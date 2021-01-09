import request from '@/utils/request'

export function homeSwiper() {
    return request({
        method: 'GET',
        url: '/home/swiperdata'
    })
}

//获取商品列表
export const getGoodsList = (data) => {
    return request({
        method: 'get',
        url: '/goods/search',
        data,
    })
}

//获取商品详情
export const getGoodsDetail = (data) => {
    return request({
        method: 'get',
        url: '/goods/detail',
        data,
    })
}