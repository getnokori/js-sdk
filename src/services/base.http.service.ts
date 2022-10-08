import axios from 'axios'
import HTTPHeaders from '../enums/httpHeaders.enum'
import StorageService from '@/services/storage.service'
import StorageEnums from '@/enums/storage/storage.enum'

class BaseHTTP {
  protected apiToken: string
  protected baseURL = 'http://127.0.0.1:4777/v1'
  private repository
  protected bearerToken: string | null = null
  protected store = new StorageService()

  constructor(apiToken: string) {
    this.apiToken = apiToken
    this.repository = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Cache-Control': 'no-store',
      },
    })

    this.init()
  }

  public init = () => {
    this.repository.interceptors.request.use(
      async (req) => {
        try {
          if(!req.headers[HTTPHeaders.LOLADB_API_KEY]) 
            req.headers[HTTPHeaders.LOLADB_API_KEY] = this.apiToken
           
          const token = await this.store.get(StorageEnums.STORAGE_KEY)
          console.log('if bearerToken', this.bearerToken)
          if(token && req.headers) {
            if(!req.headers[HTTPHeaders.AUTHORIZATION])
              req.headers[HTTPHeaders.AUTHORIZATION] = `Bearer ${token}`
            
            else
              req.headers[HTTPHeaders.AUTHORIZATION] = `Bearer ${token}`
            
          }
        }
        catch (error) {
          console.error('Error adding token to auth headers', error)
        }
      
        return req
      },
      
      async (error) => {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message)
          return Promise.reject(error)
        }
        else {
          console.log('unexpected error: ', error)
          return Promise.reject('An unexpected error occurred')
        }
      },
    )
      
    this.repository.interceptors.response.use(
      (response) => {
        if(response.data.statusCode === 200)
          return response.data || null
        
        return Promise.reject(response.data)
      },
      
      async (error) => {
        console.log('http error', error)
        return Promise.reject(error.response.data)
        
      },
    )
  }

  public updateToken = (token: string) => {
    console.log('before token updated', this.bearerToken)
    console.log('1', this.bearerToken)
    this.bearerToken = token
    console.log('2', this.bearerToken)
    console.log('2.5', this.repository)
    // this.repository = null
    // console.log('3', this.repository)
    // this.init()
    console.log('4', this.repository)
    console.log('token updated', this.bearerToken)
    return true
  }
}

export default BaseHTTP
