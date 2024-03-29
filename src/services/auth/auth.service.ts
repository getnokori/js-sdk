import AuthEvents from '@/enums/auth/authEvents.enum'
import { uuid } from '@/services/id.util.service'
import SessionStrategies from '@/enums/auth/authStrategies.enum'
import AuthHTTP from '@/services/auth/authHttp.service'
import NetworkFailure from '@/enums/auth/network.enum'
import type Session from '@/types/session.d'
import type Subscription from '@/types/subscription.d'
import StorageService from '@/services/storage.service'
import StorageEnums from '@/enums/storage/storage.enum'
import SessionTimes from '@/enums/auth/times.enum'
import AuthStatuses from '@/enums/auth/authStatuses.enum'

class AuthService {

  protected emitters: Record<string, Map<string, Subscription>> = { 
    LOGGED_OUT: new Map(),
    LOGGED_IN: new Map(),
    TOKEN_CREATED: new Map(),
    TOKEN_REFRESHED: new Map(),
    SESSION_CREATED: new Map(),
    SESSION_DELETED: new Map(),
    SESSION_UPDATED: new Map(),
    USER_UPDATED: new Map(),
    USER_DELETED: new Map(),
  }
  protected currentSession: Session | null = null
  protected api: AuthHTTP
  protected user: any = null // TODO: Define a :User type for this
  protected refreshTimer?: ReturnType<typeof setTimeout>
  protected persistSession: boolean = true
  protected networkRetries = 0
  protected refreshToken = ''
  protected storage = new StorageService()
  protected autoRefreshSession = false
  private inauthenticatedResponse = { 
    data: null, 
    error: {
      status: 'unauthorized',
      redirectTo: '/login',
    }, 
  }
  private authenticatedResponse = {
    data: { 
      isAuthenticated: true,      
    },
    error: null,
  }

  constructor(HTTPService, settings: any) {
    this.api = new AuthHTTP(HTTPService)

    this.autoRefreshSession = settings.autoRefreshSession || 1
    this._recoverSession()
    this._recoverAndRefresh()
  }

