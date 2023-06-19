
import 'jest-localstorage-mock'

import nokori from '../../index'
const nk = new nokori(process.env.NOKORI_API_KEY)

describe('AI Summarization', () => {

  it('should create a summary', async () => {
    const { data, error } = await nk.ai.summarize({
      context: ['The company operates from 11am to 7pm, Monday to Saturday. In the same place, Eloy lives in another room. How about feeding yourself, doing a spa and climbing up to rest in your bed, taking a few steps? The space The house has more than 150 meters, with several nice and cozy corners.'],
    })

    expect(data).toBeTruthy()
    expect(error).toBeFalsy()
  })
})
