import axios from 'axios'
import HTTPHeaders from '../enums/httpHeaders.enum'
import StorageService from '@/services/storage.service'
import StorageEnums from '@/enums/storage/storage.enum'

class BaseHTTP {
  protected apiToken: string
  protected baseURL = 'http://127.0.0.1:4777/v1'
  public repository
  protected bearerToken: string | null = null
  protected storage = new StorageService()

  constructor(apiToken: string) {
    this.apiToken = apiToken
    this.repository = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
    })

    this.init()
  }

  public init = () => {
    this.repository.interceptors.request.use(
      async (config) => {
        try {
          config.headers[HTTPHeaders.LOLADB_API_KEY] = this.apiToken

          const data = await this.storage.get(StorageEnums.STORAGE_KEY)
          if(data?.session?.accessToken)
            config.headers[HTTPHeaders.AUTHORIZATION] = `Bearer ${data.session.accessToken}`
          
        }
        catch (error) {
          console.error('Error adding token to auth headers', error)
        }
      
        return config
      },
      
      async (error) => {
        if (axios.isAxiosError(error)) 
          return Promise.reject(error)
        
        else 
          return Promise.reject('An unexpected error occurred')
        
      },
    )
      
    this.repository.interceptors.response.use(
      (response) => {
        if(response.data.statusCode === 200)
          return response.data || null
        
        return Promise.reject(response.data)
      },
      
      async (error) => {
        return Promise.reject(error.response.data)
        
      },
    )
  }
}

export default BaseHTTP
