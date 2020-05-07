import { Router } from 'express';

const router = Router();

router.get('', async (req, res) => {
    try {
        const studentCourses = await req.context.models.StudentCourse.filter(req.query);
        res.set({
            'X-Total-Count': studentCourses.length,
            'Access-Control-Expose-Headers': ['X-Total-Count']
        });
        return res.send(studentCourses);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

router.get('/', async (req, res) => {
    try {
        const studentCourses = await req.context.models.StudentCourse.findAll();
        res.set({
            'X-Total-Count': studentCourses.length,
            'Access-Control-Expose-Headers': ['X-Total-Count']
        });
        return res.send(studentCourses);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

router.get('/:NUID/:courseID', async (req, res) => {
    try {
        const studentCourse = await req.context.models
            .StudentCourse.getStudentCourse(req.params.NUID, req.params.courseID);
        return res.send(studentCourse);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const studentCourse = await req.context.models.StudentCourse.addNewSC(req.body);
        return res.send(studentCourse);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

router.put('/:NUID/:courseID', async (req, res) => {
    try {
        const studentCourse = await req.context.models.StudentCourse
            .updateStudentCourse(req.params.NUID, req.params.courseID, req.body);
        return res.send(studentCourse);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 91c416b5f1e9d81ac99cef6671a00930e539995d
