import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateTokenAndSetCookie.js";

const register = async (req, res) => {

    try {
        const {username, email, password} = req.body;
    
        if(!username || !email || !password){
            return res.status(500).json({success: false, message: "All fields are required"})
        }
    
        const emailRegix = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if(!emailRegix.test(email)){
            return res.status(400).json({success: false, message: "Enter a proper email"})
        }

        if(password.length < 6){
            return res.status(400).json({success: false, message: "Password must be at least 6 characters"})
        }
    
        const existedUserByEmail = await User.findOne({email: email})
    
        if(existedUserByEmail){
            return res.status(400).json({success: false, message: "Email already exist"})
        }
    
        const existedUserByusername = await User.findOne({username: username})
    
        if(existedUserByusername){
            return res.status(400).json({success: true, message: "Username already exist"})
        }
    
        const newUser = await User.create({
            username,
            email,
            password
        })
    
        generateToken(newUser._id, res);
    
        res.status(200).json({success :true, user: {...newUser._doc, password: ""}, message: "User reistered successfully"})
    } catch (error) {
        console.log("Error in the register controller: ", error.message);
        res.status(500).json({success: false, message: "Internal server error"})
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({success: false, message: "All fields are required"})
        }

        const emailRegix = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if(!emailRegix.test(email)){
            return res.status(400).json({success: false, message: "Enter a proper email"})
        }

        if(password.length < 6){
            return res.status(400).json({success: false, message: "Password must be at least 6 characters"})
        }

        const user = await User.findOne({email: email})

        if(!user){
            return res.status(400).json({success: false, message: "User not registered"})
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);

        if(!isPasswordCorrect){
            return res.status(400).json({success: false, message: "Invalid password"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            success: true,
            user: {...user._doc, password: ""},
            message: "User logged In successfully"
        })

    } catch (error) {
        console.log("Error in the login register: ", error.message);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("my-token", {
            httpOnly: true,
            sameSite: "None",       
            secure: process.env.NODE_ENV !== "development" 
        })
        res.status(200).json({success: true, message: "User logged out successfully"})
    } catch (error) {
        console.log("Error in the logout controller");
        res.status(500).json({success: false, message: "Error while logout"})
    }
}

async function authCheck(req, res) {
    try {
        res.status(200).json({ success: true, user: req.user }); 
    } catch (error) {
        clg("Error in authCheck controller " + error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export {register, login, logout, authCheck}
