import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  it('should validate user account with token', async () => {
    const verificationResponse = await loladb.auth.verifyUser({
      verifyToken: 'iUtBqsKoVuv7I-9c2zimuC7OU7',
    })

    expect(verificationResponse).toBeTruthy()
    expect(verificationResponse.status).toBe('success')
    expect(verificationResponse.statusCode).toBe(200)
  })
})
