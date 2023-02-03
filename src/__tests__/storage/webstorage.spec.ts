import Storage from '../../services/storage/localStorage'

describe('WebStorage', () => {
  let storage: Storage

  beforeEach(() => {
    storage = new Storage()
  })

  it('should add new properties via write', () => {
    const val = 'a'
    storage.foo = val

    expect(storage.foo).toEqual(val)
  })

  it('should overwrite an existing property with new value', () => {
    const originalVal = 'a'
    const replacementVal = 'b'
    storage.foo = originalVal

    expect(storage.foo).toEqual(originalVal)

    storage.foo = replacementVal
    expect(storage.foo).toEqual(replacementVal)
  })

  describe('clear()', () => {
    it('should remove custom properties', () => {
      storage.foo = 'a'
      storage.foo = 'b'

      storage.clear()

      expect(storage.foo).toBe(undefined)
    })
  })

  describe('getItem()', () => {
    it('should retrieve the value of the supplied key', () => {
      const val = 'a'
      storage.foo = val
      storage.bar = 'b'

      expect(storage.getItem('foo')).toEqual(val)
    })

    it('should return `null` for a non-existant key', () => {
      expect(storage.getItem('foo')).toEqual(null)
    })
  })

  describe('key()', () => {
    it('should retrieve the property name of the supplied index', () => {
      const name = 'foo'
      storage[name] = 'a'
      storage.bar = 'b'

      expect(storage.key(0)).toEqual(name)
    })
  })

  describe('length', () => {
    it('should return the count of custom properties', () => {
      expect(storage).toHaveLength(0)

      storage.foo = 'a'
      storage.bar = 'b'

      expect(storage).toHaveLength(2)

      delete storage.foo

      expect(storage).toHaveLength(1)
    })
  })

  describe('removeItem()', () => {
    it('should remove the item of the supplied key', () => {
      const val = 'a'
      storage.foo = val

      expect(storage.foo).toEqual(val)

      delete storage.foo

      expect(storage.foo).toBe(undefined)
    })
  })

  describe('setItem()', () => {
    it('should set the value of the supplied key', () => {
      const val = 'a'
      storage.foo = val

      expect(storage.foo).toEqual(val)
    })

    it('should overwrite an existing property with new value', () => {
      const originalVal = 'a'
      const replacementVal = 'b'
      storage.foo = originalVal

      expect(storage.foo).toEqual(originalVal)

      storage.foo = replacementVal
      expect(storage.foo).toEqual(replacementVal)
    })
  })
})
