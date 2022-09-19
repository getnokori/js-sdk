import AuthHTTP from '../services/auth.http'

class Auth{
  private _apiToken: string
  private http

  constructor (apiToken) {
    this._apiToken = apiToken
    this.http = new AuthHTTP(this._apiToken)
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
}

export default Auth
