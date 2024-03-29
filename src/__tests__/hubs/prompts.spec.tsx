
import 'jest-localstorage-mock'

import nokori from '../../index'
const nk = new nokori(process.env.NOKORI_API_KEY)

describe('Hubs', () => {

  it('should execute a hub prompt', async () => {
    const { data, error } = await nk.hubs.prompt({
      hubId: 'nk.hub.nhLtdd1fwjC3UcGJY0p',
      prompt: 'What were sales yesterday?',
    })

    expect(data).toBeTruthy()
    expect(data).toHaveProperty('queryId')
    expect(data).toHaveProperty('label')
    expect(data).toHaveProperty('confidence')
    expect(error).toBeFalsy()
  })

  it('should execute a hub prompt with topN', async () => {
    const { data, error } = await nk.hubs.prompt({
      hubId: 'nk.hub.nhLtdd1fwjC3UcGJY0p',
      prompt: 'What were sales yesterday?',
      topN: 3,
    })

    expect(data).toBeTruthy()
    expect(data).toBeInstanceOf(Array)
  })
})
