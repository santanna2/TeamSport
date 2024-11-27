import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home token={token} /> : <div><Login setToken={setToken} /><Register /></div>} />
        <Route path="/profile" element={<Profile token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
