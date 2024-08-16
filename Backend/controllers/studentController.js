const TeacherSchema = require('../models/teacherSchema.js'); 
const ClassroomSchema = require('../models/classroomSchema.js'); 
const StudentSchema = require('../models/studentSchema.js');
const TaskSchema = require('../models/classroomSchema.js');



// Example student data

// Example student data
const studentData = {
  name: 'Alice Johnson',
  email: 'alicejohnson@example.com',
  classrooms: [] // Or populate with classroom ObjectIds if available
};

async function saveStudent(studentData) {
  try {
    const newStudent = new StudentSchema(studentData);
    const savedStudent = await newStudent.save();
    console.log('Student saved successfully:', savedStudent);
  } catch (err) {
    console.error('Error saving student:', err);
  }
}

saveStudent(studentData);

const viewClassroomStudents = async (req, res , next) => {
    try {
      const { studentId } = req.params;
      if (!studentId) {
        return res.status(400).json({ error: 'Student ID is required.' });
      }
      const student = await StudentSchema.findById(studentId).populate('classrooms', 'name');
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      const classrooms = student.classrooms.map(classroom => ({
        classroomId: classroom._id,
        classroomName: classroom.name
      }));
  
      res.status(200).json(classrooms);
  
    } catch (error) {
      console.error('Error fetching student classrooms:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getStudentTasks = async (req, res) => {
    try {
      const { studentId, classroomId } = req.params;
  
      const student = await StudentSchema.findById(studentId);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      if (!student.classrooms.includes(classroomId)) {
        return res.status(403).json({ error: 'Student is not enrolled in this classroom' });
      }
  
      const classroom = await ClassroomSchema.findById(classroomId);
      if (!classroom) {
        return res.status(404).json({ error: 'Classroom not found' });
      }
  
      const tasks = classroom.tasks.map(task => ({
        taskId: task._id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.toISOString().split('T')[0] 
      }));
  
      res.status(200).json(tasks);
  
    } catch (error) {
      console.error('Error fetching classroom tasks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  module.exports ={viewClassroomStudents,getStudentTasks };