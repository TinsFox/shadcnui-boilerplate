import type { DefaultBodyType, HttpResponseResolver, PathParams } from "msw"
import { delay, HttpResponse } from "msw"

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
