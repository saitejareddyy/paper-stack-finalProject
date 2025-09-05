import React, { useState } from "react";

function SubjectCard({ branch, image, title, onClick }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="mb-5">
            {/* Card */}
            <div
                onClick={onClick}
                className="w-[300px] h-[270px] rounded-lg bg-[#1e1e1e] cursor-pointer"
            >
                {/* Image */}
                {!imgError ? (
                    <img
                        src={image}
                        alt={title}
                        onError={() => setImgError(true)}
                        className="w-full h-[60%] object-cover rounded-t-lg"
                    />
                ) : (
                    <div className="flex h-[60%] w-full items-center justify-center bg-gray-700 rounded-t-lg">
                        <span className="text-sm text-gray-300">No image available</span>
                    </div>
                )}

                {/* Text */}
                <header className="pt-5 pl-5 text-[aquamarine]">
                    <span className="text-white">Subject: </span>{title}
                </header>
                <p className="pl-5 text-white"> Branch:  <span className="text-[#27E0B3]">{branch}</span></p>
            </div>

            {/* Button */}
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
