import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import useStore from "./context/UseStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import SubjectDetails from "./pages/SubjectDetails";
import Header from './components/Header'
import DisplayNotes from "./pages/DisplayNotes";
import UploadNotes from "./pages/UploadNotes";

export const backendUrl = "https://paper-stack-finalproject-backend.onrender.com"

function App() {
	const { user, isCheckingAuth, setIsCheckingAuth, setUser } = useStore();

	const checkAuth = async () => {
		setIsCheckingAuth(true);
		try {
			const response = await axios.get(`${backendUrl}/api/v1/auth/authCheck`, {
				withCredentials: true,
			});
			if (response.data.success) {
				setUser(response.data.user);
			} else {
				setUser(null);
			}
		} catch (error) {
			console.log("Auth check failed:", error.message);
			setUser(null);
		} finally {
			setIsCheckingAuth(false);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	useEffect(() => {
		console.log("after reload user: ", user);
	}, [user]);

	if (isCheckingAuth) {
		return (
			<div className="h-screen">
				<div className="flex justify-center items-center bg-black h-full">
					<Loader className="animate-spin text-[#24CFA6] w-10 h-10" />
				</div>
			</div>
		);
	}

	return (
		<div>
			{ user && <Header /> }
			<Routes>
				<Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/subject/:id" element={ user ? <SubjectDetails /> : <Navigate to="/login" />} />
				<Route path="/notes" element={ user ? <DisplayNotes /> : <Navigate to="/login" />} />
				<Route path="/upload-notes" element={ user ? <UploadNotes /> : <Navigate to="/login" />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
