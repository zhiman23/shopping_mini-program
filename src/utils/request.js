const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'

const request = ({ url, ...config }) => {
    return new Promise((resolve, reject) => {
        uni.request({
            ...config, //仅为示例，并非真实接口地址。
            url: baseURL + url,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            },
        })
    })
}

export default request