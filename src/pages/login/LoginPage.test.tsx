import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import AuthService from '../../services/AuthService';

describe('Login', () => {

  let authService: AuthServiceMock;

  beforeEach(() => {
    authService = new AuthServiceMock();
  })

  describe('given email', () => {

    test('when empty, then show required error message', () => {
      renderLoginPage();
  
      const email = screen.getByTestId('email');
  
      userEvent.type(email, "anyValue");
      userEvent.clear(email);
  
      const requiredError = screen.queryByTestId('email-required');
      expect(requiredError).not.toBeNull();
    })
  
    test('when has value, then hide required error message', () => {
      renderLoginPage();
  
      const email = screen.getByTestId('email');
  
      userEvent.type(email, "anyValue");
  
      const requiredError = screen.queryByTestId('email-required');
      expect(requiredError).toBeNull();
    })
  
    test('when field not changed, then hide required error message', () => {
      renderLoginPage();
  
      const requiredError = screen.queryByTestId('email-required');
      expect(requiredError).toBeNull();
    })
  
    test('when invalid, then show invalid error message', () => {
      renderLoginPage();
  
      const email = screen.getByTestId('email');
  
      userEvent.type(email, "anyValue");
  
      const requiredError = screen.queryByTestId('email-invalid');
      expect(requiredError).not.toBeNull();
    })
  
    test('when valid, then hide invalid error message', () => {
      renderLoginPage();
  
      const email = screen.getByTestId('email');
  
      userEvent.type(email, "valid@email.com");
  
      const requiredError = screen.queryByTestId('email-invalid');
      expect(requiredError).toBeNull();
    })

    test('when empty, then disable recover password button', () => {
      renderLoginPage();
  
      const recoverPasswordButton = screen.getByTestId('recover-password-button');
  
      expect(recoverPasswordButton).toBeDisabled();
    })
  
    test('when valid, then enable recover password button', () => {
      renderLoginPage();
  
      const email = screen.getByTestId('email');
      userEvent.type(email, "valid@email.com");
  
      const recoverPasswordButton = screen.getByTestId('recover-password-button');
  
      expect(recoverPasswordButton).not.toBeDisabled();
    })

  })

  describe('given password', () => {

    test('when empty, then show required error message', () => {
      renderLoginPage();
  
      const password = screen.getByTestId('password');
  
      userEvent.type(password, "anyValue");
      userEvent.clear(password);
  
      const requiredError = screen.queryByTestId('password-required');
      expect(requiredError).not.toBeNull();
    })
  
    test('when has value, then hide required error message', () => {
      renderLoginPage();
  
      const password = screen.getByTestId('password');
  
      userEvent.type(password, "anyValue");
  
      const requiredError = screen.queryByTestId('password-required');
      expect(requiredError).toBeNull();
    })

  })

  test('given form invalid, then disable login button', () => {
    renderLoginPage();

    const loginButton = screen.getByTestId('login-button');

    expect(loginButton).toBeDisabled();
  })

  test('given form valid, then enable login button', () => {
    renderLoginPage();

    fillFormWithValidValues();

    const loginButton = screen.getByTestId('login-button');

    expect(loginButton).not.toBeDisabled();
  })

  test('given user clicks on register button, then go to register page', () => {
    renderLoginPage();

    const registerButton = screen.getByTestId('register-button');
    userEvent.click(registerButton);

    expect(window.location.pathname).toEqual('/register');
  })

  describe('given user clicks on login button', () => {

    test('then call login', async () => {
      authService.response = Promise.resolve({} as any);

      renderPageAndTryToLogin();
  
      await waitFor(() => expect(authService.isLoggingIn).toBeTruthy());
    })
  
    test('when success, then go to home page', async () => {
      authService.response = Promise.resolve({} as any);

      renderPageAndTryToLogin();
  
      await waitFor(() => expect(window.location.pathname).toEqual('/home'));
    })
  
    test('when fail, then show error message', async () => {
      authService.response = Promise.reject({message: "error"});

      renderPageAndTryToLogin();
  
      expect(await screen.findByTestId('error')).not.toBeNull();
    })

    function renderPageAndTryToLogin() {
      renderLoginPage();
      fillFormWithValidValues();
      clickOnLoginButton();
    }

  })

  function fillFormWithValidValues() {
    const email = screen.getByTestId('email');
    userEvent.type(email, "valid@email.com");
    const password = screen.getByTestId('password');
    userEvent.type(password, "anyValue");
  }

  function clickOnLoginButton() {
    const loginButton = screen.getByTestId('login-button');
    userEvent.click(loginButton);
  }

  function renderLoginPage() {
    render(
      <BrowserRouter>
        <Routes location={'/'}>
          <Route path='/'
            element={
              <LoginPage
                authService={authService as AuthService} />
            } />
        </Routes>
      </BrowserRouter>
    );
  }

  class AuthServiceMock {
    isLoggingIn = false;
    response: any;
    login() {
      this.isLoggingIn = true;
      return this.response;
    }
  }

})