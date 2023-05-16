import aiHTTP from '@/services/ai/ai.http'

class AIService {

  protected api: aiHTTP
  protected accountId: string | null = null

  constructor(HTTPService, settings: any) {
    this.api = new aiHTTP(HTTPService)
  }

  public async generate(args: {prompt: string; context: string[]}) {
    const { data, error } = await this.api.generate(args)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

  public async summarize(args: {context: string[]}) {
    const { data, error } = await this.api.summarize(args)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

}

export default AIService
