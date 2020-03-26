import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const studentassesments = await req.context.models.StudentAssessment.findAll();
        return res.send(studentassesments);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const studentassesment = await req.context.models.StudentAssessment.create(req.body);
        return res.send(studentassesment);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

router.put('/:nuid/:assessmentID', async (req, res) => {
    try {
        const studentassesment = await req.context.models.StudentAssessment
            .updateStudentAssessment(req.params.NUID, req.params.assessmentID, req.body);
        return res.send(studentassesment);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});