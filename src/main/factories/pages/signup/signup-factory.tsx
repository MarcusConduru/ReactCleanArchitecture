/* eslint-disable prettier/prettier */
import React from 'react';
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory';
import { makeSignUpValidation } from './signup-validation-factory';
import SignUp from '@/presentation/pages/signup/signup';
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory';

export const makeSinup: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
};
