import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
}, { timestamps: true })

const notesSchema = new Schema({
    title: { type: String, required: true },
    notes: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [commentSchema]
}, { timestamps: true })

const Note = mongoose.model("Note", notesSchema);

export { Note }