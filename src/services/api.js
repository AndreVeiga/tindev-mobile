import axios from 'axios'

const api = axios.create({
    baseURL: 'https://tindev-backend-veiga.herokuapp.com'
})

export default api
