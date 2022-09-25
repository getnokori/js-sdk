import type BaseService from './base.http.service'
import HTTPQueryUtils from '../utils/httpQueries.util'

class BillingHTTP {
  private resource = '/billing'
  private httpService 

  constructor (httpService: typeof BaseService) {
    this.httpService = httpService
  }

  public async getPlans(args: any) {
    const queryString = HTTPQueryUtils.toQueryString(args)

    const url = queryString ? `${this.resource}/plans?${queryString}` : `${this.resource}/plans`
    const result = await this.httpService.get(url)
    if(result.status === 'error'){
      console.error(result)
      return null
    }
    return result
  }

}

export default BillingHTTP
