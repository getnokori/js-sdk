import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  it('should create a password reset request', async () => {
    const reqPassRestResponse = await loladb.auth.requestPasswordReset({
      email: 'wes+6359@loladb.com',
    })

    expect(reqPassRestResponse).toBeTruthy()
    expect(reqPassRestResponse.status).toBe('success')
    expect(reqPassRestResponse.statusCode).toBe(200)
  })
})
