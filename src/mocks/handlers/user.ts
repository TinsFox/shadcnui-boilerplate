import type { ResponseResolver, RestContext, RestRequest } from 'msw'
import { http, HttpResponse } from 'msw'

import { withAuth } from '../middleware'

const loginResolver = () => {
  return new HttpResponse(null, {
    headers: {
      'Set-Cookie': 'authToken=abc-123'
    }
  })
}
const logoutResolver = () => {
  return new HttpResponse(null, {
    headers: {
      'Set-Cookie': 'authToken=abc-123'
    }
  })
}

const userInfoResolver = ({ request, cookies }) => {
  return HttpResponse.json({ name: 'Tom', age: 18 })
}

export const handlers = [
  http.get('/api/userInfo', withAuth(userInfoResolver)),
  http.get('/api/user', userInfoResolver),
  http.post('/api/login', loginResolver),
  http.post('/api/logout', logoutResolver),
  http.post(
    '/comment',
    withAuth(async ({ request }) => {
      const { author, text } = await request.json()
      return HttpResponse.json({ author, text }, { status: 201 })
    })
  ),
  http.get('/api/user', ({ request, cookies }) => {
    console.log(request)
    console.log(cookies)
    if (!cookies.authToken) {
      return new HttpResponse(null, { status: 403 })
    }
    return HttpResponse.json({ name: 'John' })
  })
]

interface User {
  firstName: string
  age: number
}
