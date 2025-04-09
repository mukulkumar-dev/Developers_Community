import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";


export const createProject = async (req, res) => {
    try {
        const { title, description, techStack, category, liveDemo, githubRepo } = req.body;
        let { images } = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!title || !description) {
            return res.status(400).json({ error: "Title and Description are required" });
        }

        let uploadedImages = [];
        if (images && images.length > 0) {
            for (const img of images) {
                const uploadedResponse = await cloudinary.uploader.upload(img);
                uploadedImages.push(uploadedResponse.secure_url);
            }
        }

        const newProject = new Project({
            title,
            description,
            techStack,
            category,
            liveDemo,
            githubRepo,
            images: uploadedImages,
            creator: userId,
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in createProject controller: ", error);
    }
};


export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "creator",
                select: "fullName profilePic",
            });

        if (!projects || projects.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error("Error in getAllProjects controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;
        console.log(req.params);
        const project = await Project.findById(projectId)
            .populate({
                path: "creator",
                select: "-password",
            })
            .populate({
                path: "comments.userId",
                select: "username email", // Fetch commenter details
            });

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error("Error in getProjectById controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const likeProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user._id.toString();

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        const likedIndex = project.likedBy.indexOf(userId);

        if (likedIndex === -1) {
            project.likedBy.push(userId);
            project.likes += 1;
            await project.save();
            return res.status(200).json({ message: "Project liked successfully", likes: project.likes });
        } else {
            project.likedBy.splice(likedIndex, 1);
            project.likes -= 1;
            await project.save();
            return res.status(200).json({ message: "Project unliked successfully", likes: project.likes });
        }
    } catch (error) {
        console.error("Error in likeProject controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const addComment = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;
        const username = req.user.username;

        if (!text) {
            return res.status(400).json({ error: "Comment text is required" });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        const newComment = { userId, username, text, createdAt: new Date() };
        project.comments.push(newComment);
        await project.save();

        res.status(201).json({ message: "Comment added successfully", comments: project.comments });
    } catch (error) {
        console.error("Error in addComment controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId).populate("creator");

        if (!project || !project.creator) {
            return res.status(404).json({ error: "Project not found or missing creator" });
        }

        if (project.creator._id.toString() !== req.user?._id.toString()) {
            return res.status(401).json({ error: "You are not authorized to delete this project" });
        }

        if (project.images && project.images.length > 0) {
            for (let imgUrl of project.images) {
                const imgId = imgUrl.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(imgId);
            }
        }

        await Project.findByIdAndDelete(projectId);
        res.status(200).json({ message: "Project deleted successfully" });

    } catch (error) {
        console.error("Error in deleteProject controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


