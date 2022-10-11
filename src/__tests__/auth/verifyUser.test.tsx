import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  it('should validate user account with token', async () => {
    const { data, error } = await loladb.auth.verifyUser({
      verifyToken: '-YFKl42KmTiBrodHxedQoLcsAj',
    })

    expect(data).toBeTruthy()
  })
})
