'strict'

import HTTPService from '@/services/base.http.service'
// import Billing from './billing.class'
import Auth from '@/services/auth.service'
import Query from '@/services/query.service'

export class LolaDB {
  public _apiToken: string
  public auth: Auth
  // public billing: Billing
  public http
  public query: Query

  constructor (apiToken: string) {
    if(!apiToken) throw new Error('No token provided')
    this._apiToken = apiToken
    this.http = new HTTPService(this._apiToken)

    this.auth = new Auth(this.http, { autoRefreshSession: true })
    // this.billing = new Billing(this.HTTPService)
    this.query = new Query(this.http)
  }
}

export default LolaDB
