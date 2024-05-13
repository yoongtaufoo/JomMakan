// const jwt = require('jsonwebtoken');
// const User = require('./models/userModel');

// const authenticateToken = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];
  
//   if (!token) {
//     return res.status(401).json({ message: 'Authentication token is missing' });
//   }

//   try {
//     const decodedToken = jwt.verify(token, 'your_secret_key');
//     const user = await User.findById(decodedToken.user._id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     req.user = user; // Attach user object to the request for later use
//     next(); // Call next middleware
//   } catch (error) {
//     console.error('Error authenticating token:', error);
//     return res.status(403).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authenticateToken;
