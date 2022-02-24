import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectError } from '@/domain/errors'
import { AuthenticaionParams, Authentication } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

export class RemoteAuthenticaion implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticaionParams, AccountModel>
  ) {}

  async auth (params: AuthenticaionParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      default: throw new UnexpectError()
    }
  }
}
