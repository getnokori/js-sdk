import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  it('should be able to signup', async () => {
    const int = Math.floor(Math.random() * 10000)
    const auth = await loladb.auth.signup({
      email: `wes+${int}@loladb.com`, 
      password: '9j4f19j3d3d9j3d9', 
      firstName: 'John', 
      lastName: 'Wallaby',
    })

    expect(auth).toBeTruthy()
    expect(auth.status).toBe('success')
    expect(auth.statusCode).toBe(200)
  })

  it('should fail due to duplicate email', async () => {
    const int = Math.floor(Math.random() * 10000)
    const auth = await loladb.auth.signup({
      email: 'wes@loladb.com', 
      password: '9j4f19j3d3d9j3d9', 
      firstName: 'John', 
      lastName: 'Wallaby',
    })

    expect(auth).toBeTruthy()
    expect(auth.status).toBe('error')
  })
})
