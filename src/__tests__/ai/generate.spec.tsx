
import 'jest-localstorage-mock'

import nokori from '../../index'
const nk = new nokori(process.env.NOKORI_API_KEY)

describe('Generation', () => {

  it('should create a data-backed generation', async () => {
    const { data, error } = await nk.ai.generate({
      prompt: 'What were sales yesterday?',
      context: ['{ data: { value: 39339.00 } }'],
    })

    expect(data).toBeTruthy()
    expect(error).toBeFalsy()
  })
})
