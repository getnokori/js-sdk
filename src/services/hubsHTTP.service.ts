interface HubsAPIResponse {
  data: any | null
  error: Error | null 
  statusCode?: number | null 
}

class HubsHTTP {
  private resource = '/hubs'
  private httpService 

  constructor (HTTPService) {
    this.httpService = HTTPService
  }

  public async query(args): Promise<HubsAPIResponse> {
    try{
      const result = await this.httpService.get(`${this.resource}/`)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }
}

export default HubsHTTP
