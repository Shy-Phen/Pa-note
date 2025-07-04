import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};
