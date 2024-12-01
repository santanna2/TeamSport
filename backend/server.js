const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Importar el paquete CORS
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Usar el middleware CORS
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json());

// Probar la conexión a la base de datos al iniciar
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connected to the database');
    release();
  }
});

// Endpoint para registrar un nuevo usuario
app.post('/register', async (req, res) => {
  const { nombre, apellido, nombre_usuario, correo_electronico, contrasena, nivel } = req.body;
  console.log('Datos recibidos para registro:', req.body); // Registrar los datos recibidos
  const hashedPassword = await bcrypt.hash(contrasena, 10); // Encriptar la contraseña
  console.log('Contraseña encriptada:', hashedPassword); // Registrar la contraseña encriptada
  try {
    const result = await pool.query(
      'INSERT INTO usuario (nombre, apellido, nombre_usuario, correo_electronico, contrasena, nivel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_usuario',
      [nombre, apellido, nombre_usuario, correo_electronico, hashedPassword, nivel]
    );
    console.log('Usuario registrado:', result.rows[0]); // Registrar el resultado de la inserción
    res.status(201).json({ userId: result.rows[0].id_usuario });
  } catch (err) {
    console.error('Error en el registro:', err); // Registrar el error detallado
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para iniciar sesión
app.post('/login', async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuario WHERE nombre_usuario = $1', [nombre_usuario]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(contrasena, user.contrasena); // Verificar la contraseña
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error en el inicio de sesión:', err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para obtener los datos del usuario autenticado
app.get('/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT nombre, apellido, nombre_usuario, correo_electronico, nivel FROM usuario WHERE id_usuario = $1', [req.user.userId]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para actualizar la información del usuario
app.put('/update', authenticateToken, async (req, res) => {
  const { nombre, apellido, contrasena } = req.body;
  const hashedPassword = await bcrypt.hash(contrasena, 10); // Encriptar la nueva contraseña
  try {
    const result = await pool.query(
      'UPDATE usuario SET nombre = $1, apellido = $2, contrasena = $3 WHERE id_usuario = $4 RETURNING id_usuario',
      [nombre, apellido, hashedPassword, req.user.userId]
    );
    res.json({ userId: result.rows[0].id_usuario });
  } catch (err) {
    console.error('Error en la actualización:', err); // Registrar el error detallado
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para eliminar la cuenta del usuario
app.delete('/delete', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM usuario WHERE id_usuario = $1', [req.user.userId]);
    res.status(204).send();
  } catch (err) {
    console.error('Error en la eliminación de cuenta:', err); // Registrar el error detallado
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para crear un nuevo grupo
app.post('/groups', authenticateToken, async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    // Establecer la configuración de la aplicación para el ID del usuario creador
    await pool.query(`SET app.current_user_id = '${req.user.userId}'`);

    const result = await pool.query(
      'INSERT INTO grupo (nombre, descripcion) VALUES ($1, $2) RETURNING id_grupo',
      [nombre, descripcion]
    );

    const groupId = result.rows[0].id_grupo;

    res.status(201).json({ groupId });
  } catch (err) {
    console.error('Error en la creación del grupo:', err); // Registrar el error detallado
    res.status(500).json({ error: err.message });
  }
});



// Middleware para autenticar el token JWT
function authenticateToken(req, res, next) {
  const token = req.header('Authorization').split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
