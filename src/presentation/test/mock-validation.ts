/* eslint-disable @typescript-eslint/no-unused-vars */
import { Validation } from '../protocols/validation'

export class ValidationStub implements Validation {
  errorMessage: string

  valdiate (fieldName: string, fieldValue: string): string {
    return this.errorMessage
  }
}
