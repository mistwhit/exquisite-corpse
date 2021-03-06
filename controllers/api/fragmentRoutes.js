const router = require('express').Router();
const { Fragment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// get all fragments
router.get('/', async (req, res) => {
  try {
    const fragmentData = await Fragment.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(fragmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one fragment
router.get('/:id', async (req, res) => {
  try {
    const fragmentData = await Fragment.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(fragmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a fragment
router.post('/', withAuth, async (req, res) => {
  try {
    const fragmentData = await Fragment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(fragmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a fragment
router.delete('/:id', withAuth, async (req, res) => {
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
