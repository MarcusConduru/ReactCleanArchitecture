/* eslint-disable @typescript-eslint/no-inferrable-types */
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
  const button = sut.getByText(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisable);
};

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError: string = '',
) => {
  const Wrap = sut.getByTestId(`${fieldName}-wrap`);
  const field = sut.getByTestId(`${fieldName}`);
  const Label = sut.getByTestId(`${fieldName}-label`);

  expect(Wrap.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid',
  );
  expect(field.title).toBe(validationError);
  expect(Label.title).toBe(validationError);
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

export const testElementExists = (sut: RenderResult, fieldName: string) => {
  const el = sut.getByTestId(fieldName);
  expect(el).toBeTruthy();
};

export const testElementText = (sut: RenderResult, fieldName: string) => {
  const el = sut.getByText(fieldName) as unknown as HTMLElement;
  expect(el.textContent).toBe(fieldName);
};
