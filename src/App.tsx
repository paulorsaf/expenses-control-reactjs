import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <main className='centralize'>
      <form>
        <input type="email" placeholder='Email' />
        <input type="password" placeholder='Senha' />
        <button type="button" className='clear'>Recuperar senha</button>
        <button type="button" className='solid'>Entrar</button>
        <button type="button" className='outline'>Registrar</button>
      </form>
    </main>
  );
}

export default App;
