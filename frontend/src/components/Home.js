import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Home.css'; // Importa el archivo CSS para estilos

const Home = ({ token }) => {
  const [userData, setUserData] = useState({});
  const [showMatches, setShowMatches] = useState(false);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate(); // Usar hook useNavigate para la navegación

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

  const handlePlayClick = async () => {
    setShowMatches(!showMatches);

    if (!showMatches) {
      try {
        const response = await axios.get('http://localhost:3001/matches', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches', error);
      }
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="home-container">
      {/* Encabezado */}
      <header className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <nav className="nav-bar">
          <a href="#inicio">Inicio</a>
          <a href="#jugadores">Jugadores</a>
          <a href="#tienda">Tienda</a>
          <a href="#estadisticas">Estadísticas</a>
        </nav>
      </header>

      <div className="main-content">
        {/* Panel Izquierdo */}
        <aside className="sidebar left-sidebar">
          <img src="/profile.jpg" alt="Perfil" className="profile-pic" onClick={handleProfileClick} />
          <h3 onClick={handleProfileClick}>{userData.nombre_usuario}</h3>
          <p>Nivel: {userData.nivel}</p>
          <p>Rango: {userData.rango}</p>
          <button className="btn">Agregar Amigo</button>
          <h4>Amigos Conectados</h4>
          <ul className="friends-list">
            <li>
              <span>Marline</span>
              <span>Nivel 10</span>
            </li>
            {/* Añade más amigos aquí */}
          </ul>
          <input type="text" placeholder="Buscar jugadores..." />
        </aside>

        {/* Sección Central */}
        <section className="central-section">
          <div className="progress-card">
            <h3>Progreso Actual</h3>
            <p>Completado 16/59</p>
            {/* Añade más tarjetas de progreso aquí */}
          </div>
        </section>

        {/* Panel Derecho */}
        <aside className="sidebar right-sidebar">
          {showMatches ? (
            <div className="matches-list">
              <h3>Partidos Disponibles</h3>
              {matches.map(match => (
                <div key={match.id} className="match-card">
                  <h4>{match.title}</h4>
                  <p>{match.date}</p>
                  <p>Jugadores: {match.players_joined}/{match.players_needed}</p>
                  <button>Unirse al partido</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="promotions">
              <h3>Promociones</h3>
              <div className="promo-card">
                <h4>Paquete Premium</h4>
                <button>Obtener paquete</button>
              </div>
              <div className="promo-card">
                <h4>Nuevas Características</h4>
                <button>Ver tienda</button>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Barra Inferior */}
      <footer className="footer">
        <button className="main-button" onClick={handlePlayClick}>JUGAR</button>
        <div className="quick-actions">
          <button>Buscar Partido</button>
          <button>Crear Partido</button>
          <button>Crear Grupo</button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
