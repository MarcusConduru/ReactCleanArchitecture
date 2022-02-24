import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-erros";
import { UnexpectError } from "@/domain/errors/unexpect-erros";
import { AccountModel } from "@/domain/models/account-model";
import { AuthenticaionParams } from "@/domain/usecases/authenticaion";

export class RemoteAuthenticaion {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticaionParams, AccountModel>
  ) {}

  async auth (params: AuthenticaionParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      default: throw new UnexpectError()
    }
  }
}
