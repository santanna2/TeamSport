import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Register.css'; 

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nivel, setNivel] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (!nombre || !apellido || !nombreUsuario || !correoElectronico || !contrasena || !nivel) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      await axios.post('http://localhost:3001/register', {
        nombre,
        apellido,
        nombre_usuario: nombreUsuario,
        correo_electronico: correoElectronico,
        contrasena,
        nivel
      });
      alert('Registro exitoso');
      navigate('/'); // Redirige al login
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Registro fallido');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister} className="register-form">
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Apellido:
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </label>
        <label>
          Nombre de Usuario:
          <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
        </label>
        <label>
          Correo Electrónico:
          <input type="email" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
        </label>
        <label>
          Nivel:
          <input type="number" value={nivel} onChange={(e) => setNivel(e.target.value)} />
        </label>
        <button type="submit" className="submit-button">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
