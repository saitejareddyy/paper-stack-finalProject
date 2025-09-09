import { Note } from "../models/notes.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addNotes = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res
                .status(400)
                .json({ success: false, message: "Title is required" });
        }

        const notesPdfPath = req.file.path;

        if (!notesPdfPath) {
            return res
                .status(400)
                .json({ success: false, message: "Notes file is required" });
        }

        const notesPdf = await uploadOnCloudinary(notesPdfPath);

        if (!notesPdf) {
            return res.status(400).json({
                success: false,
                message: "Error occurred while uploading notes to cloudinary",
            });
        }

        const newNote = await Note.create({
            title,
            notes: notesPdf.secure_url,
            uploadedBy: req.user._id,
        });

        res
            .status(200)
            .json({ success: true, note: newNote, message: "Notes added successfully" });
    } catch (error) {
        console.log("Error in the addNotes controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const removeNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const data = await Note.findById(id);

        if (!data) {
            return res
                .status(400)
                .json({ success: false, message: "Notes not found" });
        }

        if (!data.uploadedBy) {
            return res
                .status(400)
                .json({ success: false, message: "Uploader info missing" });
        }

        if (data.uploadedBy.toString() !== user._id.toString() && user.userType !== "admin") {
            return res
                .status(400)
                .json({ success: false, message: "only uploaded user can delete" });
        }

        await Note.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Notes deleted successfully" });
    } catch (error) {
        console.log("Error in the remove notes controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const deleteNotes = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ success: false, message: "Invalid notes" });
        }

        await Note.findByIdAndDelete(id);
        res
            .status(200)
            .json({ success: true, message: "Notes deleted successfully" });
    } catch (error) {
        console.log(
            "Error in the delete notes by admin controller: ",
            error.message
        );
        res.status(500).json({ success: false, message: "Internal servre error" });
    }
};

const getNotesData = async (req, res) => {
    try {
        const userId = req.user._id;
        const notesData = await Note.find()
            .populate("uploadedBy", "username email")
            .populate("comments.user", "username email");

        const notesWithIsLiked = notesData.map((note) => {
            const isLiked = userId
                ? note.likes.some((likeId) => likeId.toString() === userId.toString())
                : false;
            return {
                ...note.toObject(),
                isLiked,
            };
        });

        res.status(200).json({ success: true, notesData: notesWithIsLiked });
    } catch (error) {
        console.log("Error in the get notes data controller; ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const toggleLikeOnNote = async (req, res) => {
    try {
        const userId = req.user._id;

        const { id } = req.params;

        const note = await Note.findById(id);

        if (!note) {
            res.status(404).json({ success: false, message: "Notes not found" });
        }

        let alreadyLiked = note.likes.includes(userId);

        if (alreadyLiked) {
            note.likes = note.likes.filter(
                (likedId) => likedId.toString() !== userId.toString()
            );
        } else {
            note.likes.push(userId);
        }

        await note.save();

        res
            .status(200)
            .json({ success: true, message: alreadyLiked ? "Unliked" : "Liked" });
    } catch (error) {
        console.log(
            "Error in the toggle like on notes controller: ",
            error.message
        );
        res.status(500).json({ success: false, message: "internal server error" });
    }
};

const addComment = async (req, res) => {
    try {
        const { comment, id } = req.body;
        const userId = req.user._id;

        if (!comment) {
            res.status(401).json({ success: false, message: "invalid comment" });
        }

        if (!userId) {
            res.status(404).json({ success: false, message: "Invalid user" });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res
                .status(404)
                .json({ success: false, message: "Notes not found" });
        }

        // update comment
        note.comments.push({
            user: userId,
            text: comment,
        });

        await note.save();

        await note.populate("comments.user", "username email");

        res
            .status(200)
            .json({
                success: true,
                message: "Comment added successfully",
                comment: note.comments[note.comments.length - 1],
                comments: note.comments
            });
    } catch (error) {
        console.log("Error in the addComment controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal srver error" });
    }
};

const deleteComment = async (req, res) => {
    try {
        const userId = req.user._id;

        const { noteId, commentId } = req.body;

        if (!noteId || !commentId) {
            return res
                .status(401)
                .json({ success: false, message: "noteId and commentId is required" });
        }

        const note = await Note.findById(noteId);

        // find comment and remove the comment
        const comment = note.comments.id(commentId);
        if (!comment) {
            return res
                .status(404)
                .json({ success: false, message: "comment not found" });
        }

        if (comment.user._id.toString() !== userId.toString() && req.user.userType !== "admin") {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Not authorized to delete this comment",
                });
        }

        note.comments = note.comments.filter(
            (commnt) => commnt._id.toString() !== commentId.toString()
        );

        await note.save();

        res
            .status(200)
            .json({ success: true, comments: note.comments, message: "comment delete successfully" });
    } catch (error) {
        console.log("Error in the delete comment controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const getNoteComments = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findById(noteId).populate({
      path: "comments.user", 
      select: "username email", 
    });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({
      success: true,
      comments: note.comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export {
    addNotes,
    removeNotes,
    deleteNotes,
    getNotesData,
    toggleLikeOnNote,
    addComment,
    deleteComment,
    getNoteComments
};
