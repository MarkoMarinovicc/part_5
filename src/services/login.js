import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = (payload) => {
  const request = axios.post(baseUrl,payload)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }