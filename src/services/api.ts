import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-myfinance-66b73cbfa2ad.herokuapp.com',
})

export default api
