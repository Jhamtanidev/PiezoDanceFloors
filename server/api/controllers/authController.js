const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Validate user data before creating the user object (optional)
      // ...validation logic...
  
      const user = new User({ name, email, password });
      await user.save();
  
      const token = generateToken(user._id); // Use user ID for token generation
  
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  // Implement logout functionality, e.g., invalidating the JWT token
  res.json({ message: 'Logged out successfully' });
};

function generateToken(user) {
  return jwt.sign({ userId: user._id }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ", { expiresIn: '1h' });
}