import { InvalidFieldError } from '../../errors';
import { CompareFieldValidation } from './compare-fields-validation';
import faker from 'faker';

const makeSut = (
  field: string,
  fieldToCompare: string,
): CompareFieldValidation => new CompareFieldValidation(field, fieldToCompare);

describe('CompareFieldValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word(),
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const valueToCompare = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: valueToCompare,
      [fieldToCompare]: valueToCompare,
    });
    expect(error).toBeFalsy();
  });
});
