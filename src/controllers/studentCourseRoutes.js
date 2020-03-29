import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const studentCourses = await req.context.models.StudentCourse.findAll();
        return res.send(studentCourses);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const studentCourse = await req.context.models.StudentCourse.create(req.body);
        return res.send(studentCourse);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

router.put('/:nuid/:courseID', async (req, res) => {
    try {
        const studentCourse = await req.context.models.StudentCourse
            .updateStudentCourse(req.params.NUID, req.params.courseID, req.body);
        return res.send(studentCourse);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

export default router;