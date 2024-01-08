const express = require('express');
const router = express.Router();
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
} = require('../../controller/employeesController')

router.route('/')
  .get(getEmployees)
  .post(createEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee)

router.route('/:id')
  .get(getEmployee)


module.exports = router