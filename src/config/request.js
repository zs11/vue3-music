import axios from 'axios'
import qs from 'qs'

const env = process.env.NODE_ENV

const baseUrl = ''

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
  
  }

  return res
}, error => {
  console.log('response error:' + error)
  return Promise.reject(error)
})

export default service
