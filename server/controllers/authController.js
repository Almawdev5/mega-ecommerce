const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const setupAdmin = async (req, res) => {
  try {
    const adminExists = await Admin.findOne({});
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Mega@2024', salt);
    const admin = await Admin.create({
      username: 'megatech_admin',
      password: hashedPassword
    });
    res.status(201).json({
      message: 'Admin created successfully',
      username: admin.username
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginAdmin, setupAdmin };