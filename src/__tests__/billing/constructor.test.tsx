import nokori from '../../index'
const nk = new nokori(process.env.NOKORI_API_KEY)

describe('nokori Billing', () => {
  it('should construct correctly', async () => {

    const billingProps = Object.getOwnPropertyNames(nk.billing)
    expect(nk.billing.accountId).toBeFalsy()

    const { data, error } = await nk.auth.login({
      strategy: 'password',
      email: 'wes+2788@nokori.com',
      password: '9j4f19j3d3d9j3d9',
    })
    
    expect(billingProps).toBeTruthy()
    expect(billingProps).toContain('accountId')
    expect(nk.billing.accountId).toBeTruthy()
  })
})
