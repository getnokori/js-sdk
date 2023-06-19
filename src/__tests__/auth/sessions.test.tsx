import nokori from '../../index'
const nk = new nokori(process.env.NOKORI_API_KEY)

beforeAll(async () => {
  await nk.auth.login({
    strategy: 'password',
    email: 'wes+283@nokori.com',
    password: '9j4f19j3d3d9j3d9',
  })
})

describe('Tests session functions', ()=> {

  it('should successfully indicate an active session exists', async () => {
    const { data, error } = await nk.auth.isAuthenticated()

    expect(data).toBeTruthy()
    expect(error).toBeFalsy()
    expect(data.isAuthenticated).toBeTruthy()
  })

  it('should successly indicate no active session exists', async () => {
    await nk.auth.logout()

    const { data, error } = await nk.auth.isAuthenticated()

    expect(data).toBeFalsy()
    expect(error).toBeTruthy()
  })

})
