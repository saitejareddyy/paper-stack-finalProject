import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ListFilter } from "lucide-react"
import SubjectCard from "./SubjectCard"
import axios from 'axios'

function HomePage() {
    const navigate = useNavigate()

    const [selectedBranch, setSelectedBranch] = useState("ALL")
    const [showFilter, setShowFilter] = useState(false)

    const [subjectsData, setSubjectsData] = useState([])

    const getSubjectsData = async () => {
        try {
            const response = await axios.get("/api/v1/subject/getSubjects")
            if(response.data.success){
                setSubjectsData(response.data.subjectsData)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
      getSubjectsData()
    }, [])

    const filteredSubjects =
        selectedBranch === "ALL"
            ? subjectsData
            : subjectsData.filter((sub) => sub.branch === selectedBranch)

    return (
        <div className="px-[5%]">
            <div className="mt-30">
                <div className="flex items-center justify-between relative">
                    <h1 className="text-7xl text-white font-sans">
                        THE <span className="text-[#27E0B3]"> RESOURCES </span> <br />
                        YOU ARE <span className="main-heading-font">WAITING FOR</span>
                    </h1>

                    {/* Filter Icon */}
                    <div className="relative">
                        <button onClick={() => setShowFilter((prev) => !prev)}>
                            <ListFilter className="text-white size-10 cursor-pointer" />
                        </button>

                        {/* Dropdown Menu */}
                        {showFilter && (
                            <div className="absolute right-0 mt-2 w-40 bg-[#1e1e1e] border border-[#27E0B3] rounded-lg shadow-lg z-10">
                                {["ALL", "CSE", "ECE", "EEE", "MECH", "CIVIL"].map((branch) => (
                                    <button
                                        key={branch}
                                        onClick={() => {
                                            setSelectedBranch(branch)
                                            setShowFilter(false) // close dropdown after selecting
                                        }}
                                        className={`block w-full text-left px-4 py-2 rounded-md text-sm transition ${selectedBranch === branch
                                                ? "bg-[#27E0B3] text-black"
                                                : "text-white hover:bg-[#333]"
                                            }`}
                                    >
                                        {branch}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-[#27E0B3] mt-20 font-extralight text-2xl font-[Georgia]">
                    Subjects
                </p>

                <div className="mt-10 flex gap-10 flex-wrap">
                    {filteredSubjects.map((eachSub) => (
                        <SubjectCard
                            key={eachSub._id}
                            id={eachSub._id}
                            branch={eachSub.branch}
                            image={eachSub.image}
                            title={eachSub.title}
                            onClick={() => navigate(`subject/${eachSub._id}`)}
                            setSubjectsData={setSubjectsData} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage
