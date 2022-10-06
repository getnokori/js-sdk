import LolaDB from '../../index'
import 'jest-localstorage-mock'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')
loladb.http.updateToken('940179129158d29b7b23f0ca5552527b22d6c19d14231a8e1a990799b72f686e')

describe('Query executions', () => {

  it('should execute a mysql query', async () => {
    const { data, error } = await loladb.query.execute({
      queryId: 'get-orders-by-product-id',
      context: [85938],
    })

    expect(data).toBeTruthy()
    expect(error).toBeFalsy()
  })
})
