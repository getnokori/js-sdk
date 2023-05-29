import nokori from '../../index'
const nk = new nokori('nk_pk_prod_BM4sueHCP8fLLhFFOiaCkuuREgZUEpAXlyYP')

describe('nokori Auth', () => {
  it('should validate user account with token', async () => {
    const { data, error } = await nk.auth.verifyUser({
      verifyToken: 'MyfVvx9QIg4-6BjrNccQCEtfz0',
    })
    console.log(data, error)
    expect(data).toBeTruthy()
  })
})
