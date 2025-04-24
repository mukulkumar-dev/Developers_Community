
const express = require('express');
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  attendEvent
} = require('../controllers/eventController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(protect, createEvent)
  .get(getEvents);

router.route('/:id')
  .get(getEventById)
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

router.route('/:id/attend')
  .post(protect, attendEvent);

module.exports = router;
