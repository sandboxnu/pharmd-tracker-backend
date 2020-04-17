import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const notes = await req.context.models.Note.findAll();
        res.set({
            'X-Total-Count': notes.length,
            'Access-Control-Expose-Headers': 'X-Total-Count'
        });
        return res.send(notes);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

router.get('/:noteID', async (req, res) => {
    try {
        const note = await req.context.models.Note.findOne({where: {noteID: req.params.noteID}});
        return res.send(note);
    } catch(e) {
        console.log(e);
        return res.send(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const note = await req.context.models.Note.addNewNote(req.body);
        return res.send(note);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

router.put('/:noteID', async (req, res) => {
    try {
        const note = await req.context.models.Note.updateNote(req.params.noteID, req.body);
        return res.send(note);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

export default router;