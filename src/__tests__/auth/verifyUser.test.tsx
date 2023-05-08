import nokori from '../../index'
const nk = new nokori('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('nokori Auth', () => {
  it('should validate user account with token', async () => {
    const { data, error } = await nk.auth.verifyUser({
      verifyToken: '-YFKl42KmTiBrodHxedQoLcsAj',
    })

    expect(data).toBeTruthy()
  })
})
