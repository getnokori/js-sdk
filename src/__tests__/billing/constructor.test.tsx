import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Billing', () => {
  it('should construct correctly', async () => {

    const billingProps = Object.getOwnPropertyNames(loladb.billing)
    expect(loladb.billing.accountId).toBeFalsy()

    const { data, error } = await loladb.auth.login({
      strategy: 'password',
      email: 'wes+2788@loladb.com',
      password: '9j4f19j3d3d9j3d9',
    })
    
    expect(billingProps).toBeTruthy()
    expect(billingProps).toContain('accountId')
    expect(loladb.billing.accountId).toBeTruthy()
  })
})
