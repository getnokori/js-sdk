import MockStorage from './storage/localStorage'

class BrowserStorage {
  private store: Pick<Storage, 'getItem' | 'setItem' | 'removeItem' | 'clear'> 
  | Pick<MockStorage, 'getItem' | 'setItem' | 'removeItem' | 'clear'>

  constructor() {
    // if(!window) throw new Error('window is not defined')
    this.store = typeof window !== 'undefined' ? window.localStorage : new MockStorage()
  }

  // private _isBrowser = () => typeof window !== 'undefined'
  
  async get(key: string): Promise<any | null>{
    const value = await this.store?.getItem(key)
    if (!value) return null
    try {
      return JSON.parse(value)
    }
    catch {
      return value
    }
  }

  getSync(key: string): any | null {
    const value = this.store?.getItem(key)
    if (!value || typeof value !== 'string') 
      return null
  
    try {
      return JSON.parse(value)
    }
    catch {
      return value
    }
  }

  async set(key: string, value: any): Promise<void> {
    await this.store?.setItem(key, JSON.stringify(value))
  }

  setSync(key: string, value: any){
    this.store?.setItem(key, JSON.stringify(value))
    return this
  }

  async remove(key: string): Promise<this> {
    await this.store?.removeItem(key)
    return this
  }

  async clear() {
    return await this.store.clear()
  }
}

export default BrowserStorage
