const {Router} = require('express');
const quizzController = require('../controllers/quizzController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/all_quizz', requireAuth, quizzController.all_quizz_get);
router.post('/all_quizz', requireAuth, quizzController.all_quizz_post);

router.get('/create_quizz', requireAuth, quizzController.create_quizz_get);
router.post('/create_quizz', requireAuth, quizzController.create_quizz_post);

router.get('/delete_quizz', requireAuth, quizzController.delete_quizz_get);
router.post('/delete_quizz', requireAuth, quizzController.delete_quizz_post);

router.get('/edit_quizz', requireAuth, quizzController.edit_profile_get);
router.post('/edit_quizz', requireAuth, quizzController.edit_profile_post);

module.exports = router;
