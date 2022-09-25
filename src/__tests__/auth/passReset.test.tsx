import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  it('should create a password reset request', async () => {
    const resetPasswordResponse = await loladb.auth.resetPassword({
      token: 'gcjFEu-j8U0j34i1UGb8Oqbzln',
      newPassword: 'af3agg5532323f3',
    })

    expect(resetPasswordResponse).toBeTruthy()
    expect(resetPasswordResponse.status).toBe('success')
    expect(resetPasswordResponse.statusCode).toBe(200)
  })

  it('should log a user in successfully with the new password', async () => {
    const loginResponse = await loladb.auth.login({
      authProvider: 'password',
      email: 'wes+4539@loladb.com',
      password: 'af3agg5532323f3',
    })

    expect(loginResponse).toBeTruthy()
    expect(loginResponse.status).toBe('success')
    expect(loginResponse.statusCode).toBe(200)
  })
})
