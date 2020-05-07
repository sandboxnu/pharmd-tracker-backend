import { Router } from 'express';

const router = Router();

/**
 * Logs in a user
 * @param {string} username
 * @param {string} password
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userToken = await req.context.models.User.loginUser(username, password);
        res.status(200).json({
            accessToken: userToken
        });
    } catch (e) {
        console.error(e);
        res.status(e.status).send(e.message);
    }


});




export default router;
