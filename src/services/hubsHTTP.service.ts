interface HubsAPIResponse {
  data: any | null
  error: Error | null 
  statusCode?: number | null 
}

class HubsHTTP {
  private resource = '/hubs'
  private httpService 

  constructor (HTTPService) {
    this.httpService = HTTPService.repository
  }

  public async prompt(args: {hubId: string; prompt: string; topN?: number}): Promise<HubsAPIResponse> {
    try{
      const body = { prompt: args.prompt }
      if(args.topN) body['topN'] = args.topN

      const result = await this.httpService.post(`${this.resource}/${args.hubId}/prompt`, body)
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
