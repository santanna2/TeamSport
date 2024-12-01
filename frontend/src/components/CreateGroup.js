import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const CreateGroup = ({ token }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/groups',
        { nombre, descripcion },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      alert('Grupo creado con éxito');
      console.log(response.data.groupId);
    } catch (error) {
      console.error('Error en la creación del grupo:', error);
      alert('Error en la creación del grupo');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Crear Grupo
      </Typography>
      <Box component="form" onSubmit={handleCreateGroup} sx={{ mt: 3 }}>
        <TextField
          label="Nombre del Grupo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Crear Grupo
        </Button>
      </Box>
    </Container>
  );
};

export default CreateGroup;
