import Cookies from 'js-cookie'

const TokenKey = 'User-Token'
const ActiveTitile = 'active-title'

export function getToken () {
  return Cookies.get(TokenKey)
}
export function getTitile () {
  return Cookies.get(ActiveTitile)
}
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
export function setTitile (title) {
  return Cookies.set(ActiveTitile, title)
}
export function removeToken () {
  return Cookies.remove(TokenKey)
}
export function removeTitile (title) {
  return Cookies.remove(ActiveTitile)
}
