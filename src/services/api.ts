import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-myfinance-326ee4ab2f67.herokuapp.com',
})

export default api
