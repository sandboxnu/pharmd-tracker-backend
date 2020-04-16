import { Router } from 'express';

const router = Router();

// Gets all the exams in DB
router.get('/', async (req, res) => {
    try {
        const exams = await req.context.models.Exam.findAll();
        return res.send(exams);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets an exam with the given id
router.get('/:examID', async (req, res) => {
    try {
        const exam = await req.context.models.Exam.findById(req.params.examId);
        return res.send(exam);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets all exams from the given class

// Gets all exams for the given student

// Gets all exams from given students for given class
router.get('/:studentId/:courseId', async (req, res) => {
    try {
        const exams = await req.context.models.Exam.getStudentExamsFromClass(req.params.studentId, req.params.courseId);
        return res.send(exams);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

// Adds a new exam to the DB
router.post('/', async (req, res) => {
    try {
        const newExam = await req.context.models.Exam.addNewExam(req.body);
        return res.send(newExam);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

// Updates the exam with given ID in the DB
router.put('/:examId', async (req, res) => {
    try {
        const updateExam = await req.context.models.Exam.updateExam(req.params.examId, req.body);
        return res.send(updateExam);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

export default router;
