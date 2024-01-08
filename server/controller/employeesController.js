const Employee = require('../model/Employee');

const getEmployees = async (_, res) => {
  try {
    const result = await Employee.find({});
    if (!result) return res.status(200).json({ message: 'No content' });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' })
  }
}

const createEmployee = async (req, res) => {
  const { firstname, lastname } = req.body;
  if (!firstname || !lastname) return res.status(400).json({ message: 'Firstname and Lastname are required' });
  try {
    const result = await Employee.create({
      firstname,
      lastname
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updateEmployee = async (req, res) => {
  const { id, firstname, lastname } = req.body;
  if (!id) return res.status(402).json({ message: 'ID is required' });
  try {
    const employee = await Employee.findById(id).exec();
    if (!employee) return res.status(204).json({ message: 'Employee not found' });
    if (firstname && lastname) {
      employee.firstname = firstname;
      employee.lastname = lastname;
    }
    const result = await employee.save()
    res.json(result)
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

const deleteEmployee = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(402).json({ message: 'ID is required' });
  try {
    const result = await Employee.findByIdAndDelete(id);
    if (!result) res.status(204).json({ message: 'Employee not found' });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

const getEmployee = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(402).json({ message: 'Id is required' });
  try {
    const result = await Employee.findById(id).exec();
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500)
  }
}


module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
}