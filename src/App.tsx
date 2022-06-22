import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

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

  const isEmailValid = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  return (
    <main className='centralize'>
      <form>
        <input type="email" placeholder='Email' value={form.email.value}
          onChange={event => setForm({...form, email: {
            hasChanged: true, value: event.target.value
          }})}
          data-testid='email' />
        {
          form.email.hasChanged && !form.email.value
            && <div data-testid="email-required">Email é obrigatório</div>
        }
        {
          form.email.hasChanged && !isEmailValid(form.email.value)
            && <div data-testid="email-invalid">Email é inválido</div>
        }
        
        <input type="password" placeholder='Senha' value={form.password.value}
          onChange={event => setForm({...form, password: {
            hasChanged: true, value: event.target.value
          }})}
          data-testid="password"/>
        {
          form.password.hasChanged && !form.password.value
            && <div data-testid="password-required">Senha é obrigatória</div>
        }
        <button type="button" className='clear'>Recuperar senha</button>
        <button type="button" className='solid'>Entrar</button>
        <button type="button" className='outline'>Registrar</button>
      </form>
    </main>
  );
}

export default App;
