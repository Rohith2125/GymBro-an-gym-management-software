const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies?.token;
  // console.log("Token received:", token);

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // { id, name, email, role, authType }
    next();
  } catch (error) {
    console.log('error at middleware')
    return res
      .status(401)
      .json({ message: "Unauthorized user", error: error.message });
  }
};

module.exports = protect;
