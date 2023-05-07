import { auth } from '../../index'

beforeAll(async () => {
  await auth.login({
    strategy: 'password',
    email: 'wes+2788@loladb.com',
    password: '9j4f19j3d3d9j3d9',
  })
})

describe('Tests session functions', ()=> {

  it('should successfully indicate an active session exists', async () => {
    const { data, error } = await auth.isAuthenticated()

    expect(data).toBeTruthy()
    expect(error).toBeFalsy()
    expect(data.isAuthenticated).toBeTruthy()
  })

  it('should successly indicate no active session exists', async () => {
    await auth.logout()

    const { data, error } = await auth.isAuthenticated()

    expect(data).toBeFalsy()
    expect(error).toBeTruthy()
  })

})
