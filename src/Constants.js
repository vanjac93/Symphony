export const Routes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  NEWS: '/news',
  INFLUENCERS_LIST: '/influencers-list',
  ERROR_PAGE: '/page-not-found'
}

export const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/

export const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

export const usernameRegex = /^[\w.@+-]+$/

export const FOLLOWINGS_LIMIT = 3