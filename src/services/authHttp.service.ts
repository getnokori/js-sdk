import type lolaAPIResponse from '@/types/lolaApiResponse.interface'

class AuthHTTP {
  private resource = '/auth'
  private httpService
  private baseHTTPService

  constructor (HTTPService) {
    this.baseHTTPService = HTTPService
    this.httpService = HTTPService.repository
  }

  public async refreshServiceToken(token: string | null): Promise<boolean | null> {
    await this.baseHTTPService.updateToken(token)
    return true
  }

  public async signup(args: any): Promise<lolaAPIResponse> {
    try {
      const result = await this.httpService.post(`${this.resource}/signup`, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async verifyUser(args: any): Promise<lolaAPIResponse> {
    try {
      const result = await this.httpService.get(`${this.resource}/verify/${args.verifyToken}`)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async login(args: any): Promise<lolaAPIResponse> {
    try{
      const result = await this.httpService.post(`${this.resource}/login`, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async logout(token: string): Promise<lolaAPIResponse> {
    try{
      const result = await this.httpService.get(`${this.resource}/logout?token=${token}`)
      console.log(result)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }

  }

  public async requestPasswordReset(args: any): Promise<lolaAPIResponse> {
    try{
      const result = await this.httpService.post(`${this.resource}/password-reset-request`, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async resetPassword(args: any): Promise<lolaAPIResponse> {
    try{
      const result = await this.httpService.post(`${this.resource}/password-reset`, args)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async changePassword({ oldPassword, newPassword }): Promise<lolaAPIResponse> {
    try{
      const result = this.httpService.put(`${this.resource}/password-change`, {
        oldPassword,
        newPassword,
      })
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }

      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  // TODO Implement /user in api-core
  public async getUser(userId: string): Promise<lolaAPIResponse> {
    try{
      const result = await this.httpService.get(`${this.resource}/users/${userId}`)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async refreshSession(token: string): Promise<lolaAPIResponse> {
    try{
      const result = await this.httpService.get(`${this.resource}/refresh?token=${token}`)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }
}

export default AuthHTTP
