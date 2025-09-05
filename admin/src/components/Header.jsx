import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {

    return (
        <div className="flex items-center justify-between px-[5%] py-[15px] bg-transparent">
            <Link to="/" className="text-white text-3xl font-medium">Paper Stack</Link>
            <div className="flex items-center gap-5">
                <Link to="/upload/subject" className="text-white cursor-pointer font-bold" >Upload Subject</Link>
                <button>
                    <Search strokeWidth={2.5} className="w-5 cursor-pointer text-white" />
                </button>
                <button className="bg-[#27E0B3] px-4 py-1 rounded cursor-pointer font-medium">Admin</button>
            </div>
        </div>
    )
}

export default Header

