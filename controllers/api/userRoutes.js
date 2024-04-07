//============================
// starting info
//===========================
const router = require('express').Router();
const { User } = require('../../models/User.js');

//==========================
// used to create new users
//==========================
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.json(userData)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.put('/password', async (req, res) => {
    try {
        console.log('Enter Password Here')
        const userData = await User.findOne({
            where: {
                email: res.body.email,
            },
        });

        if (!userData) {
            res
                .status(401)
                .json({ message: 'Uh on! Your email or password is incorrect! Please try again.'});
                return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(401)
                .json({ message: 'Uh on! Your email or password is incorrect! Please try again.'});
                return;
        }
        console.log(res.body.newPassword)
        const userDataNew = await userData.update(
            { password: req.body.userDataNew },
        );

        res
            .status(200)
            .json({ user: userData, message: 'Your password has been changed, please wait to be logged in!'});
    } catch (error) {
        console.log(error);
        res.status(500).json.apply(error);
    }
});

//=============================
// below is to lig the user into the app
//=============================
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!userData) {
            res
                .status(401)
                .json({ message: 'Uh on! Your email or password is incorrect! Please try again.'});
                return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(401)
                .json({ message: 'Uh on! Your email or password is incorrect! Please try again.'});
                return;
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: userData, message: 'Logging you in!'});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//==========================
// below used to log user out of app
//==========================
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.sessiob.destroy(() => {
            res.status(200).exit();
        });
    } else {
        res.status(401).exit();
    }
});

module.exports = router;

