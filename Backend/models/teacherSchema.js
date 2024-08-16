const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
