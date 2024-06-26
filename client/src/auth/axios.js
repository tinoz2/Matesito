import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://matesito-production.up.railway.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instance