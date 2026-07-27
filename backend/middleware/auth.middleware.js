import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        // 1. Get token from cookie
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                message:
                    "Not authorized. Please login.",
            });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Find user
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                message:
                    "User no longer exists.",
            });
        }
        // 4. Attach user to request
        req.user = user;
        // 5. Go to next middleware/controller
        next();

    } catch (err) {
        // Token expired
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                message:
                    "Session expired. Please login again.",
            });
        }
        // Invalid token
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token. Please login.",
            });
        }

        return res.status(500).json({
            message: "Server error.",
            error: err.message,
        });
    }
};

export default protect;