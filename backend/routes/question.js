
const express = require('express');
const {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  upvoteQuestion,
  addAnswer,
  updateAnswer,
  deleteAnswer,
  acceptAnswer,
  upvoteAnswer
} = require('../controllers/questionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(protect, createQuestion)
  .get(getQuestions);

router.route('/:id')
  .get(getQuestionById)
  .put(protect, updateQuestion)
  .delete(protect, deleteQuestion);

router.route('/:id/upvote')
  .post(protect, upvoteQuestion);

router.route('/:id/answers')
  .post(protect, addAnswer);

router.route('/:id/answers/:answerId')
  .put(protect, updateAnswer)
  .delete(protect, deleteAnswer);

router.route('/:id/answers/:answerId/accept')
  .put(protect, acceptAnswer);

router.route('/:id/answers/:answerId/upvote')
  .post(protect, upvoteAnswer);

module.exports = router;
