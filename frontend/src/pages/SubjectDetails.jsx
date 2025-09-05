import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../App";

function SubjectDetails() {
    const { id } = useParams();
    const [subjectData, setSubjectData] = useState(null);

    const getData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/subject/${id}/getSubject`, { withCredentials: true });
            if (response.data.success) {
                setSubjectData(response.data.subject);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    if (!subjectData) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#1E1E1E] text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto my-8 bg-[#1E1E1E] rounded-xl shadow-lg overflow-hidden text-white">
            {/* Main content container */}
            <div className="flex flex-col md:flex-row">
                {/* Left side - Image and details */}
                <div className="md:w-2/5 bg-[#2D2D2D] p-6">
                    <div className="h-64 mb-6 rounded-lg overflow-hidden">
                        <img
                            src={subjectData.image}
                            alt={subjectData.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-[#252525] rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold text-white mb-2">Subject Information</h2>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-[#E9E9E9] font-medium">Faculty</p>
                                    <p className="text-[#009560] font-semibold">{subjectData.faculty}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-[#E9E9E9] font-medium">Credits</p>
                                    <p className="text-[#009560] font-semibold">{subjectData.credits}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-[#E9E9E9] font-medium">Semester</p>
                                    <p className="text-[#009560] font-semibold">{subjectData.semister}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-[#E9E9E9] font-medium">Created At</p>
                                    <p className="text-[#009560] font-semibold">
                                        {new Date(subjectData.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Topics */}
                <div className="md:w-3/5 p-6">
                    <h1 className="text-2xl font-bold text-white mb-2">{subjectData.title}</h1>
                    <p className="text-[#009560] font-medium mb-6">{subjectData.branch}</p>

                    <div className="bg-[#252525] rounded-lg p-4 shadow-sm">
                        <h2 className="text-xl font-bold text-white mb-4 border-b border-[#353535] pb-2">Topics Covered</h2>
                        <div className="text-[#E9E9E9] whitespace-pre-line leading-relaxed">
                            {subjectData.topics}
                        </div>
                    </div>
                </div>
            </div>

            {/* PDF section at bottom */}
            {subjectData.previousYearPapersPdf && (
                <div className="border-t border-[#353535] p-6 bg-[#1E1E1E]">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-xl font-bold text-white">Previous Year Papers</h2>
                            <p className="text-sm text-[#E9E9E9] mt-1">Download the PDF document for your reference</p>
                        </div>
                        <a
                            href={subjectData.previousYearPapersPdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#009560] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#008050] transition-colors"
                        >
                            View / Download PDF
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SubjectDetails;