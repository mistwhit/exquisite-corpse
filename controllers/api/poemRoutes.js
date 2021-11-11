const router = require('express').Router();
const { Fragment, User, Poem } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all poems
router.get("/", async (req, res) => {
  try {
    const poemData = await Poem.findAll({
      include: [
        {
          model: User
        },
        {
          model: Poem
        }
        // Include Fragment?
      ]
    }); res.status(200).json(poemData)
  } catch (err) {
    res.status(500).json(err);
  }
})

// GET a single poem
router.get(":/id", async (req, res) => {
  try {
    const poemData = await Poem.findOne({
      where: {
        id: req.params.id
      },
      include: [
          {
            model: User
          },
          {
            model: Poem
          }
          // Include Fragment?
      ]
    }); res.status(200).json(poemData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// POST a poem
router.post('/', withAuth, async (req, res) => {
  try {
    const poemData = await Poem.create({
      text_input: req.body.text_input,
    }); res.status(200).json(poemData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a poem
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const poemData = await Poem.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!poemData) {
      res.status(404).json({ message: 'No poem found with this id!' });
      return;
    }
    res.status(200).json(poemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;