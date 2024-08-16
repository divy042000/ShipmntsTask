const express = require('express');
const router = express.Router(); 
const teacherController = require('../controllers/teacherController.js');
const studentController = require('../controllers/studentController.js');
router.use(express.json());

router.post("/teachers/:teacherId/classrooms",teacherController.createClassrooms);
router.post("/classrooms/:classroomId/tasks",teacherController.assignTaskClassroom);
router.post("/classrooms/:classroomId/students",teacherController.addStudentToClassroom);
router.get("/teachers/:teacherId/classrooms",teacherController.viewClassroom);
router.put("/classrooms/:classroomId",teacherController.editClassroom);
router.delete("/classrooms/:classroomId",teacherController.deleteClassroom);
router.get("/classrooms/:classroomId/tasks/:taskId/submissions",teacherController.taskSubmissionStatus);
router.get("/students/:studentId/classrooms",studentController.viewClassroomStudents);
router.get("/students/:studentId/classrooms/:classroomId/tasks",studentController.getStudentTasks);


module.exports = router; 
