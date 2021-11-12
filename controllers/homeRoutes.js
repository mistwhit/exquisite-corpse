const router = require('express').Router();
const { Poem, User, Fragment } = require('../models');
const withAuth = require('../utils/auth');

// route to render homepage template
router.get('/', async (req, res) => {
  res.render('homepage');
});

// route to view All Fragments, the One Big Poem
router.get('/poem', async (req, res) => {
  try {
    const fragmentData = await Fragment.findAll({
      // order: ['date_created', 'DESC'],
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ]
    }); 

    // serialize fragment data for template
    const fragments = fragmentData.map((fragment) => fragment.get({ plain: true }));

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

  // redirect user to /write page if they're already logged in
  if (req.session.logged_in) {
    res.redirect('/write');
    return;
  }
  // if not logged in render the login page
  res.render('login');
});

// render the /write page. will need to add the withAuth function here later so that only logged-in users can add to poem.
router.get('/write', (req, res) => {
  res.render('write');
})

module.exports = router;


/* router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
}); */

