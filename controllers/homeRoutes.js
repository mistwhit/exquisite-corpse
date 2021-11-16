const router = require('express').Router();
const { User, Fragment } = require('../models');
const withAuth = require('../utils/auth');

// route to render homepage template with User data so we can determine whether user is logged_in
router.get('/', async (req, res) => {
  try {
    const fragmentData = await Fragment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // seralize user data so template can use it
    const fragments = fragmentData.map((fragment) =>
      fragment.get({ plain: true })
    );

    console.log(
      '_______________________________________________________________________________________________________________' +
        'Logged in as' +
        req.session.user_id +
        req.session.logged_in
    );
    // render the homepage and pass along whether user is logged_in
    res.render('homepage', {
      fragments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to view All Fragments, the One Big Poem
router.get('/poem', async (req, res) => {
  try {
    const fragmentData = await Fragment.findAll({
      // order: ['date_created', 'DESC'],
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });

    // serialize fragment data for template
    const fragments = fragmentData.map((fragment) =>
      fragment.get({ plain: true })
    );

    // render the 'poem' template and pass along serialized fragment data
    res.render('poem', {
      fragments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to render login/signup page
router.get('/login', (req, res) => {
  // redirect user to homepage page if they're already logged in
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // if not logged in render the login page
  res.render('login');
});

// render the /write page. withAuth function ensures only logged in users allowed.
router.get('/write', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Fragment }],
    });

    console.log(
      '_______________________________________________________________________________________________________________' +
        'Logged in as' +
        req.session.user_id +
        req.session.logged_in
    );
    const user = userData.get({ plain: true });

    res.render('write', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to view individual Users and their Fragments
router.get('/poets/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Fragment,
          attributes: ['text_input'],
        },
      ],
    });

    // serialize data for template
    const user = userData.get({ plain: true });

    // render the 'poets' template and pass along serialized  data
    res.render('poets', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
