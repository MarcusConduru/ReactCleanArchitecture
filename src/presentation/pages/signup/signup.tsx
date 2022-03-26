/* eslint-disable prettier/prettier */
import {
  Footer,
  LoginHeader,
  Input,
  FormStatus,
} from '@/presentation/components';
import Styles from './signup-styles.scss';
import Context from '@/presentation/contexts/form/form-context';
import React, { useEffect, useState } from 'react';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount, SaveAccessToken } from '@/domain/usecases';
import { Link, useHistory } from 'react-router-dom';
import SubmitButton from '@/presentation/components/submit-button/submit-button';


type Props = {
  validation: Validation;
  addAccount: AddAccount;
  saveAccessToken: SaveAccessToken;
};

const SignUp: React.FC<Props> = ({
  validation,
  addAccount,
  saveAccessToken,
}: Props) => {
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: '',
  });

  useEffect(() => {
    const nameError = validation.validate('name', state.name);
    const emailError = validation.validate('email', state.email);
    const passwordError = validation.validate('password', state.email);
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      state.email,
    );
    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid:
        !!emailError ||
        !!nameError ||
        !!passwordError ||
        !!passwordConfirmationError,
    });
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }

      setState((state) => ({ ...state, isLoading: true }));
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      });
      await saveAccessToken.save(account.accessToken);
      history.replace('/');
    } catch (error) {
      setState((state) => ({
        ...state,
        isLoading: false,
        mainError: error.message,
      }));
    }
  };

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          className={Styles.form}
          data-testid="form"
          onSubmit={handleSubmit}
        >
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />

          <button
            data-testid="submit"
            disabled={state.isFormInvalid}
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <SubmitButton text="Cadastrar" />
          <Link
            data-testid="login-link"
            replace
            to="/login"
            className={Styles.link}
          >
            Voltar Para Login
          </Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  );
};

export default SignUp;
