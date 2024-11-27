import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState('');

  return (
    <div>
      <h1>Bienvenido al Sistema de Emparejamiento Deportivo</h1>
      {token ? <Home token={token} /> : <div><Login setToken={setToken} /><Register /></div>}
    </div>
  );
}

export default App;