  public async signup(args: { email: string; password?: string; firstName?: string; lastName?: string; autoVerify?: boolean }) {
    const { data, error } = await this.api.signup(args)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

  public async verifyUser(args: {verifyToken: string}){
    const { data, error } = await this.api.verifyUser(args)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

  public async login(args: any){
    this._removeSession()

    const { data, error } = await this.api.login(args)
    if (error || !data) return { error }

    if (data?.status === AuthStatuses.AUTHORIZED) {
      this._saveSession(data.session)
      this._notify(AuthEvents.LOGGED_IN)
    }
    else{
      this._notify(AuthEvents.LOGGED_OUT)
      return { data: null, error: 'Unauthorized' }
    }

    return {
      data: {
        redirectTo: data.redirectTo, 
        session: {
          accountId: data.session.accountId,
          userId: data.session.userId,
        }, 
        meta: { ...data.meta },
      },
      error: null, 
    }
  }

  public async logout(){
    const result = {
      data: {
        redirectTo: '/login', 
      },
      error: null, 
    }

    if (!this.currentSession) return result
    try {
      await this.api.logout(this.currentSession.accessToken)
    }
    catch (error) {}

    await this._removeSession()
    this._notify(AuthEvents.LOGGED_OUT)

    return result
  }

  public async changePassword(args: { password: string; token: string }){
    const { data, error } = await this.api.changePassword(args)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

  public async setPassword(args: { password: string; userId: string }){
    const { data, error } = await this.api.setPassword(args)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

  /**
   * Receive a notification every time an auth event happens.
   * @returns {Subscription} A subscription object which can be used to unsubscribe itself.
   */
  public on(authEvent: keyof typeof AuthEvents, callback: (session: Session | null) => void): {
    data: Subscription | null
    error: string | null
  } {
    try {
      const id: string = uuid()
      const subscription: Subscription = {
        id,
        callback,
        unsubscribe: () => {
          this.emitters[authEvent].delete(id)
        },
      }
      this.emitters[authEvent].set(id, subscription)
      return { data: subscription, error: null }
    }
    catch (error: any) {
      return { data: null, error: error }
    }
  }

  async getUser() {
    try {
      if(!this.user?.userId) 
        return this.inauthenticatedResponse
      
      const { data, error } = await this.api.getUser(this.user.userId)
      if(!data)
        return { data: null, error: error }
      
      return { data: data, error: null }
    }
    catch (error) {
      return { data: null, error: error }
    }
  }

  async getUsers() {
    try {     
      const { data, error } = await this.api.getUsers()
      if(!data)
        return { data: null, error: error }
      
      return { data: data, error: null }
    }
    catch (error) {
      return { data: null, error: error }
    }
  }

  public async isAuthenticated() {
    const data = this.storage.getSync(StorageEnums.STORAGE_KEY)
    if (!data || !data.session) 
      return this.inauthenticatedResponse
    
    const { session } = data
    const timeNow = Math.round(Date.now() / 1000)

    if (session.expiresAt > timeNow) 
      return this.authenticatedResponse

    return this.inauthenticatedResponse
  }

  private _notify(authEvent: AuthEvents) {
    this.emitters[authEvent].forEach(x => x.callback(this.currentSession))
  }

  /**
   * Clear and re-create refresh token timer
   * @param value time intervals in milliseconds
   * // TODO: fix all the red squigglies
   */
  private _startWatchToken(value: number) {
    if (this.refreshTimer) clearTimeout(this.refreshTimer)
    if (value <= 0 || !this.refreshToken) return

    this.refreshTimer = setTimeout(async () => {
      this.networkRetries++
      const { error } = await this._refreshToken()
      if (!error) this.networkRetries = 0
      if (
        error?.message === NetworkFailure.ERROR_MESSAGE &&
        this.networkRetries < NetworkFailure.MAX_RETRIES
      )
        this._startWatchToken(NetworkFailure.RETRY_INTERVAL ** this.networkRetries * 100) // exponential backoff
    }, value)
    if (typeof this.refreshTimer.unref === 'function') this.refreshTimer.unref()
  }

  private async _refreshToken(refreshToken = this.currentSession?.refreshToken): Promise<{ data: Session | null; error: Error | null }> {
    try {
      if (!refreshToken) {
        this._notify(AuthEvents.LOGGED_OUT)
        throw new Error('No current session.')
      }
      const { data, error } = await this.api.refreshSession(refreshToken)
      if (error) throw error
      if (!data) throw new Error('Invalid session data.')

      if(data.status !== AuthStatuses.AUTHORIZED){
        this._notify(AuthEvents.LOGGED_OUT)
        throw new Error('Session is expired.')
      }

      this._saveSession(data.session)
      this._notify(AuthEvents.TOKEN_REFRESHED)
      this._notify(AuthEvents.LOGGED_IN)

      return { data, error: null }
    }
    catch (error: any) {
      console.error(error)
      return { data: null, error: error }
    }
  }

  /**
   * Attempts to get the session from LocalStorage
   * Note: this should never be async (even for React Native), as we need it to return immediately in the constructor.
   */
  private _recoverSession() {
    try {
      const data = this.storage.getSync(StorageEnums.STORAGE_KEY)
      if (!data || !data.session) return null
      const { session } = data
      const timeNow = Math.round(Date.now() / 1000)

      if (session.expiresAt >= timeNow + SessionTimes.EXPIRY_MARGIN) {
        this._saveSession(session)
        this._notify(AuthEvents.LOGGED_IN)
      }
    }
    catch (error) {
      return { data: null, error: error }
    }
  }

  /**
   * Recovers the session from LocalStorage and refreshes
   * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
   */
  private async _recoverAndRefresh() {
    try {
      const data = await this.storage.get(StorageEnums.STORAGE_KEY)
      if (!data) return null
      const { session } = data
      const timeNow = Math.round(Date.now() / 1000)

      if (session.expiresAt < timeNow + SessionTimes.EXPIRY_MARGIN) {
        if (this.refreshToken && this.currentSession?.refreshToken) {
          this.networkRetries++
          const { error } = await this._refreshToken(session.refreshToken)
          if (error) {
            if (
              error.message === NetworkFailure.ERROR_MESSAGE &&
              this.networkRetries < NetworkFailure.MAX_RETRIES
            ) {
              if (this.refreshTimer) clearTimeout(this.refreshTimer)
              this.refreshTimer = setTimeout(
                () => this._recoverAndRefresh(),
                NetworkFailure.RETRY_INTERVAL ** this.networkRetries * 100, // exponential backoff
              )
              return
            }
            await this._removeSession()
          }
          this.networkRetries = 0
        }
        else {
          this._removeSession()
        }
      }
      else if (!this.currentSession) {
        console.log('Current session is missing data.')
        this._removeSession()
      }
      else {
        // should be handled on _recoverSession method already
        // But we still need the code here to accommodate for AsyncStorage e.g. in React native
        this._saveSession(this.currentSession)
        this._notify(AuthEvents.LOGGED_IN)
      }
    }
    catch (error) {
      console.error(error)
      return { data: null, error: error }
    }
  }

  /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */
  private _saveSession(session: Session) {
    this.currentSession = session
    this.user = { userId: session.userId, accountId: session.accountId }
    this.refreshToken = session.refreshToken

    const expiresAt = session.expiresAt
    if (expiresAt) {
      const timeNow = Math.round(Date.now() / 1000)
      const expiresIn = expiresAt - timeNow
      const refreshDurationBeforeExpires = expiresIn > SessionTimes.EXPIRY_MARGIN ? SessionTimes.EXPIRY_MARGIN : 0.5
      this._startWatchToken((expiresIn - refreshDurationBeforeExpires) * 1000)
    }

    // Do we need any extra check before persist session
    // access_token or user ?
    if (this.persistSession && session.expiresAt) 
      this._persistSession(this.currentSession)
  }

  private async _persistSession(currentSession: Session) {
    const data = { session: currentSession, expiresAt: currentSession.expiresAt }
    await this.storage.set(StorageEnums.STORAGE_KEY, data)
  }

  private async _removeSession(): Promise<void> {
    this.currentSession = null
    if (this.refreshTimer) clearTimeout(this.refreshTimer)
    await this.storage.remove(StorageEnums.STORAGE_KEY)
  }
}

export default AuthService
