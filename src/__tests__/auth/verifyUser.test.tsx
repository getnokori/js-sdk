import { auth } from '../../index'

describe('loladb Auth', () => {
  it('should validate user account with token', async () => {
    const { data, error } = await auth.verifyUser({
      verifyToken: '-YFKl42KmTiBrodHxedQoLcsAj',
    })

    expect(data).toBeTruthy()
  })
})
