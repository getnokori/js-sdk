import axios from 'axios'
import HTTPHeaders from '../enums/httpHeaders.enum'

class BaseHTTP {
  protected apiToken: string
  protected baseURL = 'http://127.0.0.1:4777/v1'
  public repository
  protected bearerToken: string | null = null

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
      async (config) => {
        if(!config) throw new Error('No token provided')
        try {
          config.headers[HTTPHeaders.LOLADB_API_KEY] = this.apiToken
          if(this.bearerToken) config.headers[HTTPHeaders.AUTHORIZATION] = `Bearer ${this.bearerToken}`
        }
        catch (error) {
          console.error('Error adding token to auth headers', error)
        }
      
        return config
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
    this.bearerToken = token
    console.log('token updated', this.bearerToken)
  }
}

export default BaseHTTP
