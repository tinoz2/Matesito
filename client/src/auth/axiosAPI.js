import instance from './axios.js'

export const registerRequest = (data) => {
    return instance.post('/users/register', data)
}

export const loginRequest = (data) => {
    return instance.post('/users/login', data)
}

export const profileRequest = (username) => {
    return instance.get(`/users/profile/${username}`)
}

export const usersRequest = () => {
    return instance.get('/users/users')
}

export const loggedRequest = () => {
    return instance.get('/users/logged')
}

export const logoutRequest = () => {
    return instance.post('/users/logout')
}

export const connectMercadoPagoRequest = (token, user) => {
    return instance.post('/mp/callback', { access_token: token, user });
}

export const disconnectMercadoPagoRequest = (userId) => {
    return instance.post('/mp/disconnect', { user_id: userId })
}