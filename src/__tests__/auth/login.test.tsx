import LolaDB from '../../index'
import 'jest-localstorage-mock'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  it('should log a user in successfully', async () => {
    const { data, error } = await loladb.auth.login({
      strategy: 'password',
      email: 'wes+4539@loladb.com',
      password: 'af3agg5532323f3',
    })

    expect(data).toHaveProperty('session')
    expect(data).toHaveProperty('redirectTo')

    const session = data.session

    expect(data).toBeTruthy()
    expect(session?.accountId).toBeTruthy()
    expect(session?.userId).toBeTruthy()
    expect(error).toBeFalsy()
    expect(data.redirectTo).toEqual('/')

    expect(localStorage.getItem('loladb.auth')).toBeTruthy()
    const liSession = JSON.parse(localStorage.getItem('loladb.auth') || '')

    expect(liSession).toHaveProperty('session')
    expect(liSession.session).toHaveProperty('accessToken')

    expect(liSession.session).toHaveProperty('expiresAt')
    expect(typeof liSession.session.expiresAt).toBe('number')

    expect(liSession.session).toHaveProperty('expiresIn')
    expect(typeof liSession.session.expiresIn).toBe('number')

    expect(liSession.session).toHaveProperty('refreshToken')
    expect(liSession.session).toHaveProperty('userId')
  })

  it('Should successfully log a user out', async () => {
    expect(localStorage.getItem('loladb.auth')).toBeTruthy()
    const liSession = JSON.parse(localStorage.getItem('loladb.auth') || '')
    expect(liSession).toHaveProperty('session')
    expect(liSession.session).toHaveProperty('accessToken')

    const { data, error } = await loladb.auth.logout()

    expect(localStorage.getItem('loladb.auth')).toBeFalsy()
    expect(data.redirectTo).toEqual('/login')

    expect(localStorage.getItem('loladb.auth')).toBeFalsy()
  })
})
