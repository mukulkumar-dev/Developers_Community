import Discussion from "../models/discussion.model.js";
import User from "../models/user.model.js";


export const createDiscussion = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const userId = req.user._id.toString();

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const newDiscussion = new Discussion({
            title,
            description,
            tags,
            author: userId
        });

        await newDiscussion.save();
        res.status(201).json(newDiscussion);
    } catch (error) {
        console.error("Error in createDiscussion:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getAllDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find()
            .sort({ createdAt: -1 })
            .populate("author", "fullName profilePic");

        res.status(200).json(discussions);
    } catch (error) {
        console.error("Error in getAllDiscussions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const likeDiscussion = async (req, res) => {
    try {
        const { discussionId } = req.params;
        const userId = req.user._id.toString();

        const discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ error: "Discussion not found" });
        }

        const alreadyLiked = discussion.likes.includes(userId);

        if (alreadyLiked) {
            discussion.likes.pull(userId);
        } else {
            discussion.likes.push(userId);
        }

        await discussion.save();
        res.status(200).json({
            message: alreadyLiked ? "Unliked successfully" : "Liked successfully",
            totalLikes: discussion.likes.length
        });
    } catch (error) {
        console.error("Error in likeDiscussion:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addCommentToDiscussion = async (req, res) => {
    try {
        const { discussionId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ error: "Comment text is required" });
        }

        const discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ error: "Discussion not found" });
        }

        const newComment = {
            user: userId,
            text,
            createdAt: new Date()
        };

        discussion.comments.push(newComment);
        await discussion.save();


        res.status(201).json({
            message: "Comment added",
            comments: newComment
        });

    } catch (error) {
        console.error("Error in addCommentToDiscussion:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const deleteDiscussion = async (req, res) => {
    try {
        const { discussionId } = req.params;
        const userId = req.user._id.toString();

        const discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ error: "Discussion not found" });
        }

        if (discussion.author.toString() !== userId) {
            return res.status(403).json({ error: "You are not authorized to delete this discussion" });
        }

        await Discussion.findByIdAndDelete(discussionId);
        res.status(200).json({ message: "Discussion deleted successfully" });
    } catch (error) {
        console.error("Error in deleteDiscussion:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
