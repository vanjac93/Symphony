import * as API from './api'

export default {
  getFollowings: (username) => API.get(`users/${username}/followings`)
}