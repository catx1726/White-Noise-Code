import Cookies from 'js-cookie'

/*
reference 🤭
https://github.com/PanJiaChen/vue-element-admin/blob/master/src/utils/auth.js
*/

const TokenKey = 'User-Token'
const UIDKEY = 'UID'
const PROJECTKEY = 'PID'
const UNAMEKEY = 'UNAME'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setInfo(uid, uname, projId) {
  Cookies.set(UIDKEY, uid)
  Cookies.set(UNAMEKEY, uname)
  Cookies.set(PROJECTKEY, projId)
}

export function getInfo() {
  return { uid: Cookies.get(UIDKEY), uname: Cookies.get(UNAMEKEY) }
}

export default {
  getInfo,
  getToken,
  setToken,
  removeToken,
  setInfo
}
