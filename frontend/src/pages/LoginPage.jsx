import { useState } from "react"
import useStore from "../context/UseStore"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { backendUrl } from "../App"

function LoginPage() {
	const [isLogin, setIsLogin] = useState(true)
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [userType, setUsertype] = useState("user")
	const [secretKey, setSecretKey] = useState("")

	const navigate = useNavigate()
	const { setUser } = useStore()

	const loginHandler = async (e) => {
		e.preventDefault()

		try {
			const endpoint = isLogin ? `${backendUrl}/api/v1/auth/login` : `${backendUrl}/api/v1/auth/register`
			const payload = isLogin ? { email, password } : { username, email, password, userType, secretKey }

			const { data } = await axios.post(endpoint, payload, { withCredentials: true })

			if (data.success) {
				setUser(data.user)
				navigate("/")
				toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			console.log(error.message)
			const message = error.response?.data?.message
			toast.error(message)
		}

		setUsername("")
		setEmail("")
		setPassword("")
		setSecretKey("")
	}

	return (
		<div className="h-screen w-screen bg-[#ECECEC] flex items-center justify-center px-20">
			{/* Left side text */}
			<div className="flex-1">
				<h1 className="text-9xl font-semibold text-black tracking-tight">
					✳︎ PAPER STACK
				</h1>
				<p className="mt-6 text-xl font-light font-[Courier] text-gray-700 max-w-md leading-relaxed">
					Collaborate, learn, and grow together.
				</p>
			</div>

			{/* Right side form */}
			<div className="flex-1 flex justify-center">
				<form
					onSubmit={loginHandler}
					className="bg-white p-10 rounded-xl shadow-xl w-[350px]"
				>
					<h2 className="text-2xl font-bold mb-6 text-center text-black">
						{isLogin ? "Login" : "Signup"}
					</h2>

					{!isLogin && (
						<div className="mb-4">
							<input
								id="name"
								type="text"
								placeholder="Name"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full px-3 py-2 border rounded-lg focus:outline-none placeholder:text-[12px] text-black"
							/>
						</div>
					)}
					<div className="mb-4">
						<input
							id="email"
							type="text"
							placeholder="jessypinkman@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 py-2 border rounded-lg focus:outline-none placeholder:text-[12px] text-black"
						/>
					</div>
					<div className="mb-4">
						<input
							id="password"
							type="password"
							placeholder="*******"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 border rounded-lg focus:outline-none placeholder:text-[12px] text-black"
						/>
					</div>
					{!isLogin && (
						<div className="mb-4 flex items-center justify-around">
							<label className="flex items-center space-x-2">
								<input
									type="radio"
									name="userType"
									value="user"
									checked={userType === "user"}
									onChange={(e) => setUsertype(e.target.value)}
									className="accent-black w-4 h-4 cursor-pointer"
								/>
								<span className="text-black text-sm">User</span>
							</label>

							<label className="flex items-center space-x-2">
								<input
									type="radio"
									name="userType"
									value="admin"
									checked={userType === "admin"}
									onChange={(e) => setUsertype(e.target.value)}
									className="accent-black w-4 h-4 cursor-pointer"
								/>
								<span className="text-black text-sm">Admin</span>
							</label>
						</div>
					)}

					{userType === "admin" && !isLogin && <div className="mb-4">
						<input
							id="password"
							type="password"
							value={secretKey}
							onChange={(e) => setSecretKey(e.target.value)}
							placeholder="secret key"
							className="w-full px-3 py-2 border rounded-lg focus:outline-none placeholder:text-[12px] text-black"
						/>
					</div>}
					<button
						type="submit"
						className="w-full bg-[#000000] text-white py-3 rounded-lg hover:bg-[#1e1e1e] transition cursor-pointer text-[14px] font-semibold"
					>
						{isLogin ? "Login" : "Signup"}
					</button>
					<p className="mt-4 text-center text-gray-600 text-[12px]">
						{!isLogin ? "Already have an account? " : "Create a new account "}
						<span
							onClick={() => setIsLogin((prev) => !prev)}
							className="text-[#000000] font-bold ml-2 cursor-pointer"
						>
							{isLogin ? "Signup" : "Login"}
						</span>
					</p>
				</form>
			</div>
		</div>
	)
}

export default LoginPage
