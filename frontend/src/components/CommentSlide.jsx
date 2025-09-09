import { Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import useStore from "../context/UseStore";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function CommentSlide({ isOpen, onClose, noteId }) {
    const { user } = useStore();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { id } = useParams()



    const handleDeleteComment = async (commentId) => {
        try {
            const response = await axios.post(`${backendUrl}/api/v1/notes/deleteComment`, { noteId, commentId }, { withCredentials: true })
            if (response.data.success) {
                toast.success(response.data.message)
                setComments(response.data.comments);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error while deleting comment: ", error.message);
            if (error.response?.status === 403) {
                toast.error("You are not allowed to delete this comment");
            } else {
                toast.error("Failed to delete comment");
            }
        }

    }

    useEffect(() => {
        if (isOpen && noteId) {
            axios
                .get(`${backendUrl}/api/v1/notes/${noteId}/comments`, { withCredentials: true })
                .then((res) => {
                    if (res.data.success) {
                        setComments(res.data.comments);
                    } else {
                        toast.error(res.data.message || "Failed to load comments");
                    }
                })
                .catch((err) => console.log("Error fetching comments:", err.message));
        }
    }, [isOpen, noteId, id]);

    const handleSend = async () => {
        if (!newComment.trim()) return;

        try {
            const res = await axios.put(
                `${backendUrl}/api/v1/notes/comment`,
                { comment: newComment, id: noteId },
                { withCredentials: true }
            );

            if (res.data.success) {
                setComments((prev) => [...prev, res.data.comment]);
                setNewComment("");
            } else {
                toast.error(res.data.message || "Could not post comment");
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 right-0 h-full w-96 bg-[#1E1E1E] shadow-lg z-50 flex flex-col"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h2 className="text-lg font-bold text-white">Comments</h2>
                        <X className="text-white cursor-pointer" onClick={onClose} />
                    </div>

                    {/* Comments list */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {comments.length === 0 && (
                            <p className="text-gray-400 text-sm">No comments yet</p>
                        )}
                        {comments.map((c) => (
                            <div
                                key={c._id}
                                className={`p-3 rounded-lg text-sm max-w-[75%] ${c.user?._id === user?._id
                                        ? "bg-gray-700 text-white ml-auto"
                                        : "bg-gray-700 text-white"
                                    }`}
                            >
                                <p className="font-semibold">{c.user?.username}</p>
                                <p className="text-[#24CFA6]">{c.text}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-gray-400">
                                        {new Date(c.createdAt).toLocaleString()}
                                    </span>
                                    <Trash2 onClick={() => handleDeleteComment(c._id)} className="text-red-500 cursor-pointer" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-gray-700 flex gap-2">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Type a comment..."
                            className="flex-1 rounded-lg px-3 py-2 bg-gray-800 text-white outline-none"
                        />
                        <button
                            onClick={handleSend}
                            className="px-4 py-2 bg-[#24CFA6] text-black rounded-lg font-medium"
                        >
                            Send
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default CommentSlide;
