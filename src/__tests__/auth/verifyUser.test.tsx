import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  it('should be validate user account with token', async () => {
    const verificationResponse = await loladb.auth.verifyUser({
      verifyToken: 'aaZfkQKVnFwa5N88Z-GdiNOAh-',
    })
    
    console.log(verificationResponse)
    expect(verificationResponse).toBeTruthy()
    expect(verificationResponse.status).toBe('success')
    expect(verificationResponse.statusCode).toBe(200)
  })
})
