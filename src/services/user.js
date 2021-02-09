import * as API from './api'

export default {
  login : (username,password) => API.post('auth/login/', {username,password}),
  signUp: user => API.post('auth/signup/', user),
  logout: () => API.post('auth/logout/'),
  updateUser: user => API.put(`users/${user.username}/`, user)
}