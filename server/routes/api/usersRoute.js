const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser
} = require('../../controller/usersControllers')

router.route('/')
  .get(getUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser)

router.route('/:id')
  .get(getUser)


module.exports = router