import nokori from '../../index'
const nk = new nokori(process.env.NOKORI_API_KEY)

let verifyRequestToken = ''
describe('nokori Auth', () => {
  const int = Math.floor(Math.random() * 10000)
  const email = `wes+${int}@nokori.com`

  it('should be able to signup', async () => {
    const { data, error } = await nk.auth.signup({
      email, 
      password: '9j4f19j3d3d9j3d9', 
      // firstName: 'John', 
      // lastName: 'Wallaby',
    })

    console.log(data)
    console.log(error)
    expect(data).toBeTruthy()
    expect(data.created).toBeTruthy()
    verifyRequestToken = data.verifyRequestToken
  })

  it('should fail due to duplicate email', async () => {
    const int = Math.floor(Math.random() * 10000)
    const { data, error } = await nk.auth.signup({
      email, 
      password: '9j4f19j3d3d9j3d9', 
      firstName: 'John', 
      lastName: 'Wallaby',
    })

    expect(error).toBeTruthy()
    expect(data).toBeFalsy()
    expect(error.status).toBe('error')
    expect(error.message).toBeDefined()
  })

  it('should resend the verify account email', async () => {
    const { data, error } = await nk.auth.resendVerificationEmail({
      verifyRequestToken,
    })

    expect(data).toBeTruthy()
    expect(data.sent).toBeTruthy()
    expect(error).toBeFalsy()
  })
})
