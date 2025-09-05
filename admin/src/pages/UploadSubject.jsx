import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function UploadSubject() {
  const [title, setTitle] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [image, setImage] = useState(null);
  const [topics, setTopics] = useState("");
  const [previousYearPapersPdf, setPreviousYearPapersPdf] = useState(null);
  const [semister, setSemister] = useState("");
  const [credits, setCredits] = useState("");
  const [faculty, setFaculty] = useState("");

  const navigate = useNavigate();

  const handleSubjectUpload = async () => {
    if (
      !title ||
      !branch ||
      !image ||
      !topics ||
      !previousYearPapersPdf ||
      !semister ||
      !credits ||
      !faculty
    ) {
      toast.error("All fields are required");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("title", title);
    uploadData.append("branch", branch);
    uploadData.append("coverImage", image);
    uploadData.append("topics", topics);
    uploadData.append("paperPdf", previousYearPapersPdf);
    uploadData.append("semister", semister);
    uploadData.append("credits", credits);
    uploadData.append("faculty", faculty);

    try {
      const response = await axios.post("/api/v1/subject/add", uploadData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/"); // redirect to homepage
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      {/* Heading */}
      <h1 className="pl-[10%] mt-30 mb-10 text-white text-6xl self-start first-letter:text-[150%] font-weight">
        Add a New Subject to <br />{" "}
        <span className="text-[#24CFA6] font-[Garamond]">the Library</span>
      </h1>

      {/* Card */}
      <div className="w-[650px] h-auto rounded-lg shadow-lg p-6 flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-white text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter subject title"
            className="border-2 border-[#24CFA6] outline-none px-3 py-2 rounded bg-transparent text-white placeholder-gray-400"
          />
        </div>

        {/* Faculty + Branch */}
        <div className="flex gap-4">
          {/* Faculty */}
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="faculty" className="text-white text-sm font-medium">
              Faculty Name
            </label>
            <input
              id="faculty"
              type="text"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              placeholder="Enter faculty name"
              className="border-2 border-[#24CFA6] outline-none px-3 py-2 rounded bg-transparent text-white placeholder-gray-400"
            />
          </div>

          {/* Branch */}
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="branch" className="text-white text-sm font-medium">
              Branch
            </label>
            <select
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="border-2 border-[#24CFA6] outline-none px-3 py-2 rounded bg-transparent text-white"
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-white text-sm font-medium">
            Upload Subject Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border-2 border-[#24CFA6] outline-none px-3 py-2 rounded bg-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#24CFA6] file:text-black file:font-medium hover:file:bg-[#1ed1a5]"
          />
        </div>

        {/* Topics */}
        <div className="flex flex-col gap-2">
          <label htmlFor="topics" className="text-white text-sm font-medium">
            Topics
          </label>
          <textarea
            id="topics"
            rows={4}
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="Enter subject topics"
            className="border-2 border-[#24CFA6] outline-none px-3 py-2 rounded bg-transparent text-white placeholder-gray-400"
          />
        </div>

        {/* Previous Year Papers PDF */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="previousYearPapersPdf"
            className="text-white text-sm font-medium"
          >
            Upload Previous Year Papers (PDF)
          </label>
          <input
            id="previousYearPapersPdf"
            type="file"
            accept="application/pdf"
            onChange={(e) => setPreviousYearPapersPdf(e.target.files[0])}
            className="border-2 border-[#24CFA6] outline-none px-3 py-2 rounded bg-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#24CFA6] file:text-black file:font-medium hover:file:bg-[#1ed1a5]"
          />
        </div>

        {/* Semister + Credits */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-1/2">
            <label
              htmlFor="semister"
              className="text-white text-sm font-medium"
            >
              Semister
            </label>
            <input
              id="semister"
              type="number"
              value={semister}
              onChange={(e) => setSemister(e.target.value)}
              placeholder="Enter semister"
              className="border-2 border-[#24CFA6] outline-none px-3 py-2 rounded bg-transparent text-white placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="credits" className="text-white text-sm font-medium">
              Credits
            </label>
            <input
              id="credits"
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="Enter subject credits"
              className="border-2 border-[#24CFA6] outline-none px-3 py-2 rounded bg-transparent text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSubjectUpload}
          className="mt-4 w-full bg-[#24CFA6] text-black font-semibold py-2 rounded hover:bg-[#1ed1a5] transition"
        >
          Upload Subject
        </button>
      </div>
    </div>
  );
}

export default UploadSubject;
