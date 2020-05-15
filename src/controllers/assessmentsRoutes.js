import { Router } from 'express';

const router = Router();

// Gets all the assessments that match the query params
router.get('', async (req, res) => {
    try {
        console.log('Filter route for assessments');
        const assessments = await req.context.models.Assessment.filter(req.query);
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

// Gets all the assessments in DB
router.get('/', async (req, res) => {
    try {
        const assessments = await req.context.models.Assessment.findAll();
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

// Gets an assessment with the given id
router.get('/:assessmentID', async (req, res) => {
    try {
        const assessment = await req.context.models.Assessment.findById(req.params.assessmentID);
        return res.send(assessment);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Gets all individual student instances of assessment with the given id
router.get('/:assessmentID/instances', async (req, res) => {
    try {
        const studentAssessments = await req.context.models.StudentAssessment.getStudentAssessmentsByTestID(req.params.assessmentID);
        res.set({
            'X-Total-Count': studentAssessments.length,
            'Access-Control-Expose-Headers': ['X-Total-Count']
        });
        return res.send(studentAssessments);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

// Adds a new assessment to the DB
router.post('/', async (req, res) => {
    try {
        const newAssessment = await req.context.models.Assessment.addNewAssessment(req.body);
        return res.send(newAssessment);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

// Updates the assessment with given ID in the DB
router.put('/:assessmentID', async (req, res) => {
    try {
        const { assessmentID } = req.params;
        const updateAssessment = await req.context.models.Assessment.updateAssessment(assessmentID, req.body);
        return res.send(updateAssessment);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

export default router;
