const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  roles: [{
    type: String,
    default: "Employee"
  }],
  active: {
    type: Boolean,
    default: true
  }
})
const User = mongoose.model('User', userSchema);
module.exports = User