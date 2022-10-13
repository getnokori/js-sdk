import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb payment method handling', async () => {
  const { data, error } = await loladb.billing.addPaymentMethod({
    strategy: 'card',
    card: cardElement,
    customerDetails: { // optional
      name: 'Johnny Appleseed', // optional
      email: 'johnny@email.com', // optional
    },
  })
})
