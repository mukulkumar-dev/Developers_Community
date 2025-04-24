
const express = require('express');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  likeProject,
  commentOnProject,
  deleteComment
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(protect, createProject)
  .get(getProjects);

router.route('/:id')
  .get(getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

router.route('/:id/like')
  .post(protect, likeProject);

router.route('/:id/comments')
  .post(protect, commentOnProject);

router.route('/:id/comments/:commentId')
  .delete(protect, deleteComment);

module.exports = router;
