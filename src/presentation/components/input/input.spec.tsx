/* eslint-disable prettier/prettier */
import React from 'react';
import faker from 'faker';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { Input } from '@/presentation/components';
import { FormContext } from '@/presentation/contexts';

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </FormContext.Provider>,
  );
};

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column();
    const { getByTestId } = makeSut(field);
    const input = getByTestId(field) as HTMLInputElement;
    expect(input.readOnly).toBeTruthy();
  });

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column();
    const { getByTestId } = makeSut(field);
    const input = getByTestId(field) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBeFalsy();
  });

  test('Should focus input on label click', () => {
    const field = faker.database.column();
    const { getByTestId } = makeSut(field);
    const input = getByTestId(field);
    const label = getByTestId(`${field}-label`);
    fireEvent.click(label);
    expect(input.focus).toBeTruthy();
  });
});
