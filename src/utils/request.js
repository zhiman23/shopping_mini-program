const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'

let requestCount = 0
const request = ({ url, ...config }) => {
    return new Promise((resolve, reject) => {
        uni.showNavigationBarLoading()
        //计数器累加
        requestCount++
        uni.request({
            ...config, //仅为示例，并非真实接口地址。
            url: baseURL + url,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                requestCount--
                //计数器为0关闭加载
                if (requestCount === 0) {
                    uni.hideNavigationBarLoading()
                }
            }
        })
    })
}

export default request