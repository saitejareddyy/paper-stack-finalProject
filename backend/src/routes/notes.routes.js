import express from "express";
import {
    addComment,
    addNotes,
    deleteComment,
    deleteNotes,
    getNotesData,
    removeNotes,
    toggleLikeOnNote,
} from "../controllers/notes.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { propectedRoute } from "../middlewares/protectedRoute.js";

const notesRouter = express.Router();

notesRouter.post("/add", propectedRoute, upload.single("notesPdf"), addNotes);
notesRouter.delete("/:id", propectedRoute, removeNotes);
notesRouter.delete("/:id/delete", deleteNotes);
notesRouter.get("/getNotes", propectedRoute, getNotesData);
notesRouter.put("/:id/isliked", propectedRoute, toggleLikeOnNote);
notesRouter.put("/comment", propectedRoute, addComment);
notesRouter.post("/deleteComment", propectedRoute, deleteComment);

export { notesRouter };
