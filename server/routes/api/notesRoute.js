const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getNote
} = require('../../controller/notesControllers');

router.route('/')
  .get(getNotes)
  .post(createNote)
  .patch(updateNote)
  .delete(deleteNote)

router.route('/:id')
  .get(getNote)

module.exports = router