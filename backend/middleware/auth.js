const jwt = require('jsonwebtoken')
const express= require('express')


const protect = (req, res, next) => {
  
  const token = req.cookies?.token; // prevent crash
  console.log("Token received:", token);

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decoded)
      req.user = decoded;
      next();
  } catch (error) {
      return res.status(401).json({ 
          message: "Unauthorized user", 
          error: error.message 
      });
  }
};


module.exports= protect

