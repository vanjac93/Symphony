import * as API from './api'


export default {
  getInfluencers: page =>  API.get(`influencer/?page=${page}`),
  unfollow: id => API.destroy(`followings/${id}/`),
  follow: id => API.post('followings/', {user: id})
}