
import 'jest-localstorage-mock'
import 'dotenv/config'

import nokori from '../../index'
const nk = new nokori(process.env.NOKORI_API_KEY)

describe('Mail', () => {
  it('Should send an email successfully', async () => {
    const { data, error } = await nk.mail.send({
      templateId: process.env.TEMPLATE_ID,
      settings: {
        to: process.env.EMAIL_ADDR,
      },
      context: {
        name: 'Howie Doodie',
      },
      headers: {
        'X-My-Header': 'My Header Value',
      },
    })

    expect(data).toBeDefined()
    expect(data.emailId).toBeDefined()
    expect(data.status).toBe('queued')
    expect(error).toBe(null)
  })
})
