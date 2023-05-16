import type BaseService from '../base.http.service'
import HTTPQueryUtils from '../../utils/httpQueries.util'

class aiHTTP {
  private aiResource = '/ai'
  private httpService 
  private baseHTTPService

  constructor (HTTPService) {
    this.baseHTTPService = HTTPService
    this.httpService = HTTPService.repository
  }

  public async generate(args: {prompt: string; context: string[]}){
    try {
      const result = await this.httpService.post(`${this.aiResource}/generate`, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async summarize(args: {context: string[]}){
    try {
      const result = await this.httpService.post(`${this.aiResource}/summarize`, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }
}

export default aiHTTP
