import nokori from '../../index'
const nk = new nokori(process.env.NOKORI_API_KEY)

describe('nokori Auth', () => {
  it('should create a password reset request', async () => {
    const { data, error } = await nk.auth.requestPasswordReset({
      email: 'wes+283@nokori.com',
    })

    expect(data).toBeTruthy()
    expect(data.sent).toBe(true)
  })
})
