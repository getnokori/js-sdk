import BaseService from './base.http.service'

class AuthHTTP {
  private _apiToken: string
  private resource = '/auth'
  private httpService 
  constructor (apiToken: string) {
    this._apiToken = apiToken
    this.httpService = BaseService(this._apiToken)
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

  public async changePassword({ oldPassword, newPassword }) {
    return this.httpService.put(`${this.resource}/password-change`, {
      oldPassword,
      newPassword,
    })
  }
}

export default AuthHTTP
