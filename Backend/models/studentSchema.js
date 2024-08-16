const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true, 
    unique: true, 
  },
  classrooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom' 
  }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
