import { Router } from 'express';

const router = Router();

// Gets all the students in the DB

// Gets a single student by their NUID

// Gets a single student by their first and last name

// Gets all students from a given class

// Gets all students from a given cohort (year)

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
