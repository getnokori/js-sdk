
class AuthHTTP {
  private resource = '/auth'
  private httpService 

  constructor (HTTPService) {
    this.httpService = HTTPService
  }

  public async signup(args: any) {
    try {
      const result = await this.httpService.post(`${this.resource}/signup`, args)
      if(result.status === 'error'){
        console.error(result)
        return null
      }
      return result
    }
    catch (error: any) {
      return error.response.data
    }
  }

  public async verifyUser(args: any) {
    try {
      const result = await this.httpService.get(`${this.resource}/verify/${args.verifyToken}`)
      if(result.status === 'error'){
        console.error(result)
        return null
      }
      return result
    }
    catch (error: any) {
      return error.response.data
    }
  }

  public async login(args: any) {
    try{
      const result = await this.httpService.post(`${this.resource}/login`, args)
      if(result.status === 'error'){
        console.error(result)
        return null
      }
      return result
    }
    catch (error: any) {
      return error.response.data
    }
  }

  public async logout(token: string) {
    try{
      const result = await this.httpService.get(`${this.resource}/logout?token=${token}`)
      if(result.status === 'error'){
        console.error(result)
        return null
      }
      return result
    }
    catch (error: any) {
      return error.response.data
    }

  }

  public async requestPasswordReset(args: any) {
    try{
      const result = await this.httpService.post(`${this.resource}/password-reset-request`, args)
      if(result.status === 'error'){
        console.error(result)
        return null
      }
      return result
    }
    catch (error: any) {
      return error.response.data
    }
  }

  public async resetPassword(args: any) {
    try{
      const result = await this.httpService.post(`${this.resource}/password-reset`, args)
      if(result.status === 'error'){
        console.error(result)
        return null
      }
      return result
    }
    catch (error: any) {
      return error.response.data
    }
  }

  public async changePassword({ oldPassword, newPassword }) {
    try{
      return this.httpService.put(`${this.resource}/password-change`, {
        oldPassword,
        newPassword,
      })
    }
    catch (error: any) {
      return error.response.data
    }
  }

  // TODO Implement /user in api-core
  public async getUser(userId: string){
    try{
      const result = await this.httpService.get(`${this.resource}/users/${userId}`)
      if(result.status === 'error'){
        console.error(result)
        return null
      }
      return result
    }
    catch (error: any) {
      return error.response.data
    }
  }

  public async refreshSession(token: string) {
    try{
      const result = await this.httpService.get(`${this.resource}/refresh?token=${token}`)
      if(result.status === 'error'){
        console.error(result)
        return null
      }
      return result
    }
    catch (error: any) {
      return error.response.data
    }
  }
}

export default AuthHTTP
