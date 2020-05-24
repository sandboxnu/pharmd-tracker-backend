import { Router } from 'express';

const router = Router();

/**
 * Logs in a user
 * @param {string} email
 * @param {string} password
 */
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userToken = await req.context.models.User.loginUser(email, password);
        res.status(200).json({
            accessToken: userToken
        });
    } catch (e) {
        console.error(e);
        res.statusMessage = e.message;
        res.status(e.status).send();
    }


});




export default router;
