'strict'

import HTTPService from '@/services/base.http.service'
import Billing from '@/services/billing/billing.service'
import Payments from '@/services/payments/payments.service'
import Auth from '@/services/auth/auth.service'
import Query from '@/services/query.service'

export class nokori {
  public _apiToken: string
  public auth: Auth
  public billing: Billing
  public payments: Payments
  public http
  public query: Query

  constructor (apiToken: string) {
    if(!apiToken) throw new Error('No token provided')
    this._apiToken = apiToken
    this.http = new HTTPService(this._apiToken)

    this.auth = new Auth(this.http, { autoRefreshSession: true })
    this.billing = new Billing(this.http, {})
    this.payments = new Payments(this.http, {})
    
    this.auth.on('LOGGED_IN', (session) => {
      if(!session?.accountId) return
      this.billing.setAccount(session.accountId)
      this.payments.setAccount(session.accountId)
    })

    this.query = new Query(this.http)
  }
}

const apiToken = process.env.NOKORI_API_KEY
const nkInstance = apiToken ? new nokori(apiToken) : null

export const auth = nkInstance?.auth
export const billing = nkInstance?.billing
export const payments = nkInstance?.payments
export const http = nkInstance?.http
export const query = nkInstance?.query

export default function Nokori(apiToken: string) {
  return new nokori(apiToken)
}
