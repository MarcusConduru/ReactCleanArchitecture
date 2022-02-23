import { AuthenticaionParams } from "domain/usecases/authenticaion";
import faker from "faker";

export const mockAuthentication = (): AuthenticaionParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})