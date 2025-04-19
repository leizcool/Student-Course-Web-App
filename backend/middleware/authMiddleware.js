const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    //console.log('No token provided authMiddleware');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    //console.log('Token verified authMiddleware:', decoded);
    next();
  } catch (error) {
    //console.log('Invalid token authMiddleware');
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;