import { Router } from 'express';

const router = Router();

/**
 * Imports initial student data to the DB
 * Accepts body of shape {
 *     students: [{...}...]
 *     assessments: [{...}...]
 * }
 */

router.post('/import',
    /**
     *
     * @param req {{
     *     body: {
     *         students: Array<BasicStudent>,
     *         assessments: Array<BasicStudentAssessment>
     *     },
     *     context
     * }}
     * @param res
     * @returns {Promise<boolean|void>}
     */
    async (req, res) => {
    try {
        const importStudents = await req.context.models.Student.addManyStudents(req.body.students);
        const importExams = await req.context.models.Assessment.addManyAssessments(req.body.assessments);
        return res.send([importStudents, importExams]);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

export default router;
