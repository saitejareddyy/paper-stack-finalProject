import axios from "axios"
import toast from "react-hot-toast"
import useStore from "../context/UseStore"
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { backendUrl } from "../App";

function Header() {

    const { user, setUser } = useStore();

    const handleLgout = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/auth/logout`, {withCredentials: true})
            if (response.data.success) {
                setUser(null);
                toast.success(response.data.message);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error in the logout functionality: ", error.message);
        }
    }

    return (
        <div className="flex items-center justify-between px-[5%] py-[15px] bg-transparent">
            <Link to={"/"} className="text-white text-3xl font-medium">Paper Stack</Link>
            <div className="flex items-center gap-5">
                <Link to="/notes" className="text-[#27E0B3] cursor-pointer">Students Notes</Link>
                <Link to="/upload-notes" className="text-white cursor-pointer font-bold" >Upload Notes</Link>
                { user.userType === "admin" && <Link to="/upload-subject" className="text-white cursor-pointer font-bold" >Upload Subject</Link>}
                <button>
                    <Search strokeWidth={2.5} className="w-5 cursor-pointer text-white" />
                </button>

                <button className="bg-[#27E0B3] px-4 py-1 rounded cursor-pointer font-medium" onClick={handleLgout}>Logout</button>
            </div>
        </div>
    )
}

export default Header

