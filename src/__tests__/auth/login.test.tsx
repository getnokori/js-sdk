import LolaDB from '../../index'
import 'jest-localstorage-mock'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  it('should log a user in successfully', async () => {
    const { data, error } = await loladb.auth.login({
      strategy: 'password',
      email: 'wes+2788@loladb.com',
      password: '9j4f19j3d3d9j3d9',
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

  it('Should get the user object successfully', async()=>{
    const { data, error } = await loladb.auth.getUser()

    expect(data).toBeTruthy()
    expect(error).toBeFalsy()
    expect(data).toHaveProperty('userId')
    expect(data).toHaveProperty('accountId')
    expect(data).toHaveProperty('email')
    expect(data).toHaveProperty('firstName')
    expect(data).toHaveProperty('lastName')
    expect(data).toHaveProperty('accountType')
    expect(data).toHaveProperty('subscriptions')
    expect(data.subscriptions).toHaveProperty('planId')
    expect(data.subscriptions).toHaveProperty('hasPaymentMethod')
  })

  it('Should successfully log a user out', async () => {
    expect(localStorage.getItem('loladb.auth')).toBeTruthy()
    const liSession = JSON.parse(localStorage.getItem('loladb.auth') || '')
    expect(liSession).toHaveProperty('session')
    expect(liSession.session).toHaveProperty('accessToken')

    const { data, error } = await loladb.auth.logout()

    expect(localStorage.getItem('loladb.auth')).toBeFalsy()
    expect(data.redirectTo).toEqual('/login')
  })
})
