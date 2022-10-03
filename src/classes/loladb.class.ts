// import HTTPService from '../services/base.http.service'
// import Billing from './billing.class'
// import Auth from '@/services/auth.service'

// class LolaDB {
//   public _apiToken: string
//   public auth: Auth
//   public billing: Billing
//   private HTTPService

//   constructor (apiToken: string) {
//     if(!apiToken) throw new Error('No token provided')
//     this._apiToken = apiToken
//     this.HTTPService = HTTPService(this._apiToken)

//     this.auth = new Auth(this.HTTPService, { autoRefreshSession: true })
//     this.billing = new Billing(this.HTTPService)
//   }
// }

// export default LolaDB
