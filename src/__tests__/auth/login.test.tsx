import LolaDB from '../../index'
import 'jest-localstorage-mock'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  it('should log a user in successfully', async () => {
    const { redirectTo, user, error } = await loladb.auth.login({
      strategy: 'password',
      email: 'wes+4539@loladb.com',
      password: 'af3agg5532323f3',
    })

    expect(user).toBeTruthy()
    expect(user?.accountId).toBeTruthy()
    expect(user?.userId).toBeTruthy()
    expect(error).toBeFalsy()
    expect(redirectTo).toEqual('/')
  })
})
