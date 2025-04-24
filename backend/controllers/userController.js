
const User = require('../models/User');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Question = require('../models/Question');
const { uploadImage } = require('../utils/cloudinary');
const bcrypt = require('bcryptjs');

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Public
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get counts of user's projects, blogs, etc.
    const projectsCount = await Project.countDocuments({ createdBy: req.params.id });
    const blogsCount = await Blog.countDocuments({ createdBy: req.params.id });
    const questionsCount = await Question.countDocuments({ createdBy: req.params.id });
    
    res.json({
      success: true,
      user: {
        ...user._doc,
        projectsCount,
        blogsCount,
        questionsCount
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const { name, bio, skills, github, linkedin, website } = req.body;
    
    // Process avatar if provided
    let avatarUrl = user.avatar;
    if (req.body.avatar && req.body.avatar !== user.avatar) {
      avatarUrl = await uploadImage(req.body.avatar, 'avatars');
    }
    
    // Update user fields
    user.name = name || user.name;
    user.avatar = avatarUrl;
    user.bio = bio || '';
    user.skills = skills || [];
    user.github = github || '';
    user.linkedin = linkedin || '';
    user.website = website || '';
    
    const updatedUser = await user.save();
    
    res.json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
        skills: updatedUser.skills,
        github: updatedUser.github,
        linkedin: updatedUser.linkedin,
        website: updatedUser.website,
        role: updatedUser.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new password'
      });
    }
    
    const user = await User.findById(req.user._id);
    
    // Check if current password matches
    const isMatch = await user.matchPassword(currentPassword);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    // Check if new password is same as current
    const isSame = await bcrypt.compare(newPassword, user.password);
    
    if (isSame) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from current password'
      });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's projects
// @route   GET /api/users/:id/projects
// @access  Public
exports.getUserProjects = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const projects = await Project.find({ createdBy: req.params.id })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('createdBy', 'name avatar');
    
    // Get total count
    const total = await Project.countDocuments({ createdBy: req.params.id });
    
    res.json({
      success: true,
      count: projects.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's blogs
// @route   GET /api/users/:id/blogs
// @access  Public
exports.getUserBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const blogs = await Blog.find({ createdBy: req.params.id })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('createdBy', 'name avatar')
      .select('-content'); // Exclude content for listing
    
    // Get total count
    const total = await Blog.countDocuments({ createdBy: req.params.id });
    
    res.json({
      success: true,
      count: blogs.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      blogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's questions
// @route   GET /api/users/:id/questions
// @access  Public
exports.getUserQuestions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const questions = await Question.find({ createdBy: req.params.id })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('createdBy', 'name avatar');
    
    // Get total count
    const total = await Question.countDocuments({ createdBy: req.params.id });
    
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
