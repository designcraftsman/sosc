const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      error: 'Access token required',
      message: 'Please provide a valid authentication token' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ 
        error: 'Invalid or expired token',
        message: 'Please login again' 
      });
    }
    
    req.user = user;
    next();
  });
};

const authenticateAdmin = (req, res, next) => {
  authenticateToken(req, res, (err) => {
    if (err) return;
    
    if (req.user.role !== 'administrator') {
      return res.status(403).json({ 
        error: 'Administrator access required',
        message: 'You do not have permission to access this resource' 
      });
    }
    
    next();
  });
};

module.exports = {
  authenticateToken,
  authenticateAdmin
};