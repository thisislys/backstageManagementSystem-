import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/userInfo',
    method: 'get',
    params: { token }
  })
}

// export function getviewAuthority(token) {
//   return request({
//     url: '/user/new',
//     method: 'get',
//     params: { token }
//   })
// }
export let getviewAuthority = params => {
  return request.get('/user/new',{params});
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function user_gx(data) {
  return request({
    url: '/user/user',
    method: 'put',
    data
  })
}
export let usernew = params => {
  return request.get('/user/new',{params});
}
