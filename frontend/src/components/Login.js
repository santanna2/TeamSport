import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

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
      alert('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Inicio de sesión fallido');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
        <TextField
          label="Nombre de Usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
