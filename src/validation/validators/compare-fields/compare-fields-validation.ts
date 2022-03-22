import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '../../protocols/field-validation';

export class CompareFieldValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string,
  ) {}

  validate(value: string): Error {
    return this.valueToCompare !== value ? new InvalidFieldError() : null;
  }
}
