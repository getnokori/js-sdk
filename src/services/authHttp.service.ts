
class AuthHTTP {
  private resource = '/auth'
  private httpService 

  constructor (HTTPService) {
    this.httpService = HTTPService
  }

  public async signup(args: any) {
    try {
      const result = await this.httpService.post(`${this.resource}/signup`, args)
      if(result.status === 'error')
        return { data: null, error: result }
      
      return { data: result, error: null }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async verifyUser(args: any) {
    try {
      const result = await this.httpService.get(`${this.resource}/verify/${args.verifyToken}`)
      if(result.status === 'error')
        return { data: null, error: result }
      
      return { data: result, error: null }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async login(args: any): Promise<{ data: any | null; error: Error | null }> {
    try{
      const result = await this.httpService.post(`${this.resource}/login`, args)
      if(result.status === 'error')
        return { data: null, error: result }
      
      return { data: result, error: null }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async logout(token: string) {
    try{
      const result = await this.httpService.get(`${this.resource}/logout?token=${token}`)
      if(result.status === 'error')
        return { data: null, error: result }
      
      return { data: result, error: null }
    }
    catch (error: any) {
      return { data: null, error: error }
    }

  }

  public async requestPasswordReset(args: any) {
    try{
      const result = await this.httpService.post(`${this.resource}/password-reset-request`, args)
      if(result.status === 'error')
        return { data: null, error: result }
      
      return { data: result, error: null }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async resetPassword(args: any) {
    try{
      const result = await this.httpService.post(`${this.resource}/password-reset`, args)
      if(result.status === 'error')
        return { data: null, error: result }
      
      return { data: result, error: null }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async changePassword({ oldPassword, newPassword }) {
    try{
      const result = this.httpService.put(`${this.resource}/password-change`, {
        oldPassword,
        newPassword,
      })
      if(result.status === 'error')
        return { data: null, error: result }

      return { data: null, error: result }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  // TODO Implement /user in api-core
  public async getUser(userId: string){
    try{
      const result = await this.httpService.get(`${this.resource}/users/${userId}`)
      if(result.status === 'error')
        return { data: null, error: result }
      
      return { data: result, error: null }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  public async refreshSession(token: string) {
    try{
      const result = await this.httpService.get(`${this.resource}/refresh?token=${token}`)
      if(result.status === 'error')
        return { data: null, error: result }
      
      return { data: result, error: null }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }
}

export default AuthHTTP
