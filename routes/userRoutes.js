const {Router} = require('express');
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/edit_profile', requireAuth, userController.edit_profile_get);
router.post('/edit_profile', requireAuth, userController.edit_profile_post);

module.exports = router;
