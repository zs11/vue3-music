import axios from 'axios'
import qs from 'qs'

const env = process.env.NODE_ENV
const REALPHONE = true

let baseUrl = 'http://127.0.0.1:3010'

if (REALPHONE) {
  baseUrl = 'http://192.168.2.102:3010'
}

const mapData = (data) => {
  if (typeof data !== 'object') {
    return data
  }
  if (Array.isArray(data)) {
    data.forEach(val => {
      const keys = Object.keys(val)
      keys.forEach(key => {
        if (typeof val[key] === 'string' && val[key].indexOf('127.0.0.1') !== -1) {
          val[key] = val[key].replace('127.0.0.1', '192.168.2.102')
        }
      })
    })
  } else {
    const keys = Object.keys(data)
    keys.forEach(key => {
      if (typeof data[key] === 'string' && data[key].indexOf('127.0.0.1') !== -1) {
        data[key] = data[key].replace('127.0.0.1', '192.168.2.102')
      } else if (typeof data[key] === 'object') {
        data[key] = mapData(data[key])
      }
    })
  }
  return data
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const service = axios.create({
  baseURL: baseUrl,
  timeout: 30 * 1000
})

service.interceptors.request.use(req => {
  if (req.method === 'get') {
    req.paramsSerializer = (params) => {
      return qs.stringify(params, {
        arrayFormat: 'indices'
      })
    }
  }

  if (req.method === 'post') {

  }

  return req
}, error => {
  console.log(error)
  return Promise.reject(error)
})


service.interceptors.response.use(res => {
  if (res.status === 200) {
    res.data = mapData(res.data)
  }

  return res
}, error => {
  console.log('response error:' + error)
  return Promise.reject(error)
})

export default service
