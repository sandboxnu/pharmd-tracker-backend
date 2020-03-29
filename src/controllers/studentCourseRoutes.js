import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const studentcourses = await req.context.models.StudentCourse.findAll();
        return res.send(studentcourses);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const studentcourse = await req.context.models.StudentCourse.create(req.body);
        return res.send(studentcourse);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

router.put('/:nuid/:courseID', async (req, res) => {
    try {
        const studentcourse = await req.context.models.StudentCourse
            .updateStudentCourse(req.params.NUID, req.params.courseID, req.body);
        return res.send(studentcourse);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

export default router;
