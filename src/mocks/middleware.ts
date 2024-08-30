import type { DefaultBodyType, HttpResponseResolver, PathParams } from "msw"
import { delay, HttpResponse } from "msw"

import { TOKEN } from "./handlers/user"

export function withAuth<
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType,
>(
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  return async (args) => {
    const clonedArgs = { ...args }
    const { cookies } = clonedArgs
    if (!cookies.token) {
      return HttpResponse.json(null)
    }
    if (cookies.token !== TOKEN) {
      throw new HttpResponse(null, { status: 401 })
    }
    return resolver(args)
  }
}

export function withDelay<
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType,
>(
  ms: number,
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  return async (args) => {
    await delay(ms)
    return resolver(args)
  }
}
