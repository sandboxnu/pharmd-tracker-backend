import { Router } from 'express';

const router = Router();

// Gets all the courses in the DB


// Gets the course the provided id


// Gets the course with the given name


// Adds a new course to the database
router.post('/', async (req, res) => {
    try {
        const newCourse = await req.context.models.Course.addNewCourse(req.body);
        return res.send(newCourse);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

// Updates the course with given ID
router.put('/:courseId', async (req, res) => {
    try {
        const updatedCourse = await req.context.models.Course.updateCourse(req.params.courseId, req.body);
        return res.send(updatedCourse);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

export default router;
