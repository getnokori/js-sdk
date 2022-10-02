/// <reference types="node" />

declare module 'loladb' {
  namespace LolaDB {}

  export default LolaDB
}

export interface Subscription {
  /**
   * The subscriber UUID. This will be set by the client.
   */
  id: string
  /**
   * The function to call every time there is an event. eg: (eventName) => {}
   */
  callback: (event: AuthChangeEvent, session: Session | null) => void
  /**
   * Call this to remove the listener.
   */
  unsubscribe: () => void
}

export interface Session {
  sessionKey?: string
  parentAccountId?: string
  accountId?: string
  userId?: string
  strategy?: SessionStrategies
  providerToken?: string | null
  accessToken: string
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
