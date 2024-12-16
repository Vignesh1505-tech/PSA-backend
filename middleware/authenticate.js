const jwtPackage = require("jsonwebtoken");

const jwt = jwtPackage;

exports.auth_user = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader",authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Authorization header missing or malformed" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "No token found in the Authorization header" });
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN); // Replace "random string" with your actual secret
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Token verification error", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
