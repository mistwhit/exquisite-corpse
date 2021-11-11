const router = require('express').Router();
const { Fragment, User, Poem } = require('../../models');
const withAuth = require('../../utils/auth');

// get all fragments
router.get("/", async (req, res) => {
    try {
        const fragmentData = await Fragment.findAll({
            include: [
                {
                    model: User,
                },
                {
                    model: Poem,
                },
            ],
        }); res.status(200).json(fragmentData)
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one fragment
router.get(":/id", async (req, res) => {
    try {
        const fragmentData = await Fragment.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: User,
                },
                {
                    model: Poem,
                },
            ],
        }); res.status(200).json(fragmentData)
    } catch (err) {
        res.status(500).json(err);
    }
});

// post/create a fragment
router.post("/", withAuth, async (req, res) => {
    try {
        const fragmentData = await Fragment.create({
        text_input: req.body.text_input,
        }); res.status(200).json(fragmentData)
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a fragment
router.delete(':/id', async (req, res) => {
    try {
        const fragmentData = await Fragment.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(fragmentData);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;