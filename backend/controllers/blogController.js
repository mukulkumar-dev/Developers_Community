
const Blog = require('../models/Blog');
const { uploadImage } = require('../utils/cloudinary');

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private
exports.createBlog = async (req, res, next) => {
  try {
    const { title, content, excerpt, tags, readTime } = req.body;
    
    let coverImageUrl = '';
    
    // Upload cover image if provided
    if (req.body.coverImage) {
      coverImageUrl = await uploadImage(req.body.coverImage, 'blogs');
    }
    
    // Create blog
    const blog = await Blog.create({
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      coverImage: coverImageUrl,
      tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
      readTime: readTime || Math.ceil(content.split(' ').length / 200), // Estimate reading time
      createdBy: req.user._id
    });
    
    res.status(201).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all blogs with filtering
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res, next) => {
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
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('createdBy', 'name avatar')
      .select('-content'); // Exclude content for listing to reduce response size
    
    // Get total count
    const total = await Blog.countDocuments(query);
    
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

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('createdBy', 'name avatar bio')
      .populate({
        path: 'comments.user',
        select: 'name avatar'
      })
      .populate({
        path: 'likes',
        select: 'name avatar'
      });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Check if user is the creator of the blog
    if (blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this blog'
      });
    }
    
    const { title, content, excerpt, tags, readTime } = req.body;
    
    // Process cover image if provided
    let coverImageUrl = blog.coverImage;
    if (req.body.coverImage && req.body.coverImage !== blog.coverImage) {
      coverImageUrl = await uploadImage(req.body.coverImage, 'blogs');
    }
    
    // Update blog
    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + '...',
        coverImage: coverImageUrl,
        tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
        readTime: readTime || Math.ceil(content.split(' ').length / 200) // Estimate reading time
      },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Check if user is the creator of the blog or an admin
    if (blog.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog'
      });
    }
    
    await blog.deleteOne();
    
    res.json({
      success: true,
      message: 'Blog removed'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like/Unlike a blog
// @route   POST /api/blogs/:id/like
// @access  Private
exports.likeBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Check if blog has already been liked by user
    const alreadyLiked = blog.likes.some(
      (like) => like.toString() === req.user._id.toString()
    );
    
    if (alreadyLiked) {
      // Unlike the blog
      blog.likes = blog.likes.filter(
        (like) => like.toString() !== req.user._id.toString()
      );
    } else {
      // Like the blog
      blog.likes.push(req.user._id);
    }
    
    await blog.save();
    
    res.json({
      success: true,
      likes: blog.likes,
      likesCount: blog.likes.length
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Comment on a blog
// @route   POST /api/blogs/:id/comments
// @access  Private
exports.commentOnBlog = async (req, res, next) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Comment text is required'
      });
    }
    
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Add comment
    const comment = {
      user: req.user._id,
      text,
      createdAt: Date.now()
    };
    
    blog.comments.push(comment);
    
    await blog.save();
    
    // Fetch the updated blog with populated comments
    const updatedBlog = await Blog.findById(req.params.id)
      .populate({
        path: 'comments.user',
        select: 'name avatar'
      });
    
    res.json({
      success: true,
      comments: updatedBlog.comments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete comment on a blog
// @route   DELETE /api/blogs/:id/comments/:commentId
// @access  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Find the comment
    const comment = blog.comments.find(
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
    blog.comments = blog.comments.filter(
      (comment) => comment._id.toString() !== req.params.commentId
    );
    
    await blog.save();
    
    res.json({
      success: true,
      message: 'Comment removed',
      comments: blog.comments
    });
  } catch (error) {
    next(error);
  }
};
