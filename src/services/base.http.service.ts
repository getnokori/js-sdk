import axios from 'axios'
import HTTPHeaders from '../enums/httpHeaders.enum'

const baseURL = 'http://127.0.0.1:4777/v1'

const Repository = axios.create({
  baseURL,
  headers: {
    'Cache-Control': 'no-store',
  },
})

const init = (apiToken: string, jwt: string | null = null ) => {
  Repository.interceptors.request.use(
    async (config) => {
      if(!config || !config.headers) throw new Error('No token provided')
      try {
        config.headers[HTTPHeaders.LOLADB_API_KEY] = apiToken
        if(jwt) config.headers.Authorization = jwt
          
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
    
  Repository.interceptors.response.use(
    (response) => {
      if(response.data.statusCode === 200)
        return response.data || null
      
      return Promise.reject(response.data)
    },
    
    async (error) => {
      return Promise.reject(error.response.data)
      
    },
  )

  return Repository
}

export default init
