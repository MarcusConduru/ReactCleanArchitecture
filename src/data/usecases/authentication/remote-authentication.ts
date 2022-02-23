import { HttpPostClient } from "../../protocols/http/http-post-client";
import { AuthenticaionParams } from "../../../domain/usecases/authenticaion";

export class RemoteAuthenticaion {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticaionParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
