import { useState } from 'react';
import { isEmailValid } from './../../helpers/EmailHelper';
import ValidationError from './../../components/validation-error/ValidationError';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import Loading from '../../components/loading/Loading';

type LoginPageProps = {
  authService: AuthService;
}

function LoginPage(props: LoginPageProps) {

  const [form, setForm] = useState({
    email: {
      hasChanged: false,
      value: ""
    },
    password: {
      hasChanged: false,
      value: ""
    }
  })
  const [error, setError] = useState(null as any);
  const [showLoading, setShowLoading] = useState(false);
  const [showRecoverPasswordMessage, setShowRecoverPasswordMessage] = useState(false);

  const login = () => {
    setError(null);
    setShowLoading(true);
    props.authService.login(
      form.email.value, form.password.value
    ).then(() => {
      setShowLoading(false);
      navigate('/home');
    }).catch(error => {
      setShowLoading(false);
      setError(error);
    });
  }

  const recoverPassword = () => {
    setError(null);
    setShowLoading(true);
    props.authService.recoverPassword(
      form.email.value
    ).then(() => {
      setShowRecoverPasswordMessage(true);
      setShowLoading(false);
    }).catch(error => {
      setError(error);
      setShowLoading(false);
    })
  }

  const navigate = useNavigate();
  const goToRegisterPage = () => {
    navigate('/register');
  }

  return (
    <main
      className='centralize'>
      <form>
        <input
          type="email"
          placeholder='Email'
          value={form.email.value}
          onChange={event => setForm({...form, email: {
            hasChanged: true, value: event.target.value
          }})}
          data-testid='email' />
        <ValidationError
          hasChanged={form.email.hasChanged}
          errorMessage='Email é obrigatório'
          testId='email-required'
          type='required'
          value={form.email.value}/>
        <ValidationError
          hasChanged={form.email.hasChanged}
          errorMessage='Email é inválido'
          testId='email-invalid'
          type='email'
          value={form.email.value}/>
        
        <input
          type="password"
          placeholder='Senha'
          value={form.password.value}
          onChange={event => setForm({...form, password: {
            hasChanged: true, value: event.target.value
          }})}
          data-testid="password"/>
        <ValidationError
          hasChanged={form.password.hasChanged}
          errorMessage='Senha é obrigatória'
          testId='password-required'
          type='required'
          value={form.password.value}/>

        {
          error &&
            <div
              className='error'
              data-testid="error">
              {error.message}
            </div>
        }

        <button
          type="button"
          className='clear'
          data-testid="recover-password-button"
          disabled={!isEmailValid(form.email.value)}
          onClick={recoverPassword}>
          Recuperar senha
        </button>
        <button
          type="button"
          className='solid'
          data-testid="login-button"
          disabled={!isEmailValid(form.email.value) || !form.password.value}
          onClick={login}>
          Entrar
        </button>
        <button
          type="button"
          className='outline'
          data-testid="register-button"
          onClick={goToRegisterPage}>
          Registrar
        </button>
      </form>
      { showLoading && <Loading /> }
      {
        showRecoverPasswordMessage &&
        <div data-testid="recover-password-success-message">
          Verifique sua caixa de email
        </div>
      }
    </main>
  );
}

export default LoginPage;