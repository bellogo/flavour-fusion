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
  res.render("home")
});

router.get('/about-us', (req, res) => {
  res.render("about-us")
});

router.get('/forgot-password', (req, res) => {
  res.render("forgot-password")
});

router.get('/login', (req, res) => {
  res.render("login")
});

router.get('/register', (req, res) => {
  res.render("register", {errors: null, message: null})
});

router.post('/register', authController.signUp);

module.exports = router;