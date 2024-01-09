const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getUsers = asyncHandler(async (_, res) => {
  const result = await User.find({}).select('-password').lean();
  if (!result?.length) return res.status(400).json({ message: 'No content' });
  res.json(result);
});

const createUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;
  if (!username || !password || !Array.isArray(roles) || !roles.length) return res.status(400).json({ message: 'fileds are required' });
  const existingUser = await User.findOne({ username }).lean().exec();
  if (existingUser) {
    return res.status(400).json({ message: 'username already exists' });
  }
  const hashedPwd = await bcrypt.hash(password, 10);
  const result = await User.create({
    username,
    password: hashedPwd,
    roles
  });
  res.status(201).json(result); // 201 created
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password, roles, active } = req.body;
  if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') return res.status(400).json({ message: 'fields are required' });
  const user = await User.findById(id).exec();
  if (!user) return res.status(400).json({ message: 'User not found' });
  //check for duplicate
  const existingUser = await User.findOne({ username }).lean().exec();
  if (existingUser && existingUser?._id.toString() !== id) {
    return res.status(409).json({ message: 'username already exists' }); // 409 duplicate username
  }
  user.username = username;
  user.roles = roles;
  user.active = active;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  const result = await user.save();
  res.json(result);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'ID is required' });
  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) {
    return res.status(400).json({ message: 'User has assigned roles' })
  }
  const user = await User.findById(id).exec();
  if (!user) res.status(400).json({ message: 'User not found' });
  const result = await user.deleteOne();
  res.json(result);
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'Id is required' });
  const result = await User.findById(id).exec();
  if (!result) return res.status(404).json({ message: 'User not found' });
  res.json(result);
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser
};
