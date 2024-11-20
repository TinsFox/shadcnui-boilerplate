describe('auth', () => {
  it('should register a new user', async () => {
    const response = await fetch('http://localhost:8787/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password',
      }),
    })
    expect(response.status).toBe(200)
    expect(response.json()).resolves.toEqual({
      status: 'ok',
      message: 'Register successful',
    })
  })
  it('should login a user', async () => {
    const response = await fetch('http://localhost:8787/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password',
      }),
    })
    expect(response.status).toBe(200)
    expect(response.json()).resolves.toEqual({
      status: 'ok',
      message: 'Login successful',
    })
  })
  it('should logout a user', async () => {
    const response = await fetch('http://localhost:8787/api/auth/logout', {
      method: 'POST',
    })
    expect(response.status).toBe(200)

    const responseBody = await response.json()
    console.log('responseBody: ', responseBody)
    expect(responseBody).toEqual({
      status: 'ok',
      headers: {
        'Set-Cookie': 'token=;Max-Age=0; Path=/; HttpOnly; SameSite=Strict; Secure',
      },
      message: 'Logout successful',
    })
  })
})
