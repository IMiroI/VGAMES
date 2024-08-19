const {Router} = require('express');
const gameController = require('../controllers/gameController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

//signup
router.get('/private_game', requireAuth, (req, res) => res.render('games/private_game'));

module.exports = router;
