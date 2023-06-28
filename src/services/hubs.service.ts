import HubsHTTP from '@/services/hubsHTTP.service'
import type lolaAPIResponse from '@/types/nkApiResponse.interface'

class HubsService {

  protected api: HubsHTTP

  constructor(HTTPService, settings: any) {
    this.api = new HubsHTTP(HTTPService)
  }

  public async prompt(args: {hubId: string; prompt: string; topN?: number}): Promise<lolaAPIResponse> {
    try{
      if(!args.hubId)
        throw new Error('hubId is required')

      const { data, error } = await this.api.prompt(args)
      if(!data)
        return { data: null, error: error }

      return { data: data, error: null }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }
}

export default HubsService
