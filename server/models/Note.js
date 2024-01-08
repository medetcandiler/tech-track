const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose)
const noteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'User' // refering back to User schema that we created.
    },
    title: {
      type: String,
      require: true
    },
    text: {
      type: String,
      require: true
    },
    completed: {
      type: Boolean,
      default: false 
    }
  },
  {
    timestamps: true
  }
)

noteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500
})

const Note = mongoose.model('Note', noteSchema);
module.exports = Note