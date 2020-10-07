import {Router} from "express";
import {NoteController} from "../controller/NoteController";

const controller = new NoteController();
const router = new Router();

// get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await controller.all(req, res);
        res.set({
            'X-Total-Count': notes.length,
            'Access-Control-Expose-Headers': ['X-Total-Count']
        });
        return res.send(notes);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

// create a note
router.post('/', async (req, res) => {
    try {
        const note = await controller.save(req, res);
        return res.send(note);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
})

// update a note
router.put('/:noteID', async (req, res) => {
    try {
        const note = await controller.save(req, res);
        return res.send(note);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
})

// get a note with given ID
router.get('/:noteID', async (req, res) => {
    try {
        const note = await controller.findById(req, res);
        return res.send(note);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
})