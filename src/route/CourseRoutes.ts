import { Router } from 'express';
import {CourseController} from "../controller/CourseController";

const router = Router();

// TODO Gets all courses that match the filter parameters

// Gets all the courses in the DB
router.get('/', async (req, res) => {
    try {
        const courses = await CourseController.all(req, res);
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

// Gets the course the provided id
router.get('/:courseId', async (req, res) => {
    try {
        const course = await CourseController.findById(req, res);
        return res.send(course);
    } catch(e) {
        return res.send(e);
    }
});

// Gets the course with the given name
router.get('/name/:courseName', async (req, res) => {
    try {
        const course = await CourseController.findByName(req, res);
        return res.send(course);
    } catch(e) {
        return res.send(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const newCourse = await CourseController.save(req, res);
        return res.send(newCourse);
    } catch (e) {
        return res.send(e);
    }
});

router.delete('/:courseId', async (req, res) => {
    try {
        await CourseController.remove(req, res);
        return res.send('Success');
    } catch (e) {
        return res.send(e);
    }
});

// TODO put method

export default router;