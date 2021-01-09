import request from '@/utils/request'

export function homeSwiper() {
    return request({
        method: 'GET',
        url: '/home/swiperdata'
    })
}