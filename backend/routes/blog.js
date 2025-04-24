
const express = require('express');
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  commentOnBlog,
  deleteComment
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(protect, createBlog)
  .get(getBlogs);

router.route('/:id')
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

router.route('/:id/like')
  .post(protect, likeBlog);

router.route('/:id/comments')
  .post(protect, commentOnBlog);

router.route('/:id/comments/:commentId')
  .delete(protect, deleteComment);

module.exports = router;
