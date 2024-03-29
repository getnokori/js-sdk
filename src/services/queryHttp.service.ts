import type AuthAPIResponse from '@/types/nkApiResponse.interface'

class QueryHTTP {
  private resource = '/queries'
  private httpService 

  constructor (HTTPService) {
    this.httpService = HTTPService.repository
  }

  public async execute(args: any): Promise<AuthAPIResponse> {
    try {
      const result = await this.httpService.post(`${this.resource}/execute`, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }
}

export default QueryHTTP
