import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  it('should create a password reset request', async () => {
    const resetPasswordResponse = await loladb.auth.resetPassword({
      token: 'HXy2escHpycZ27t8rz7sSRSTHY',
      newPassword: 'f9f93n33f9j3f9j',
    })

    expect(resetPasswordResponse).toBeTruthy()
    expect(resetPasswordResponse.status).toBe('success')
    expect(resetPasswordResponse.statusCode).toBe(200)
  })

  it('should log a user in successfully with the new password', async () => {
    const loginResponse = await loladb.auth.login({
      authProvider: 'password',
      email: 'wes+6359@loladb.com',
      password: 'f9f93n33f9j3f9j',
    })

    expect(loginResponse).toBeTruthy()
    expect(loginResponse.status).toBe('success')
    expect(loginResponse.statusCode).toBe(200)
  })
})
