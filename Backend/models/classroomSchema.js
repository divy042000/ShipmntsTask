const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true, 
  },
  dueDate: {
    type: Date,
    required: true, 
  },
  submissions: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    status: { type: String, enum: ['submitted', 'pending'], default: 'pending' }
  }],
});



const taskSubmissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  submissionDate: Date,
  document: String 
});


const classroomSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true, 
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', 
    required: true, 
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', 
  }],
  tasks: [taskSchema] 
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
