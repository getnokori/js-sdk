import type BaseService from '../base.http.service'
import HTTPQueryUtils from '../../utils/httpQueries.util'

class ClassifiersHTTP {
  private classifiersResource = '/classifiers'

  private httpService 
  private baseHTTPService

  constructor (HTTPService) {
    this.baseHTTPService = HTTPService
    this.httpService = HTTPService.repository
  }

  public async create(args?: any) {
    try {
      const url = `${this.classifiersResource}`
      const result = await this.httpService.post(url, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async getMany() {
    try {
      const url = `${this.classifiersResource}`
      const result = await this.httpService.get(url)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async getOne(classifierId: string) {
    try {
      const url = `${this.classifiersResource}/${classifierId}`
      const result = await this.httpService.get(url)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async train(classifierId: string, args: {label: any; context: string}) {
    try {
      const url = `${this.classifiersResource}/${classifierId}/train`
      const result = await this.httpService.put(url, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async predict(classifierId: string, args: {context: string}) {
    try {
      const url = `${this.classifiersResource}/${classifierId}/predict`
      const result = await this.httpService.post(url, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async delete(classifierId: string) {
    try {
      const url = `${this.classifiersResource}/${classifierId}`
      const result = await this.httpService.delete(url)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

}

export default ClassifiersHTTP
