import { AccountModel } from 'domain/models/account-model'

type AuthenticaionParams = {
  email: string
  password: string
}

export interface Authentication {
  auth (parans: AuthenticaionParams): Promise<AccountModel>
}
