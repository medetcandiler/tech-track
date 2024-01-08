const express = require('express');
const router = express.Router();
const { getEmployees } = require('../../controller/employeesController')

router.route('/')
  .get(getEmployees)


module.exports = router