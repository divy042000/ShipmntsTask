const TeacherSchema = require('../models/teacherSchema.js'); 
const ClassroomSchema = require('../models/classroomSchema.js'); 
const StudentSchema = require('../models/studentSchema.js');
export const createClassrooms = async (req, res, next) => {
    try {
      const { teacherId } = req.params;
      const { classroomName } = req.body;
  
      
      if (!classroomName) {
        return res.status(400).json({ error: 'Classroom name is required' });
      }
  
      
      const existingClassroom = await ClassroomSchema.findOne({ name: classroomName });
  
      if (existingClassroom) {
        return res.status(409).json({ error: 'Classroom name already exists' });
      }
  
      const teacher = await TeacherSchema.findById(teacherId);
  
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      const classroom = new ClassroomSchema({
        _id: new mongoose.Types.ObjectId(),
        name: classroomName,
        teacher: teacherId,
        students: [],
        tasks: []
      });
  
      await classroom.save();
  
      teacher.classrooms.push(classroom._id);
  
      await teacher.save();
  
      res.status(201).json({
        classroomId: classroom._id.toString(),
        classroomName: classroom.name
      });
  
    } catch (error) {
      console.error('Error creating classroom:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
 
  export const assignTaskClassroom = async (req, res, next) => {
    try {
      const { classroomId } = req.params;
      const { title, description, dueDate } = req.body;
  
      
      if (!title || !description || !dueDate) {
        return res.status(400).json({ error: 'Title, description, and dueDate are required' });
      }
  
      
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dueDate)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
      }
  
      
      const classroom = await ClassroomSchema.findById(classroomId);

      if (!classroom) {
        return res.status(404).json({ error: 'Classroom not found' });
      }
  
      
      const newTask = {
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        dueDate: new Date(dueDate)
      };
  
      
      classroom.tasks.push(newTask);
  
     
      await classroom.save();
  
      
      res.status(201).json({
        taskId: newTask._id.toString(),
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate.toISOString().split('T')[0] 
      });
  
    } catch (error) {
      console.error('Error assigning task:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
export const addStudentToClassroom = async (req, res, next ) => {
  try {
    const { classroomId } = req.params;
    const { studentId } = req.body;
    if(!classroomId)
    {
      return res.status(400).json({error : 'Classroom ID is required'})
    }
    if (!studentId) {
      return res.status(400).json({ error: 'Student ID is required' });
    }

   
    const classroom = await ClassroomSchema.findById(classroomId);
    const student = await StudentSchema.findById(studentId);

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    
    if (classroom.students.includes(studentId)) {
      return res.status(400).json({ error: 'Student is already in this classroom' });
    }

   
    classroom.students.push(studentId);
    await classroom.save();

   
    student.classrooms.push(classroomId);
    await student.save();

    res.status(200).json({ message: 'Student added successfully.' });

  } catch (error) {
    console.error('Error adding student to classroom:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};