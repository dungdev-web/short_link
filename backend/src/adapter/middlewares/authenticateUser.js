const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: user.userId,
      username: user.username,
      role: user.role || "creator",
    };

    next();

};

module.exports = authenticateUser;
