import { HttpResponse } from 'msw'

// A higher-order response resolver that validates
// the request authorization header before proceeding
// with the actual response resolver.
export function withAuth(resolver) {
  return args => {
    const { request } = args
    if (!request.headers.get('Authorization')) {
      return new HttpResponse(null, { status: 401 })
    }
    return resolver(args)
  }
}
