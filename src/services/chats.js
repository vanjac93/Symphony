import * as API from './api'


export default {
  getList: () => API.get('chats/')
}