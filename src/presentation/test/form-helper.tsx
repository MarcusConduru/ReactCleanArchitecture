import { fireEvent, RenderResult } from '@testing-library/react';
import faker from 'faker';

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number,
) => {
  const el = sut.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisable = (
  sut: RenderResult,
  fieldName: string,
  isDisable: boolean,
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisable);
};

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
) => {
  const FieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(FieldStatus.title).toBe(validationError || 'Tudo certo!');
  expect(FieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word(),
) => {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, {
    target: { value },
  });
};
