import axios from 'axios'
import HTTPHeaders from '../enums/httpHeaders.enum'

const baseURL = 'http://127.0.0.1:4777/v1'

const Repository = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-store',
  },
})

const init = (apiToken: string, jwt: string | null = null ) => {
  try {
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
        return response.data
      },
    
      async (error) => {
        if (axios.isAxiosError(error)) {
          console.log(error)
          console.log('error message: ', error.message)
          Promise.reject(error)
        }
        else{
          console.log('unexpected error: ', error)
          Promise.reject(error.response.data)
        }
      },
    )
    
  }
  catch (error: any) {
    console.log(error)
  }

  return Repository
}

export default init
