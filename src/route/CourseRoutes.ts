import { Router } from 'express';
import {CourseController} from "../controller/CourseController";

const router = Router();
const controller = new CourseController();

// Gets all courses that match the filter parameters
router.get('/', async (req, res) => {
    try {
        const courses = await controller.filter(req, res);
        await res.set({
            'X-Total-Count': courses.length,
            'Access-Control-Expose-Headers': ['X-Total-Count']
        });
        return res.send(courses);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets all the courses in the DB
router.get('/', async (req, res) => {
    try {
        console.log('Before finding...');
        const courses = await controller.all(req, res);
        console.log('After finding...');
        await res.set({
            'X-Total-Count': courses.length,
            'Access-Control-Expose-Headers': ['X-Total-Count']
        });
        console.log('After setting...');
        return res.send(courses);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets the course the provided id
router.get('/:courseId', async (req, res) => {
    try {
        const course = await controller.findById(req, res);
        return res.send(course);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets the course with the given name
router.get('/name/:courseName', async (req, res) => {
    try {
        const course = await controller.findByName(req, res);
        return res.send(course);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});