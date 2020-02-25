import { Router } from 'express';

const router = Router();

// --------------------------- GET METHODS ---------------------------

// ----- groups of students -----

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

// Gets all students from a given cohort (year)
router.get('/fromCohort/:cohort', async (req, res) => {
    try {
        const students = await req.context.models.Student.getFromCohort(req.params.cohort);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// ----- one student -----

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

// ----- courses from students -----

// Gets all courses from a student with the given NUID
router.get('/:NUID/courses', async (req, res) => {
    try {
        const courses = await req.context.models.Student.getCoursesByNUID(req.params.NUID);
        return res.send(courses);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// ----- assessments of students -----

// Gets all assessments in a given course from a student with the given NUID
    router.get('/students/:NUID/:courseID/assessments', async (req, res) => {
        try {
            const assessments = await req.context.models.Student.getCourseAssessmentsByNUID(req.params.NUID);
            return res.send(assessments);
        } catch (e) {
            console.log(e);
            return res.send(e);
        }
    });

// Gets all assessments from a student with the given NUID
router.get('/:NUID/assessments', async (req, res) => {
    try {
        const assessments = await req.context.models.Student.getAssessmentsByNUID(req.params.NUID);
        return res.send(assessments);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// --------------------------- POST METHODS ---------------------------

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

// --------------------------- PUT METHODS ---------------------------

// Updates the information for a single student
    router.put('/:NUID', async (req, res) => {
        try {
            const updatedStudent = await req.context.models.Student.updateStudent(req.params.NUID, req.body);
            return res.send(updatedStudent);
        } catch (e) {
            console.log(e);
            return res.send(e);
        }
    });

    export default router
