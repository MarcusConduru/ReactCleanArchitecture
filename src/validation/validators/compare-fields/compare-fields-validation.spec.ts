import { InvalidFieldError } from '../../errors';
import { CompareFieldValidation } from './compare-fields-validation';
import faker from 'faker';

const makeSut = (valueToCompare: string): CompareFieldValidation =>
  new CompareFieldValidation(faker.database.column(), valueToCompare);

describe('CompareFieldValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError());
  });
});
