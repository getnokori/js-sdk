
class AuthHTTP {
  private resource = '/auth'
  private httpService 

  constructor (HTTPService) {
    this.httpService = HTTPService
  }

  public async signup(args: any) {
    const result = await this.httpService.post(`${this.resource}/signup`, args)
    if(result.status === 'error'){
      console.error(result)
      return null
    }
    return result
  }

  public async verifyUser(args: any) {
    const result = await this.httpService.get(`${this.resource}/verify/${args.verifyToken}`)
    if(result.status === 'error'){
      console.error(result)
      return null
    }
    return result
  }

  public async login(args: any) {
    const result = await this.httpService.post(`${this.resource}/login`, args)
    if(result.status === 'error'){
      console.error(result)
      return null
    }
    return result
  }

  public async requestPasswordReset(args: any) {
    const result = await this.httpService.post(`${this.resource}/password-reset-request`, args)
    if(result.status === 'error'){
      console.error(result)
      return null
    }
    return result
  }

  public async resetPassword(args: any) {
    const result = await this.httpService.post(`${this.resource}/password-reset`, args)
    if(result.status === 'error'){
      console.error(result)
      return null
    }
    return result
  }

  public async changePassword({ oldPassword, newPassword }) {
    return this.httpService.put(`${this.resource}/password-change`, {
      oldPassword,
      newPassword,
    })
  }
}

export default AuthHTTP
