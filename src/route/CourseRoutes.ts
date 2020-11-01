import { Router } from 'express';
import {CourseController} from "../controller/CourseController";

const router = Router();

// TODO Gets all courses that match the filter parameters

// Gets all the courses in the DB
router.get('/', CourseController.all);

// Gets the course the given id
router.get('/:courseId', CourseController.findById);

// Gets the course with the given name
router.get('/name/:courseName', CourseController.findByName);

// Creates a new course
router.post('/', CourseController.save);

// Updates the course with the given id
router.put('/:courseId', CourseController.update);

// Deletes the course with the given id
router.delete('/:courseId', CourseController.remove);

export default router;