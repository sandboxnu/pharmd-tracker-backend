import { Router } from 'express';

const router = Router();

// -------------------------------- GET METHODS ----------------------------------------

/**
 * Gets all the users
 * FOR TESTING PURPOSES ONLY
 */
router.get('/', async (req, res) => {
    try {
        const user = await req.context.models.User.findAll();
        return res.send(user);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }

});

/**
 * Returns the user with the provided email
 */
router.get('/:email', async (req, res) => {
    try {
        const user = await req.context.models.User.findUser(req.params.email);
        return res.send(user);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }

});

/**
 * Returns a boolean result of whether the given email has already been used
 */
router.get('/exists/:email', async (req, res) => {
    try {
        const exists = await req.context.models.User.emailExists(req.params.email);
        return res.send(exists);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }

});


//  ------------------------------------- POST METHODS ------------------------------------

/**
 * Adds a new user to the DB
 * @param body {{email, password, firstName, lastName, isAdmin}}
 */
router.post('/', async (req, res) => {
    try {
        const newUser = await req.context.models.User.addNewUser(req.body);
        return res.send(newUser);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }

});


// -------------------------------------- PUT METHODS --------------------------------------

/**
 * Updates the user info. Expects to be passed only properties that are being updated
 */
router.put('/', async (req, res) => {
    try {
        const { userID } = req.params;
        const updatedUser = await req.context.models.User.updateUser(userID, req.body);
        return res.send(updatedUser);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }


});


export default router;
