const TeacherSchema = require('../models/teacherSchema.js'); 
const ClassroomSchema = require('../models/classroomSchema.js'); 

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
  
  