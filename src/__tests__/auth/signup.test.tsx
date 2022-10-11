import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Auth', () => {
  const int = Math.floor(Math.random() * 10000)
  const email = `wes+${int}@loladb.com`
  it('should be able to signup', async () => {
    
    const { data, error } = await loladb.auth.signup({
      email, 
      password: '9j4f19j3d3d9j3d9', 
      firstName: 'John', 
      lastName: 'Wallaby',
    })

    expect(data).toBeTruthy()
    expect(data.created).toBeTruthy()
  })

  it('should fail due to duplicate email', async () => {
    const int = Math.floor(Math.random() * 10000)
    const { data, error } = await loladb.auth.signup({
      email, 
      password: '9j4f19j3d3d9j3d9', 
      firstName: 'John', 
      lastName: 'Wallaby',
    })

    expect(error).toBeTruthy()
    expect(data).toBeFalsy()
    expect(error.status).toBe('error')
    expect(error.message).toBeDefined()
  })
})
