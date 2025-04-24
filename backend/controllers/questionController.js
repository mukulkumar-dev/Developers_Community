
const Question = require('../models/Question');

// @desc    Create a new question
// @route   POST /api/questions
// @access  Private
exports.createQuestion = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    
    // Create question
    const question = await Question.create({
      title,
      content,
      tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
      createdBy: req.user._id
    });
    
    res.status(201).json({
      success: true,
      question
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all questions with filtering
// @route   GET /api/questions
// @access  Public
exports.getQuestions = async (req, res, next) => {
  try {
    let query = {};
    
    // Filter by search term
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Filter by tags
    if (req.query.tags) {
      const tags = req.query.tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tags };
    }
    
    // Filter by user
    if (req.query.user) {
      query.createdBy = req.query.user;
    }
    
    // Filter by answered/unanswered
    if (req.query.answered === 'true') {
      query['answers.isAccepted'] = true;
    } else if (req.query.answered === 'false') {
      query.$or = [
        { answers: { $size: 0 } },
        { 'answers.isAccepted': { $ne: true } }
      ];
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    let sortBy = { createdAt: -1 }; // Default sorting by newest
    
    // Sort options
    if (req.query.sort === 'views') {
      sortBy = { views: -1 }; // Sort by most viewed
    } else if (req.query.sort === 'upvotes') {
      sortBy = { 'upvotes.length': -1 }; // Sort by most upvoted
    } else if (req.query.sort === 'answers') {
      sortBy = { 'answers.length': -1 }; // Sort by most answered
    }
    
    const questions = await Question.find(query)
      .sort(sortBy)
      .skip(startIndex)
      .limit(limit)
      .populate('createdBy', 'name avatar')
      .populate({
        path: 'answers.createdBy',
        select: 'name avatar'
      })
      .select('-answers.content'); // Exclude answer content for listing
    
    // Get total count
    const total = await Question.countDocuments(query);
    
    res.json({
      success: true,
      count: questions.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      questions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single question by ID
// @route   GET /api/questions/:id
// @access  Public
exports.getQuestionById = async (req, res, next) => {
  try {
    // Increment view count
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('createdBy', 'name avatar bio')
      .populate({
        path: 'answers.createdBy',
        select: 'name avatar bio'
      })
      .populate({
        path: 'upvotes',
        select: 'name avatar'
      })
      .populate({
        path: 'answers.upvotes',
        select: 'name avatar'
      });
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    res.json({
      success: true,
      question
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private
exports.updateQuestion = async (req, res, next) => {
  try {
    let question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    // Check if user is the creator of the question
    if (question.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this question'
      });
    }
    
    const { title, content, tags } = req.body;
    
    // Update question
    question = await Question.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())
      },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      question
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private
exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    // Check if user is the creator of the question or an admin
    if (question.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this question'
      });
    }
    
    await question.deleteOne();
    
    res.json({
      success: true,
      message: 'Question removed'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upvote/Downvote a question
// @route   POST /api/questions/:id/upvote
// @access  Private
exports.upvoteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    // Check if question has already been upvoted by user
    const alreadyUpvoted = question.upvotes.some(
      (upvote) => upvote.toString() === req.user._id.toString()
    );
    
    if (alreadyUpvoted) {
      // Remove upvote
      question.upvotes = question.upvotes.filter(
        (upvote) => upvote.toString() !== req.user._id.toString()
      );
    } else {
      // Add upvote
      question.upvotes.push(req.user._id);
    }
    
    await question.save();
    
    res.json({
      success: true,
      upvotes: question.upvotes,
      upvotesCount: question.upvotes.length
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add an answer to a question
// @route   POST /api/questions/:id/answers
// @access  Private
exports.addAnswer = async (req, res, next) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Answer content is required'
      });
    }
    
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    // Add answer
    const answer = {
      content,
      createdBy: req.user._id,
      createdAt: Date.now(),
      upvotes: [],
      isAccepted: false
    };
    
    question.answers.push(answer);
    
    await question.save();
    
    // Fetch the updated question with populated answers
    const updatedQuestion = await Question.findById(req.params.id)
      .populate({
        path: 'answers.createdBy',
        select: 'name avatar'
      });
    
    res.json({
      success: true,
      answers: updatedQuestion.answers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an answer
// @route   PUT /api/questions/:id/answers/:answerId
// @access  Private
exports.updateAnswer = async (req, res, next) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Answer content is required'
      });
    }
    
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    // Find the answer
    const answer = question.answers.id(req.params.answerId);
    
    if (!answer) {
      return res.status(404).json({
        success: false,
        message: 'Answer not found'
      });
    }
    
    // Check if user is the creator of the answer
    if (answer.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this answer'
      });
    }
    
    // Update answer
    answer.content = content;
    
    await question.save();
    
    // Fetch the updated question with populated answers
    const updatedQuestion = await Question.findById(req.params.id)
      .populate({
        path: 'answers.createdBy',
        select: 'name avatar'
      });
    
    res.json({
      success: true,
      answer: updatedQuestion.answers.id(req.params.answerId)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an answer
// @route   DELETE /api/questions/:id/answers/:answerId
// @access  Private
exports.deleteAnswer = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    // Find the answer
    const answer = question.answers.id(req.params.answerId);
    
    if (!answer) {
      return res.status(404).json({
        success: false,
        message: 'Answer not found'
      });
    }
    
    // Check if user is the creator of the answer or an admin
    if (answer.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this answer'
      });
    }
    
    // Remove the answer
    question.answers.pull(req.params.answerId);
    
    await question.save();
    
    res.json({
      success: true,
      message: 'Answer removed'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Accept an answer
// @route   PUT /api/questions/:id/answers/:answerId/accept
// @access  Private
exports.acceptAnswer = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    // Check if user is the creator of the question
    if (question.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the question author can accept an answer'
      });
    }
    
    // Find the answer
    const answer = question.answers.id(req.params.answerId);
    
    if (!answer) {
      return res.status(404).json({
        success: false,
        message: 'Answer not found'
      });
    }
    
    // Clear any previously accepted answers
    question.answers.forEach(ans => {
      ans.isAccepted = false;
    });
    
    // Accept the current answer
    answer.isAccepted = true;
    
    await question.save();
    
    res.json({
      success: true,
      message: 'Answer accepted',
      answer
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upvote an answer
// @route   POST /api/questions/:id/answers/:answerId/upvote
// @access  Private
exports.upvoteAnswer = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    // Find the answer
    const answer = question.answers.id(req.params.answerId);
    
    if (!answer) {
      return res.status(404).json({
        success: false,
        message: 'Answer not found'
      });
    }
    
    // Check if answer has already been upvoted by user
    const alreadyUpvoted = answer.upvotes.some(
      (upvote) => upvote.toString() === req.user._id.toString()
    );
    
    if (alreadyUpvoted) {
      // Remove upvote
      answer.upvotes = answer.upvotes.filter(
        (upvote) => upvote.toString() !== req.user._id.toString()
      );
    } else {
      // Add upvote
      answer.upvotes.push(req.user._id);
    }
    
    await question.save();
    
    res.json({
      success: true,
      upvotes: answer.upvotes,
      upvotesCount: answer.upvotes.length
    });
  } catch (error) {
    next(error);
  }
};
