import type BaseService from '../base.http.service'
import HTTPQueryUtils from '../../utils/httpQueries.util'

class BillingHTTP {
  private billingResource = '/billing'
  private paymentsResource = '/payments'
  private httpService 
  private baseHTTPService

  constructor (HTTPService) {
    this.baseHTTPService = HTTPService
    this.httpService = HTTPService.repository
  }

  public async getPlans(args: any) {
    try {
      const queryString = HTTPQueryUtils.toQueryString(args)
      const url = queryString ? `${this.billingResource}/plans?${queryString}` : `${this.billingResource}/plans`
      const result = await this.httpService.get(url)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }
  
  public async subscribe(args: {accountId: string; planId: string}){
    try {
      const result = await this.httpService.post(`${this.billingResource}/plans/subscribe`, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async createPaymentMethod(args: any){
    try {
      const result = await this.httpService.post(`${this.paymentsResource}/methods/create`, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

}

export default BillingHTTP
