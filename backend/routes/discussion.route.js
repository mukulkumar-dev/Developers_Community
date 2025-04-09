import express from "express";
import {
    createDiscussion,
    getAllDiscussions,
    likeDiscussion,
    addCommentToDiscussion,
    deleteDiscussion,
} from "../controllers/discussion.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createDiscussion);
router.get("/all", protectRoute, getAllDiscussions);
router.put("/like/:discussionId", protectRoute, likeDiscussion);
router.post("/comment/:discussionId", protectRoute, addCommentToDiscussion);
router.delete("/:discussionId", protectRoute, deleteDiscussion);

export default router;
