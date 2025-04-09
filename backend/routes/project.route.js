import express from "express";
import {
    createProject,
    getAllProjects,
    getProjectById,
    likeProject,
    addComment,
    deleteProject,
} from "../controllers/project.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();


router.post("/create", protectRoute, createProject);
router.get("/all", getAllProjects);
router.get("/:projectId", protectRoute, getProjectById);
router.put("/like/:projectId", protectRoute, likeProject);
router.post("/comment/:projectId", protectRoute, addComment);
router.delete("/:projectId", protectRoute, deleteProject);

export default router;
