import type BaseService from '../base.http.service'
import HTTPQueryUtils from '../../utils/httpQueries.util'
import type SendMailRequestDTO from '../../types/mail.d'

class MailHTTP {
  private mailResource = '/mail'

  private httpService 
  private baseHTTPService

  constructor (HTTPService) {
    this.baseHTTPService = HTTPService
    this.httpService = HTTPService.repository
  }

  public async send(args: SendMailRequestDTO) {
    try {
      const url = `${this.mailResource}/send`
      const result = await this.httpService.post(url, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

}

export default MailHTTP
