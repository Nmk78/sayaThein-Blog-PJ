const JWT = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const token = authorization.split(' ')[1];
    const verified = JWT.verify(token, process.env.JWT_secret);
    req.user = verified; // Attach user information to the request object if needed
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};

module.exports = verifyToken;