import axios from 'axios'

const instance = axios.create({
    // 设置超时时间,单位毫秒
    timeout: 1000 //即1秒
})

const _post = (api, data, headers = {}) => {
    console.log("data:" + data)
    return new Promise((resolve, reject) => {
        instance.post(api, data, { headers })
            .then(res => { resolve(res) })
            .catch(error => { reject(error) })
    })
}

const postJson = (api, data, headers = {}) => {
    headers['Content-Type'] = 'application/json;charset=utf-8'
    return _post(api, JSON.stringify(data), headers)
}

const postFormData = (api, data, headers = {}) => {
    headers['Content-Type'] = 'multipart/form-data'
    return _post(api, data, headers)
}

const get = (api, params = {}, headers = {}) => {
    return new Promise((resolve, reject) => {
        instance.get(api, { params, headers })
            .then(res => {
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}
export default { postJson, postFormData, get };
