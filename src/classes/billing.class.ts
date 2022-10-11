import BillingHTTP from '../services/billing/billing.http'

class Billing{
  private http

  constructor (HTTPService) {
    this.http = new BillingHTTP(HTTPService)
  }

  public async getPlans(args: any = { freq: null, groupId: null }) {
    const signupResponse = await this.http.getPlans(args)
    if(signupResponse)
      return signupResponse

    return null
  }

}

export default Billing
