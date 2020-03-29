import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const studentAssessments = await req.context.models.StudentAssessment.findAll();
        return res.send(studentAssessments);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

router.get('/:nuid/:assessmentID', async (req, res) => {
    try {
        const assessments = await req.context.models
            .StudentAssessment.getStudentAssessment(req.params.NUID, req.params.assessmentID);
        return res.send(assessments);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const studentAssessment = await req.context.models.StudentAssessment.create(req.body);
        return res.send(studentAssessment);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

router.put('/:nuid/:assessmentID', async (req, res) => {
    try {
        const studentAssessment = await req.context.models.StudentAssessment
            .updateStudentAssessment(req.params.NUID, req.params.assessmentID, req.body);
        return res.send(studentAssessment);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

export default router;