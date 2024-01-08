import mongoose from 'mongoose';
const { Schema } = mongoose;

const employeeSchema = new Schema({
  firstname: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  }
})

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;