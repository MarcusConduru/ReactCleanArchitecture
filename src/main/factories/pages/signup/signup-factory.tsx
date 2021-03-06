import React from 'react';
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory';
import { makeSignUpValidation } from './signup-validation-factory';
import SignUp from '@/presentation/pages/signup/signup';
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory';

export const makeSinup: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
