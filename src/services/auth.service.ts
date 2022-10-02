import type { Session, Subscription } from '../types/index.d'
import AuthEvents from '@/enums/authEvents.enum'
import { uuid } from '@/services/id.util.service'
import SessionStrategies from '@/enums/authStrategies.enum'
import AuthHTTP from '@/services/authHttp.service'

/**
 * End of day notes: 
 * - Need to follow the call chain all the way through to determine whats actually need
 * - GoTrue have functions that I don't think we need.
 * - Supabase sdk's implementation of GoTrue makes the above true. Need to reduce.
 * - Need to ensure session persistence and rehydration works with local storage and timers.
 * - Need to start with a successful login and work from there.
 * - The storage service may need to drop _isBrowser for jest to work?
 */

class AuthService {

  protected emitters: Map<string, Subscription> = new Map()
  protected currentSession: Session | null = null
  protected api: AuthHTTP
  protected user: any = null // TODO: Define a :User type for this
  protected refreshTimer?: ReturnType<typeof setTimeout>

  constructor(HTTPService, settings: any) {
    this.api = new AuthHTTP(HTTPService)

    this._handleAuthEvents()
  }

  public async signup(args: any) {
    const signupResponse = await this.api.signup(args)
    if(signupResponse)
      return signupResponse

    return null
  }

  public async verifyUser(args: any){
    const verifyResponse = await this.api.verifyUser(args)
    if(verifyResponse)
      return verifyResponse

    return null
  }

  public async login(args: any){
    const loginResponse = await this.api.login(args)
    if(loginResponse)
      return loginResponse

    return null
  }

  public async requestPasswordReset(args: any){
    const requestPasswordResetResponse = await this.api.requestPasswordReset(args)
    if(requestPasswordResetResponse)
      return requestPasswordResetResponse

    return null
  }

  public async resetPassword(args: any){
    const resetPasswordResponse = await this.api.resetPassword(args)
    if(resetPasswordResponse)
      return resetPasswordResponse

    return null
  }

  /**
   * Receive a notification every time an auth event happens.
   * @returns {Subscription} A subscription object which can be used to unsubscribe itself.
   */
  public on(callback: (event: AuthEvents, session: Session | null) => void): {
    data: Subscription | null
    error: string | null
  } {
    try {
      const id: string = uuid()
      const subscription: Subscription = {
        id,
        callback,
        unsubscribe: () => {
          this.emitters.delete(id)
        },
      }
      this.emitters.set(id, subscription)
      return { data: subscription, error: null }
    }
    catch (e) {
      return { data: null, error: e as string }
    }
  }

  private _notify(event: AuthEvents) {
    this.emitters.forEach(x => x.callback(event, this.currentSession))
  }

  private _handleAuthEvents() {
    const { data } = this.on((event, session) => {
      this._handleTokenChanged(event, session?.access_token, 'CLIENT')
    })
    return data
  }

  /**
   * Overrides the JWT on the current client. The JWT will then be sent in all subsequent network requests.
   * @param access_token a jwt access token
   */
  setAuth(access_token: string): Session {
    this.currentSession = {
      ...this.currentSession,
      accessToken,
      tokenType: 'bearer',
      user: this.api.getUser(this.user.userId),
    }

    this._pub(AuthEvents.TOKEN_REFRESHED)

    return this.currentSession
  }

  async getUser() {
    const user = await this.api.getUser(this.user.userId)
    return user
  }

  private _pub(event: AuthEvents) {
    this.emitters.forEach(x => x.callback(event, this.currentSession))
  }

  /**
   * Clear and re-create refresh token timer
   * @param value time intervals in milliseconds
   */
  private _startWatchToken(value: number) {
    if (this.refreshTimer) clearTimeout(this.refreshTimer)
    if (value <= 0 || !this.autoRefreshToken) return

    this.refreshTimer = setTimeout(async () => {
      this.networkRetries++
      const { error } = await this._callRefreshToken()
      if (!error) this.networkRetries = 0
      if (
        error?.message === NETWORK_FAILURE.ERROR_MESSAGE &&
        this.networkRetries < NETWORK_FAILURE.MAX_RETRIES
      )
        this._startAutoRefreshToken(NETWORK_FAILURE.RETRY_INTERVAL ** this.networkRetries * 100) // exponential backoff
    }, value)
    if (typeof this.refreshTimer.unref === 'function') this.refreshTimer.unref()
  }
}

export default AuthService
