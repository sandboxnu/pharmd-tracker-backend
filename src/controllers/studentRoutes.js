import { Router } from 'express';

const router = Router();

// Gets all the students in the DB
router.get('/', async (req, res) => {
    try {
        const students = await req.context.models.Student.findAll();
        return res.send(students);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets a single student by their NUID
router.get('/:NUID', async (req, res) => {
    try {
        const student = await req.context.models.Student.findByNUID(req.params.NUID);
        return res.send(student);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets a single student by their first and last name
router.get('/:firstName-:lastName', async (req, res) => {
    try {
        const student = await req.context.models.Student.findByFirstLastName(req.params.firstName, req.params.lastName);
        return res.send(student);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets all students from a given course
router.get('/:NUID/courses', async (req, res) => {
    try {
        const courses = await req.context.models.Student.getCourses(req.params.NUID);
        return res.send(courses);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets all students from a given cohort (year)
router.get('cohort/:cohort', async (req, res) => {
    try {
        const students = await req.context.models.Student.getCohort(req.params.adjustedGradDate);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});



// Adds a new student to the DB
router.post('/', async (req, res) => {
    try {
        const newStudent = await req.context.models.Student.addNewStudent(req.body);
        return res.send(newStudent);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

// Updates the information for a single student
router.put('/:nuid', async (req, res) => {
    try {
        const updatedStudent = await req.context.models.Student.updateStudent(req.params.nuid, req.body);
        return res.send(updatedStudent);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

export default router;
