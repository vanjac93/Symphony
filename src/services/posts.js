import * as API from './api'

export default {
  getNews: (page) => API.get(`posts/?page=${page}`),
  post: (post) => API.post('posts/', post)
}