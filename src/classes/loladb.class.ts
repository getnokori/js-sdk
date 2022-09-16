import Auth from './auth.class'

class LolaDB {
  public _apiToken: string
  public auth: Auth

  constructor (apiToken: string) {
    if(!apiToken) throw new Error('No token provided')
    this._apiToken = apiToken
    
    this.auth = new Auth(this._apiToken)
  }
}

export default LolaDB
