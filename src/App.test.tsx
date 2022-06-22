import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Login', () => {

  test('given email, when empty, then show required error message', async () => {
    render(<App />);

    const email = screen.getByTestId('email');

    await userEvent.type(email, "anyValue");
    await userEvent.clear(email);

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).not.toBeNull();
  })

  test('given email, when has value, then hide required error message', async () => {
    render(<App />);

    const email = screen.getByTestId('email');

    await userEvent.type(email, "anyValue");

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).toBeNull();
  })

  test('given email, when field not changed, then hide required error message', async () => {
    render(<App />);

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).toBeNull();
  })

  test('given email, when invalid, then show invalid error message', async () => {
    render(<App />);

    const email = screen.getByTestId('email');

    await userEvent.type(email, "anyValue");

    const requiredError = screen.queryByTestId('email-invalid');
    expect(requiredError).not.toBeNull();
  })

  test('given email, when valid, then hide invalid error message', async () => {
    render(<App />);

    const email = screen.getByTestId('email');

    await userEvent.type(email, "valid@email.com");

    const requiredError = screen.queryByTestId('email-invalid');
    expect(requiredError).toBeNull();
  })

  test('given password, when empty, then show required error message', async () => {
    render(<App />);

    const password = screen.getByTestId('password');

    await userEvent.type(password, "anyValue");
    await userEvent.clear(password);

    const requiredError = screen.queryByTestId('password-required');
    expect(requiredError).not.toBeNull();
  })

  test('given password, when has value, then hide required error message', async () => {
    render(<App />);

    const password = screen.getByTestId('password');

    await userEvent.type(password, "anyValue");

    const requiredError = screen.queryByTestId('password-required');
    expect(requiredError).toBeNull();
  })

  test('given email, when empty, then disable recover password button', () => {
    render(<App />);

    const recoverPasswordButton = screen.getByTestId('recover-password-button');

    expect(recoverPasswordButton).toBeDisabled();
  })

  test('given email, when valid, then enable recover password button', () => {
    render(<App />);

    const email = screen.getByTestId('email');
    userEvent.type(email, "valid@email.com");

    const recoverPasswordButton = screen.getByTestId('recover-password-button');

    expect(recoverPasswordButton).not.toBeDisabled();
  })

  test('given form invalid, then disable login button', () => {
    render(<App />);

    const loginButton = screen.getByTestId('login-button');

    expect(loginButton).toBeDisabled();
  })

  test('given form valid, then enable login button', () => {
    render(<App />);

    const email = screen.getByTestId('email');
    userEvent.type(email, "valid@email.com");
    const password = screen.getByTestId('password');
    userEvent.type(password, "anyValue");

    const loginButton = screen.getByTestId('login-button');

    expect(loginButton).not.toBeDisabled();
  })

})