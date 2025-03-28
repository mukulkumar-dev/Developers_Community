import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [String],
    category: {
        type: String,
        enum: ["Web", "JAVA", "AI", "Blockchain"],
        default: "Web",
        required: true,
    },
    liveDemo: { type: String },
    githubRepo: { type: String },
    images: [String],
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            username: String,
            text: String,
            createdAt: { type: Date, default: Date.now },
        },
    ],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
