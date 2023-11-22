const express = require('express');

const router = express.Router();

const Validations = require('../middlewares/validationMiddleware');
const allValidations = new Validations();
const {
  registerValidation,
} = allValidations;

const AuthController = require('../controllers/AuthController');

const authController = new AuthController();

/**
 * @swagger
 * /api/v2/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               password: yourpassword
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Validation error or email already exists
 */


router.get('/signup', authController.renserSignUp);

router.get('/', (req, res) => {
  res.render("index", {errors: null, message: null})
});

router.get('/index', (req, res) => {
  res.render("index", {errors: null, message: null})
});

router.get('/contact', (req, res) => {
  res.render("contact", {errors: null, message: null})
});

router.get('/recipe-page', (req, res) => {
  res.render("recipe-page", {errors: null, message: null})
});

router.get('/recipies', (req, res) => {
  if (req.session.userLoggedIn) {
    res.render("recipies", {errors: null, message: null})

  }else {
    res.render("login", {errors: ['Please login to continue'], message: null})
  }
});

router.get('/forgot-password', (req, res) => {
  res.render("forgot-password", {errors: null, message: null})
});

router.get('/about-us', (req, res) => {
  res.render("about-us", {errors: null, message: null})
});

router.get('/user', (req, res) => {
  res.render("user", {errors: null, message: null})
});

router.get('/add-recipe', (req, res) => {
  res.render("add-recipe", {errors: null, message: null})
});
router.get('/forgot-password', (req, res) => {
  res.render("forgot-password", {errors: null, message: null})
});

router.get('/login', (req, res) => {
  res.render("login", {errors: null, message: null})
});

router.get('/register', (req, res) => {
  if (req.session.userLoggedIn) {
    res.render("register", {errors: null, message: 'logged-in'})

  }
  res.render("register", {errors: null, message: null})
});

router.get('/logout', (req, res) => {
   req.session.username = "";
    req.session.userLoggedIn = false;
    res.redirect("/");
});

// router.get('/resend-verification/:email', (req, res) => {
//   res.render("register", {errors: null, message: null})
// });

router.get('/verify/:token', authController.verifyUser);

router.post('/register', authController.signUp);

router.post('/login', authController.logIn);



module.exports = router;