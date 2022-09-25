import AuthHTTP from '../services/auth.http'

class Auth{
  private http

  constructor (HTTPService) {
    this.http = new AuthHTTP(HTTPService)
  }

  public async signup(args: any) {
    const signupResponse = await this.http.signup(args)
    if(signupResponse)
      return signupResponse

    return null
  }

  public async verifyUser(args: any){
    const verifyResponse = await this.http.verifyUser(args)
    if(verifyResponse)
      return verifyResponse

    return null
  }

  public async login(args: any){
    const loginResponse = await this.http.login(args)
    if(loginResponse)
      return loginResponse

    return null
  }

  public async requestPasswordReset(args: any){
    const requestPasswordResetResponse = await this.http.requestPasswordReset(args)
    if(requestPasswordResetResponse)
      return requestPasswordResetResponse

    return null
  }

  public async resetPassword(args: any){
    const resetPasswordResponse = await this.http.resetPassword(args)
    if(resetPasswordResponse)
      return resetPasswordResponse

    return null
  }
}

export default Auth
