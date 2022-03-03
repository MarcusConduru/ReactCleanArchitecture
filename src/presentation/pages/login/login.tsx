import React, { useState } from 'React'
import Styles from './login-styles.scss'
// import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Footer from '@/presentation/components/footer/footer'
import FormStatus from '@/presentation/components/form-status/form-status'
import Input from '@/presentation/components/input/input'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Context from '@/presentation/contexts/form/form-context'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const login: React.FC = () => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder='Digite seu e-mail' />
          <Input type="password" name="password" placeholder='Digite sua senha' />
          <button className={Styles.submit} type='button'>Entrar</button>
          <span className={Styles.link}>Criar Conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default login
