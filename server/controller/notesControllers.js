const asyncHandler = require('express-async-handler');
const Note = require('../models/Note');
const User = require('../models/User');

const getNotes = asyncHandler(async (_, res) => {
  const notes = await Note.find({}).lean();
  if (!notes || !notes.length) return res.status(400).json({ message: 'Notes not found' });
  const notesWithUser = await Promise.all(notes.map(async (note) => {
    const user = await User.findById(note.user).lean().exec()
    return { ...note, username: user.username }
  }))
  res.json(notesWithUser)
});

const createNote = asyncHandler(async (req, res) => {
  const { userId, title, text } = req.body;
  if (!userId || !title || !text) return res.status(400).json({ message: 'Fields are required' })

  const isUserExist = await User.findById(userId).lean().exec();
  if (!isUserExist) return res.status(400).json({ message: `User not found with this ID: ${userId}` });

  const isDuplicateTitle = await Note.findOne({ title }).lean().exec();
  if (isDuplicateTitle) return res.status(409).json({ message: 'Duplicate note title' })

  const result = await Note.create({
    user: userId,
    title,
    text
  })
  if (!result) return res.status(400).json({ message: 'Failed to create the note. Please check your data and try again.' })
  res.status(201).json(result)
});

const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;
  if (!id || !user || !title || !text || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'All fields are required!' })
  }

  const note = await Note.findById(id).exec();
  if (!note) return res.status(400).json({ message: 'Note not found!' });

  // check duplicate title
  const isDuplicateTitle = await Note.findOne({ title }).lean().exec();
  if (isDuplicateTitle) return res.status(409).json({ message: 'Duplicate note title!' });

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed

  const result = await note.save();
  res.json(result)
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Id is required" });

  const note = await Note.findById(id).exec();
  if (!note) return res.status(400).json({ message: 'Note not found' });

  const result = await note.deleteOne();
  res.json(result);
});

const getNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'id is required' });

  const note = await Note.findById(id).lean().exec();
  if (!note) return res.status(400).json({ message: 'Note not found' });
  res.json(note)
})

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getNote
}