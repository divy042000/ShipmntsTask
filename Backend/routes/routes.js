const express = require('express');
const router = express.Router(); 
const teacherController = require('../controllers/teacherController.js')
router.use(express.json());

router.post("/teachers/:teacherId/classrooms",teacherController.createClassrooms);
router.post("/classrooms/:classroomId/tasks",teacherController.assignTaskClassroom);


module.exports = router; 
