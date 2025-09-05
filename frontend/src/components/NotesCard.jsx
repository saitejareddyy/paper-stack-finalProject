import axios from "axios";
import { FileText, Heart, Trash2, User } from "lucide-react";
import useStore from "../context/UseStore";
import toast from "react-hot-toast";

function NotesCard({ id, title, notes, uploadedBy, createdAt, likes }) {
    const { setNotesData, user } = useStore();

    const handleLikes = async () => {
        try {
            const response = await axios.put(`/api/v1/notes/${id}/isliked`);
            console.log("like response: ", response.data);

            if (response.data.success) {
                // update notesData locally
                setNotesData((prevNotes) =>
                    prevNotes.map((note) =>
                        note._id === id
                            ? {
                                ...note,
                                likes: note.likes.includes(user._id)
                                    ? note.likes.filter((uid) => uid !== user._id) // remove like
                                    : [...note.likes, user._id], // add like
                            }
                            : note
                    )
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    const handleDeleteNotes = async () => {
        try {
            const response = await axios.delete(`/api/v1/notes/${id}`)
            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            // Axios errors contain the backend response inside error.response
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
            console.log(error.message);
        }
    }

    return (
        <div className="relative w-full max-w-sm bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="p-5 flex flex-col gap-3">

                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#24CFA6]" />
                        {title}
                    </h2>

                    <Trash2 onClick={handleDeleteNotes} className="text-red-500" />
                </div>


                <p className="text-sm text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#24CFA6]" />
                    Uploaded by{" "}
                    <span className="font-semibold text-[#24CFA6] ">
                        {uploadedBy?.username || "Unknown"}
                    </span>
                </p>


                <p className="text-xs text-[#E74C3C]">
                    {new Date(createdAt).toLocaleDateString()}
                </p>


                <div className="flex justify-between items-center mt-3">
                    <a
                        href={notes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#24CFA6] text-black rounded text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                        View Notes
                    </a>
                    <div className="flex items-center gap-1 text-gray-300">
                        <Heart
                            onClick={handleLikes}
                            className={`w-5 h-5 cursor-pointer ${likes?.includes(user?._id) ? "text-[#24CFA6] fill-[#24CFA6]" : "text-[#24CFA6]"
                                }`}
                        />
                        <span className="text-sm">{likes?.length || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotesCard;
