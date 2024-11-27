import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        nombre_usuario: nombreUsuario,
        contrasena
      });
      setToken(response.data.token);
      alert('Login exitoso');
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);  // Registrar el error detallado
      alert('Inicio de sesión fallido');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Nombre de Usuario:
        <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
      </label>
      <label>
        Contraseña:
        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
      </label>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
