
const Project = require('../models/Project');
const { uploadImage } = require('../utils/cloudinary');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res, next) => {
  try {
    const { title, description, techStack, tags, difficulty, githubLink, liveLink } = req.body;
    
    let imageUrl = '';
    
    // Upload image if provided
    if (req.body.image) {
      imageUrl = await uploadImage(req.body.image, 'projects');
    }
    
    // Create project
    const project = await Project.create({
      title,
      description,
      techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(tech => tech.trim()),
      tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
      difficulty,
      githubLink,
      liveLink,
      image: imageUrl,
      createdBy: req.user._id
    });
    
    res.status(201).json({
      success: true,
      project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all projects with filtering
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    let query = {};
    
    // Filter by search term
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Filter by tech stack
    if (req.query.techStack) {
      const techStacks = req.query.techStack.split(',').map(tech => tech.trim());
      query.techStack = { $in: techStacks };
    }
    
    // Filter by tags
    if (req.query.tags) {
      const tags = req.query.tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tags };
    }
    
    // Filter by difficulty
    if (req.query.difficulty) {
      query.difficulty = req.query.difficulty;
    }
    
    // Filter by user
    if (req.query.user) {
      query.createdBy = req.query.user;
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('createdBy', 'name avatar')
      .populate({
        path: 'comments.user',
        select: 'name avatar'
      });
    
    // Get total count
    const total = await Project.countDocuments(query);
    
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

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name avatar bio')
      .populate({
        path: 'comments.user',
        select: 'name avatar'
      })
      .populate({
        path: 'likes',
        select: 'name avatar'
      });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Check if user is the creator of the project
    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this project'
      });
    }
    
    const { title, description, techStack, tags, difficulty, githubLink, liveLink } = req.body;
    
    // Process image if provided
    let imageUrl = project.image;
    if (req.body.image && req.body.image !== project.image) {
      imageUrl = await uploadImage(req.body.image, 'projects');
    }
    
    // Update project
    project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(tech => tech.trim()),
        tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
        difficulty,
        githubLink,
        liveLink,
        image: imageUrl
      },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Check if user is the creator of the project or an admin
    if (project.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this project'
      });
    }
    
    await project.deleteOne();
    
    res.json({
      success: true,
      message: 'Project removed'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like/Unlike a project
// @route   POST /api/projects/:id/like
// @access  Private
exports.likeProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Check if project has already been liked by user
    const alreadyLiked = project.likes.some(
      (like) => like.toString() === req.user._id.toString()
    );
    
    if (alreadyLiked) {
      // Unlike the project
      project.likes = project.likes.filter(
        (like) => like.toString() !== req.user._id.toString()
      );
    } else {
      // Like the project
      project.likes.push(req.user._id);
    }
    
    await project.save();
    
    res.json({
      success: true,
      likes: project.likes,
      likesCount: project.likes.length
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Comment on a project
// @route   POST /api/projects/:id/comments
// @access  Private
exports.commentOnProject = async (req, res, next) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Comment text is required'
      });
    }
    
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Add comment
    const comment = {
      user: req.user._id,
      text,
      createdAt: Date.now()
    };
    
    project.comments.push(comment);
    
    await project.save();
    
    // Fetch the updated project with populated comments
    const updatedProject = await Project.findById(req.params.id)
      .populate({
        path: 'comments.user',
        select: 'name avatar'
      });
    
    res.json({
      success: true,
      comments: updatedProject.comments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete comment on a project
// @route   DELETE /api/projects/:id/comments/:commentId
// @access  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Find the comment
    const comment = project.comments.find(
      (comment) => comment._id.toString() === req.params.commentId
    );
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    // Check if user is the comment author or an admin
    if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }
    
    // Remove the comment
    project.comments = project.comments.filter(
      (comment) => comment._id.toString() !== req.params.commentId
    );
    
    await project.save();
    
    res.json({
      success: true,
      message: 'Comment removed',
      comments: project.comments
    });
  } catch (error) {
    next(error);
  }
};
