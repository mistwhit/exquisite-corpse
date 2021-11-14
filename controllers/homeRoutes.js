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
    const fragments = fragmentData.map((fragment) => fragment.get({ plain: true }));

    console.log("_______________________________________________________________________________________________________________" + "Logged in as" + req.session.user_id + req.session.logged_in);
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

// render the /write page. will need to add the withAuth function here later so that only logged-in users can add to poem.
router.get('/write', withAuth, (req, res) => {
  res.render('write');
});

module.exports = router;
