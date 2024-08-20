import { http, HttpResponse } from 'msw'
import { expect, it } from 'vitest'

import { server } from '@/mocks/node'

it('handles errors when fetching the user', () => {
  // This test, however, needs a reliable way to reproduce
  // a server error to test the UI. Instead of adding this
  // behavior in the "handlers.js", add a runtime override
  // so that requests to "GET /user" always return an error.
  server.use(
    http.get('/user', () => {
      return new HttpResponse(null, { status: 500 })
    })
  )

  expect(screen.getByRole('alert')).toHaveText('Error!')
})
