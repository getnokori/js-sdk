import axios from 'axios'

const baseURL = `${process.env.APP_API_URL}/v1`

const Repository = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-store',
  },
})

const init = (apiToken: string) => {
  try {
    Repository.interceptors.request.use(
      async (config) => {
        if(!config || !config.headers) throw new Error('No token provided')
        try {
          config.headers.Authorization = apiToken
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
    console.log('Error initializing http service', error.message)
  }

  return Repository
}

export default init
