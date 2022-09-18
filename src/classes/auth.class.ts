import AuthHTTP from '../services/auth.http'

class Auth{
  private _apiToken: string
  private http

  constructor (apiToken) {
    this._apiToken = apiToken
    this.http = new AuthHTTP(this._apiToken)
  }

  public async signup(args: any) {
    console.log('signup', this._apiToken)
    const signupResponse = await this.http.signup(args)
    if(signupResponse)
      return signupResponse

    return null
  }

  public async verifyUser(args: any){
    console.log('verifyUser', this._apiToken)
    const verifyResponse = await this.http.verifyUser(args)
    if(verifyResponse)
      return verifyResponse

    return null
  }
}

export default Auth