import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Importa el archivo CSS para estilos

const Profile = ({ token }) => {
  const [userData, setUserData] = useState({});
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        'http://localhost:3001/update',
        { nombre, apellido, contrasena },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Información actualizada con éxito');
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error en la actualización');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete('http://localhost:3001/delete', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Cuenta eliminada con éxito');
      navigate('/');
    } catch (error) {
      console.error('Error en la eliminación de cuenta:', error);
      alert('Error en la eliminación de cuenta');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="profile-container">
      <button className="back-button" onClick={handleBack}>Volver</button>
      <h2>Perfil de {userData.nombre_usuario}</h2>
      <img src="/profile.jpg" alt="Perfil" className="profile-pic-large" />
      <form onSubmit={handleUpdate}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </label>
        <label>
          Nueva Contraseña:
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </label>
        <button type="submit" className="btn update-btn">Actualizar Información</button>
      </form>
      <button className="btn delete-btn" onClick={handleDelete}>Eliminar Cuenta</button>
    </div>
  );
};

export default Profile;
