import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Importa el archivo CSS para estilos

const Home = ({ token }) => {
  const [userData, setUserData] = useState({});
  const [view, setView] = useState('progress'); // Controla la vista actual
  const [matches, setMatches] = useState([]);
  const [showQuickActions, setShowQuickActions] = useState(false); // Controla la visibilidad de los botones rápidos
  const [selectedSport, setSelectedSport] = useState(''); // Controla el deporte seleccionado
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
    setShowQuickActions(!showQuickActions); // Mostrar u ocultar los botones rápidos
    if (!showQuickActions) {
      try {
        const response = await axios.get('http://localhost:3001/matches', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMatches(response.data);
        setView('matches');
      } catch (error) {
        console.error('Error fetching matches', error);
      }
    } else {
      setView('progress');
    }
  };

  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const renderSportOptions = () => {
    switch (selectedSport) {
      case 'Fútbol':
        return (
          <div className="options">
            <h4>Posición</h4>
            <label><input type="checkbox" /> Portero</label>
            <label><input type="checkbox" /> Defensa</label>
            <label><input type="checkbox" /> Centrocampista</label>
            <label><input type="checkbox" /> Delantero</label>
          </div>
        );
      case 'Baloncesto':
        return (
          <div className="options">
            <h4>Posición</h4>
            <label><input type="checkbox" /> Base</label>
            <label><input type="checkbox" /> Escolta</label>
            <label><input type="checkbox" /> Alero</label>
            <label><input type="checkbox" /> Ala-Pívot</label>
            <label><input type="checkbox" /> Pívot</label>
          </div>
        );
      case 'Voleibol':
        return (
          <div className="options">
            <h4>Posición</h4>
            <label><input type="checkbox" /> Colocador</label>
            <label><input type="checkbox" /> Opuesto</label>
            <label><input type="checkbox" /> Central</label>
            <label><input type="checkbox" /> Receptor</label>
            <label><input type="checkbox" /> Líbero</label>
          </div>
        );
      default:
        return null;
    }
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
          {view === 'matches' ? (
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
            <div className="progress-card">
              <h3>Progreso Actual</h3>
              <p>Completado 16/59</p>
              {/* Añade más tarjetas de progreso aquí */}
            </div>
          )}
        </section>

        {/* Panel Derecho */}
        <aside className="sidebar right-sidebar">
          {showQuickActions && (
            <>
              <div className="quick-actions">
                <button onClick={() => setView('matches')}>Buscar Partido</button>
                <button onClick={() => setView('matches')}>Crear Partido</button>
                <button onClick={() => navigate('/create-group')}>Crear Grupo</button> {/* Enlace a crear grupo */}
              </div>
              {/* Opciones adicionales sobre el tipo de deporte y otras opciones */}
              <div className="options">
                <h4>Tipo de Deporte</h4>
                <button onClick={() => handleSportSelect('Fútbol')}>Fútbol</button>
                <button onClick={() => handleSportSelect('Baloncesto')}>Baloncesto</button>
                <button onClick={() => handleSportSelect('Voleibol')}>Voleibol</button>
                {renderSportOptions()}
              </div>
            </>
          )}
          {!showQuickActions && (
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
        <button className={`main-button ${showQuickActions ? 'cancel-button' : ''}`} onClick={handlePlayClick}>
          {showQuickActions ? 'CANCELAR' : 'JUGAR'}
        </button>
      </footer>
    </div>
  );
};

export default Home;
