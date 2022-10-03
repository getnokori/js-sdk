import type SessionStrategies from '@/enums/auth/authStrategies.enum'

export interface Session {
  sessionKey?: string
  parentAccountId?: string
  accountId?: string
  userId?: string
  strategy?: SessionStrategies
  providerToken?: string | null
  accessToken: string
  refreshToken: string
  issuedAt: number
  /**
   * The number of seconds until the token expires (since it was issued). Returned when a login is confirmed.
   */
  expiresIn?: number
  /**
   * A timestamp of when the token will expire. Returned when a login is confirmed.
   */
  expiresAt?: number
  tokenType?: string
  // user: User | null
}

export default Session
