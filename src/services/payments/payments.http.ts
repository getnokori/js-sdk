import type BaseService from '../base.http.service'
import HTTPQueryUtils from '../../utils/httpQueries.util'

class PaymentsHTTP {
  private resource = '/payments'
  private httpService 
  private baseHTTPService

  constructor (HTTPService) {
    this.baseHTTPService = HTTPService
    this.httpService = HTTPService.repository
  }

  public async createPaymentMethod(args: any){
    try {
      const result = await this.httpService.post(`${this.resource}/methods/create`, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

}

export default PaymentsHTTP
