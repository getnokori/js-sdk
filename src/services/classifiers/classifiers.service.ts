import StorageService from '@/services/storage.service'
import ClassifiersHTTP from '@/services/classifiers/classifiers.http'
import StorageEnums from '@/enums/storage/storage.enum'

class ClassifiersService {

  protected api: ClassifiersHTTP
  protected storage = new StorageService()
  protected accountId: string | null = null

  constructor(HTTPService, settings: any) {
    this.api = new ClassifiersHTTP(HTTPService)
  }

  public async create(args: any = { name: null }) {
    const { data, error } = await this.api.create(args)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

  public async train(args: { classifierId: string; label: any; context: string }) {
    const { classifierId, ...rest } = args
    
    const { data, error } = await this.api.train(classifierId, rest)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

  public async predict(args: { classifierId: string; context: string }) {
    const { classifierId, ...rest } = args
    
    const { data, error } = await this.api.predict(classifierId, rest)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

}

export default ClassifiersService
