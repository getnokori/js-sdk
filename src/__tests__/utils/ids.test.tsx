import { uuid } from '../../services/id.util.service'

describe('ids', () => {
  it('should generate a unique id', () => {
    const id = uuid()
    expect(id).toHaveLength(36)
  })
})
