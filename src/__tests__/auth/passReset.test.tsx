import { auth } from '../../index'

describe('loladb Auth', () => {
  it('should create a password reset request', async () => {
    const { data, error } = await auth.resetPassword({
      token: 'gcjFEu-j8U0j34i1UGb8Oqbzln',
      newPassword: 'af3agg5532323f3',
    })

    expect(data).toBeTruthy()
    expect(data.status).toBe('success')
    expect(data.redirectTo).toBeTruthy()
  })

  it('should log a user in successfully with the new password', async () => {
    const { data, error } = await auth.login({
      authProvider: 'password',
      email: 'wes+4539@loladb.com',
      password: 'af3agg5532323f3',
    })

    expect(data).toBeTruthy()
    expect(data.status).toBe('success')
    expect(data.statusCode).toBe(200)
  })
})
