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
  })
})
