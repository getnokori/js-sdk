export interface IUser {
  userId?: string
  accountId?: string
  firstName?: string
  lastName?: string
  email: string
  hasPassword?: boolean
  verified?: boolean
  createdAt?: string
  updatedAt?: string
  lastLoggedInAt?: string
}

export interface IUserDTO extends IUser {
  autoVerify?: boolean
}

export default IUserDTO
