
const express = require('express');
const {
  getUserProfile,
  updateProfile,
  updatePassword,
  getUserProjects,
  getUserBlogs,
  getUserQuestions
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/:id')
  .get(getUserProfile);

router.route('/profile')
  .put(protect, updateProfile);

router.route('/password')
  .put(protect, updatePassword);

router.route('/:id/projects')
  .get(getUserProjects);

router.route('/:id/blogs')
  .get(getUserBlogs);

router.route('/:id/questions')
  .get(getUserQuestions);

module.exports = router;
