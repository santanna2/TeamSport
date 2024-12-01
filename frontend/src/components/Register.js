import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nivel, setNivel] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!nivel) {
      alert('Por favor ingrese un nivel válido.');
      return;
    }

    try {
      console.log('Enviando datos:', {
        nombre,
        apellido,
        nombre_usuario: nombreUsuario,
        correo_electronico: correoElectronico,
        contrasena,
        nivel: parseInt(nivel)
      });
      const response = await axios.post('http://localhost:3001/register', {
        nombre,
        apellido,
        nombre_usuario: nombreUsuario,
        correo_electronico: correoElectronico,
        contrasena,
        nivel: parseInt(nivel)
      });
      alert('Registro exitoso');
      console.log(response.data.userId);
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Registro fallido');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Registro
      </Typography>
      <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nombre de Usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Correo Electrónico"
          type="email"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
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
        <TextField
          label="Nivel"
          type="number"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Registrarse
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
