import { Router } from 'express';

const router = Router();

// Gets all courses that match the filter parameters
router.get('', async (req, res) => {
    try {
        const courses = await req.context.models.Course.filter(req.query);
        res.set({
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
        const courses = await req.context.models.Course.findAll();
        // res.set({
        //     'X-Total-Count': courses.length,
        //     'Access-Control-Expose-Headers': ['X-Total-Count']
        // });
        return res.send(courses);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets the course the provided id
router.get('/:courseID', async (req, res) => {
    try {
        const course = await req.context.models.Course.findById(req.params.courseID);
        return res.send(course);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets the course with the given name
router.get('/name/:courseName', async (req, res) => {
    try {
        const course = await req.context.models.Course.findByName(req.params.courseName);
        return res.send(course);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets the course the provided id
router.get('/:courseID/assessments', async (req, res) => {
    try {
        const assessments = await req.context.models.Course.getAssessmentsByCourse(req.params.courseID);
        res.set({
            'X-Total-Count': assessments.length,
            'Access-Control-Expose-Headers': ['X-Total-Count']
        });
        return res.send(assessments);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets the students in course the provided id
router.get('/:courseID/students', async (req, res) => {
    try {
        const { courseID } = req.params;
        const students = await req.context.models.Course.getStudentsByCourse(courseID);
        res.set({
            'X-Total-Count': students.length,
            'Access-Control-Expose-Headers': ['X-Total-Count']
        });
        return res.send(students);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

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
router.put('/:courseID', async (req, res) => {
    try {
        const { courseID } = req.params;
        const updatedCourse = await req.context.models.Course.updateCourse(courseID, req.body);
        return res.send(updatedCourse);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

export default router;
