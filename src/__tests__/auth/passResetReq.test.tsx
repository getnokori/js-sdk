import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  it('should create a password reset request', async () => {
    const { data, error } = await loladb.auth.requestPasswordReset({
      email: 'wes+4539@loladb.com',
    })

    expect(data).toBeTruthy()
    expect(data.sent).toBe(true)
  })
})
