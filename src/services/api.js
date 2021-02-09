import env from '../../environment'

export async function request(url, options = {}){
  const err = []

  let headers
  const token = localStorage.getItem('token')
  if(token) {
    headers = new Headers({
      'content-type': 'application/json',
      'Authorization': `token ${localStorage.getItem('token')}`
    })
  } else {
    headers = new Headers({
      'content-type': 'application/json'
    })
  }
  const res = await fetch(env.apiUrl+url, {
    headers,
    ...options })
  let dat
  try {
    dat = await res.json()
  } catch (error) {
    // console.log(error)
  }
  // Handle errors
  if (!res.ok) {
    if (typeof dat === 'object' && dat.detail) {
      err.push(dat.detail)
    }
    if (res.status === 404) {
      !err.length && err.push('Not found!')
    } else if (res.status === 403) {
      !err.length && err.push('Access Forbidden!')
    } else if (res.status === 401) {
      // if (window.location.pathname !== '/login') {
      //   localStorage.removeItem('user')
      //   localStorage.removeItem('token')
      //   window.location.pathname = '/login'
      // }
      // return
    }
    err.length || err.push('Unknown API Error.')
  }

  return [ dat, err, res]
}

export async function get(url, options = {}) {
  return request(url, {...options, method:'GET'})
}

export async function destroy(url, options = {}) {
  return request(url, {...options, method:'DELETE'})
}

export async function post(url, data, options = {}) {
  return request(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function put(url, data, options = {}) {
  return request(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export async function patch(url, data, options= {}) {
  return request(url, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data)
  })
}