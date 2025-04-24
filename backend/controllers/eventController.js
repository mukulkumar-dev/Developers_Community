
const Event = require('../models/Event');
const { uploadImage } = require('../utils/cloudinary');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, eventType, startDate, endDate, location, meetingLink, tags } = req.body;
    
    let coverImageUrl = '';
    
    // Upload cover image if provided
    if (req.body.coverImage) {
      coverImageUrl = await uploadImage(req.body.coverImage, 'events');
    }
    
    // Create event
    const event = await Event.create({
      title,
      description,
      eventType,
      startDate,
      endDate,
      location,
      meetingLink,
      coverImage: coverImageUrl,
      tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
      organizer: req.user._id
    });
    
    res.status(201).json({
      success: true,
      event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all events with filtering
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res, next) => {
  try {
    let query = {};
    
    // Filter by search term
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Filter by event type
    if (req.query.eventType) {
      query.eventType = req.query.eventType;
    }
    
    // Filter by tags
    if (req.query.tags) {
      const tags = req.query.tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tags };
    }
    
    // Filter by organizer
    if (req.query.organizer) {
      query.organizer = req.query.organizer;
    }
    
    // Filter by date range
    if (req.query.startDate) {
      query.startDate = { $gte: new Date(req.query.startDate) };
    }
    
    if (req.query.endDate) {
      query.endDate = { $lte: new Date(req.query.endDate) };
    }
    
    // Filter upcoming events
    if (req.query.upcoming === 'true') {
      query.startDate = { $gte: new Date() };
    }
    
    // Filter past events
    if (req.query.past === 'true') {
      query.endDate = { $lt: new Date() };
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Default sort by upcoming events first
    let sortBy = { startDate: 1 };
    
    // Sort options
    if (req.query.sort === 'newest') {
      sortBy = { createdAt: -1 };
    }
    
    const events = await Event.find(query)
      .sort(sortBy)
      .skip(startIndex)
      .limit(limit)
      .populate('organizer', 'name avatar');
    
    // Get total count
    const total = await Event.countDocuments(query);
    
    res.json({
      success: true,
      count: events.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      events
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name avatar bio')
      .populate({
        path: 'attendees',
        select: 'name avatar'
      });
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
exports.updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if user is the organizer of the event
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event'
      });
    }
    
    const { title, description, eventType, startDate, endDate, location, meetingLink, tags } = req.body;
    
    // Process cover image if provided
    let coverImageUrl = event.coverImage;
    if (req.body.coverImage && req.body.coverImage !== event.coverImage) {
      coverImageUrl = await uploadImage(req.body.coverImage, 'events');
    }
    
    // Update event
    event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        eventType,
        startDate,
        endDate,
        location,
        meetingLink,
        coverImage: coverImageUrl,
        tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())
      },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if user is the organizer of the event or an admin
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this event'
      });
    }
    
    await event.deleteOne();
    
    res.json({
      success: true,
      message: 'Event removed'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Join/Leave an event
// @route   POST /api/events/:id/attend
// @access  Private
exports.attendEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if user is already attending
    const alreadyAttending = event.attendees.some(
      (attendee) => attendee.toString() === req.user._id.toString()
    );
    
    if (alreadyAttending) {
      // Remove user from attendees
      event.attendees = event.attendees.filter(
        (attendee) => attendee.toString() !== req.user._id.toString()
      );
    } else {
      // Add user to attendees
      event.attendees.push(req.user._id);
    }
    
    await event.save();
    
    res.json({
      success: true,
      attending: !alreadyAttending,
      attendees: event.attendees,
      attendeesCount: event.attendees.length
    });
  } catch (error) {
    next(error);
  }
};
