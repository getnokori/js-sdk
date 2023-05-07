import { auth } from '../../index'

describe('loladb Auth', () => {
  it('should create a password reset request', async () => {
    const { data, error } = await auth.requestPasswordReset({
      email: 'wes+4539@loladb.com',
    })

    expect(data).toBeTruthy()
    expect(data.sent).toBe(true)
  })
})
