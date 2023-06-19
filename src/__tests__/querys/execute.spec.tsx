
import 'jest-localstorage-mock'

import nokori from '../../index'
const nk = new nokori(process.env.NOKORI_API_KEY)
nk.http.updateToken('940179129158d29b7b23f0ca5552527b22d6c19d14231a8e1a990799b72f686e')

describe('Query executions', () => {

  it('should execute a mysql query', async () => {
    const { data, error } = await nk.query.execute({
      queryId: 'get-orders-by-product-id',
      context: [85938],
    })

    expect(data).toBeTruthy()
    expect(error).toBeFalsy()
  })
})
