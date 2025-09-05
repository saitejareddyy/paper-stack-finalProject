import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function SubjectCard({ id, branch, image, title, onClick, setSubjectsData }) {
    const [imgError, setImgError] = useState(false);

    const handleDeleteSubject = async () => {
        try {
            const response = await axios.delete(`/api/v1/subject/${id}`)
            if (response.data.success) {
                toast.success(response.data.message)
                setSubjectsData(prev => prev.filter(sub => sub._id !== id));
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="mb-5">
            <div
                className="w-[300px] h-[270px] rounded-lg bg-[#1e1e1e] cursor-pointer"
            >
                {!imgError ? (
                    <img
                        src={image}
                        alt={title}
                        onError={() => setImgError(true)}
                        className="w-full h-[60%] object-cover rounded-t-lg"
                        onClick={onClick}
                    />
                ) : (
                    <div className="flex h-[60%] w-full items-center justify-center bg-gray-700 rounded-t-lg">
                        <span className="text-sm text-gray-300">No image available</span>
                    </div>
                )}

                <div className="flex items-center justify-around">
                    <div>
                        <header className="pt-5 text-[aquamarine]">
                            <span className="text-white">Subject: </span>{title}
                        </header>
                        <p className=" text-white"> Branch:  <span className="text-[#27E0B3]">{branch}</span></p>
                    </div>
                    <button onClick={() => {
                        handleDeleteSubject();
                    }}>
                        <Trash2 className="text-red-500" />
                    </button>
                </div>
            </div>

            <button
                onClick={onClick}
                className="w-[300px] mt-3 cursor-pointer bg-[aquamarine] rounded px-2 py-1 border-none"
            >
                View details
            </button>
        </div>
    );
}

export default SubjectCard;
