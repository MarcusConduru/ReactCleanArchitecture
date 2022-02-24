import { AuthenticaionParams } from "@/domain/usecases/authenticaion";
import faker from "faker";
import { AccountModel } from "../models/account-model";

export const mockAuthentication = (): AuthenticaionParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})