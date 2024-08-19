const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const quizzRoutes = require('./routes/quizzRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost:27017/VGAMES';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch(err => console.error('Erreur de connexion à MongoDB :', err))

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/games', requireAuth, (req, res) => res.render('games'));
app.use(authRoutes);
app.use(userRoutes);
app.use(gameRoutes);
app.use(quizzRoutes);