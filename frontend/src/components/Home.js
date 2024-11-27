import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ token }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Bienvenido {userData.nombre} {userData.apellido}</h1>
      <p>Nombre de Usuario: {userData.nombre_usuario}</p>
      <p>Correo Electrónico: {userData.correo_electronico}</p>
      <p>Nivel: {userData.nivel}</p>
    </div>
  );
};

export default Home;
