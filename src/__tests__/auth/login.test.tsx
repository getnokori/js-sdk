import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  it('should log a user in successfully', async () => {
    const loginResponse = await loladb.auth.login({
      authProvider: 'password',
      email: 'wes+4539@loladb.com',
      password: 'af3agg5532323f3',
    })
    console.log(loginResponse)
    expect(loginResponse).toBeTruthy()
    expect(loginResponse.status).toBe('success')
    expect(loginResponse.statusCode).toBe(200)
  })
})
