import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useStore from '../context/UseStore';

function UploadNotes() {
    const [title, setTile] = useState("");
    const [notesPdf, setNotePdf] = useState(null);

    const { setNotesData } = useStore()
    
    const navigate = useNavigate(); 

    const handleNotesUpload = async () => {

        if(!title || !notesPdf){
            toast.error("All fields are required")
        }

        const uploadData = new FormData();
        uploadData.append("title", title)
        if(notesPdf) uploadData.append("notesPdf", notesPdf)

        try {
            const response = await axios.post("/api/v1/notes/add", uploadData)
            if(response.data.success){
                setNotesData((prev) => [...prev, response.data.note]);
                toast.success(response.data.message)
                navigate("/notes")
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            {/* Heading aligned left */}
            <h1 className=" pl-[10%] mb-10 text-white text-6xl self-start first-letter:text-[150%] font-weight">
                Contribute Your Notes to <br /> <span className='text-[#24CFA6] font-[Garamond]'>the Community</span>
            </h1>

            {/* Card */}
            <div className="w-[500px] h-auto  rounded-lg shadow-lg p-6 flex flex-col gap-6">
                {/* Title input */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-white text-sm font-medium">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTile(e.target.value)}
                        className="border-2 border-[#24CFA6] outline-none px-3 py-2 rounded bg-transparent text-white placeholder-gray-400"
                        placeholder="Enter note title"
                    />
                </div>

                {/* File input */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="file" className="text-white text-sm font-medium">
                        Upload PDF file
                    </label>
                    <input
                        id="file"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setNotePdf(e.target.files[0])}
                        className="border-2 border-[#24CFA6] outline-none px-3 py-2 rounded bg-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#24CFA6] file:text-black file:font-medium hover:file:bg-[#1ed1a5]"
                    />
                </div>

                {/* Button */}
                <button onClick={handleNotesUpload} className="mt-4 w-full bg-[#24CFA6] text-black font-semibold py-2 rounded hover:bg-[#1ed1a5] transition">
                    Upload
                </button>
            </div>
        </div>
    )
}

export default UploadNotes
