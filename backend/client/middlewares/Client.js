import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token is not valid", token: token });
  }
};

export default authMiddleware;
