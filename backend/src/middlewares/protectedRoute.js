import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';

const propectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.['my-token'];
        if(!token){
            return res.status(401).json({success: false, message: "Unauthorized request"})
        }

        const { userId } = jwt.verify(token, process.env.JWT_SECRET)

        if(!userId){
            return res.status(401).json({success: false, message: "Invalid Access Token"})
        }

        const user = await User.findById(userId).select("-password");

        if(!user){
            res.status(404).json({success: false, message: "User not found"});
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in the protected route middleware: ", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export { propectedRoute }