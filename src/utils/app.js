import cookie from 'cookie_js'

const ADMIN_TOKEN = 'admin_toKen'
const USERNAME = 'username'
export function getToken() {
  return cookie.get(ADMIN_TOKEN)
}
export function setToken(token) {
  return cookie.set(ADMIN_TOKEN, token)
}
export function remmoveToken() {
  return cookie.remove(ADMIN_TOKEN)
}

export function getUsername() {
  return cookie.get(USERNAME)
}
export function setUsername(username) {
  return cookie.set(USERNAME, username)
}

export function remmoveUsername() {
  return cookie.remove(USERNAME)
}
