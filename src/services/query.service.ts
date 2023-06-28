import QueryHTTP from '@/services/queryHttp.service'
import type lolaAPIResponse from '@/types/nkApiResponse.interface'

class Query {

  protected api: QueryHTTP

  constructor(HTTPService) {
    this.api = new QueryHTTP(HTTPService)
  }

  public async execute(args: any): Promise<lolaAPIResponse> {
    const { data, error } = await this.api.execute(args)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }
}

export default Query
