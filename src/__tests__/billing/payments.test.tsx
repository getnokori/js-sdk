import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

beforeAll(async () => {
  await loladb.auth.login({
    strategy: 'password',
    email: 'wes+2788@loladb.com',
    password: '9j4f19j3d3d9j3d9',
  })
})

describe('loladb payment method handling', () => {
  
  // `PaymentMethod` Object from stripe as documented: https://stripe.com/docs/api/payment_methods/object
  // Generated from Stripe JS SDK: https://stripe.com/docs/js/payment_methods/create_payment_method
  const mockCardObject = {
    id: 'pm_1LsR6WIEou0fWPYXXoj32qB4',
    object: 'payment_method',
    billing_details: {
      address: {
        city: null,
        country: null,
        line1: null,
        line2: null,
        postal_code: null,
        state: null,
      },
      email: null,
      name: null,
      phone: null,
    },
    card: {
      brand: 'visa',
      checks: {
        address_line1_check: null,
        address_postal_code_check: null,
        cvc_check: null,
      },
      country: 'US',
      exp_month: 1,
      exp_year: 2023,
      funding: 'credit',
      generated_from: null,
      last4: '4242',
      networks: {
        available: [
          'visa',
        ],
        preferred: null,
      },
      three_d_secure_usage: {
        supported: true,
      },
      wallet: null,
    },
    created: 1665666340,
    customer: null,
    livemode: false,
    type: 'card',
  }

  it('should successfully create a payment method', async () => {
  
    const { data, error } = await loladb.billing.addPaymentMethod({
      provider: 'stripe',
      paymentMethodDetails: mockCardObject, 
    })
  
    console.log(data, error)
    expect(data).toBeTruthy()
    expect(error).toBeFalsy()
  })
})
