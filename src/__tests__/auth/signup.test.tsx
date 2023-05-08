import nokori from '../../index'
const nk = new nokori('lola_pk_test_TAKPkYzqUdhu3gg-weJe0P2hm8Jcg2RPXXkg')

let verifyRequestToken = ''
describe('nokori Auth', () => {
  const int = Math.floor(Math.random() * 10000)
  const email = `wes+${int}@nokori.com`
  console.log(email)
  it('should be able to signup', async () => {
    const { data, error } = await nk.auth.signup({
      email, 
      password: '9j4f19j3d3d9j3d9', 
      firstName: 'John', 
      lastName: 'Wallaby',
    })

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
