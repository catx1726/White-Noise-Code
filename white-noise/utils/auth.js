import Cookies from 'js-cookie'

/*
reference 🤭
https://github.com/PanJiaChen/vue-element-admin/blob/master/src/utils/auth.js
*/

const TokenKey = 'User-Token'

export function getToken() {
  console.log('auth getToken:', Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
