import type IUserDTO from '@/types/auth.type'
import type nkAPIResponse from '@/types/nkApiResponse.interface'

class AuthHTTP {
  private resource = '/auth'
  private httpService
  private baseHTTPService

  constructor (HTTPService) {
    this.baseHTTPService = HTTPService
    this.httpService = HTTPService.repository
  }

  public async refreshServiceToken(token: string): Promise<boolean | null> {
    await this.baseHTTPService.updateToken(token)
    return true
  }

  public async signup(args: IUserDTO): Promise<nkAPIResponse> {
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

  public async verifyUser(args: {verifyToken: string}): Promise<nkAPIResponse> {
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

  public async login(args: any): Promise<nkAPIResponse> {
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

  public async logout(token: string): Promise<nkAPIResponse> {
    try{
      const result = await this.httpService.get(`${this.resource}/logout?token=${token}`)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }

  }

  public async changePassword(args: { password: string; token: string }): Promise<nkAPIResponse> {
    try {
      const { password, token } = args
      const result = await this.httpService.put(`${this.resource}/users/password?token=${token}`, { password })
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
        
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async setPassword(args: { password: string; userId: string }): Promise<nkAPIResponse> {
    try {
      const { password, userId } = args
      const result = await this.httpService.post(`${this.resource}/users/${userId}/password`, { password })
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
        
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  // TODO Implement /user in api-core
  public async getUser(userId: string): Promise<nkAPIResponse> {
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

  public async getUsers(): Promise<nkAPIResponse> {
    try{
      const result = await this.httpService.get(`${this.resource}/users`)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async getSession(args: {sessionKey: string}): Promise<nkAPIResponse> {
    try{
      const result = await this.httpService.get(`${this.resource}/sessions/${args.sessionKey}`)
      if(result.status === 'error')
        return { data: null, error: result, statusCode: result.statusCode }
      
      return { data: result.data, error: null, statusCode: result.statusCode }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async refreshSession(token: string): Promise<nkAPIResponse> {
    try{
      const result = await this.httpService.get(`${this.resource}/sessions/refresh?token=${token}`)
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
