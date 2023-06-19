'strict'
import 'dotenv/config'

import HTTPService from '@/services/base.http.service'
import Billing from '@/services/billing/billing.service'
import Classifiers from '@/services/classifiers/classifiers.service'
import Payments from '@/services/payments/payments.service'
import Auth from '@/services/auth/auth.service'
import Hubs from '@/services/hubs.service'
import Query from '@/services/query.service'
import AIService from '@/services/ai/ai.service'
import Mail from '@/services/mail/mail.service'

import AuthEventsEnums from '@/enums/auth/authEvents.enum'

export class nokori {
  public _apiToken: string
  public auth: Auth
  public hubs: Hubs
  public billing: Billing
  public classifiers: Classifiers
  public payments: Payments
  public http
  public ai: AIService
  public query: Query
  public mail: Mail

  constructor (apiToken: string) {
    if(!apiToken) throw new Error('No token provided')
    this._apiToken = apiToken
    this.http = new HTTPService(this._apiToken)

    this.auth = new Auth(this.http, { autoRefreshSession: true })
    this.billing = new Billing(this.http, {})
    this.classifiers = new Classifiers(this.http, {})
    this.hubs = new Hubs(this.http, {})
    this.mail = new Mail(this.http, {})
    this.payments = new Payments(this.http, {})
    this.ai = new AIService(this.http, {})
    
    this.auth.on(AuthEventsEnums.LOGGED_IN, (session) => {
      if(!session?.accountId) return
      this.billing.setAccount(session.accountId)
      this.payments.setAccount(session.accountId)
    })

    this.query = new Query(this.http)
  }
}

export default nokori
