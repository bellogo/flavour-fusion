const express = require('express');

const router = express.Router();
const AuthController = require('../controllers/AuthController');
const RecipeController = require('../controllers/RecipeController');

const authController = new AuthController();
const recipeController = new RecipeController();

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

router.get('/verify/:token', authController.verifyUser);

router.post('/register', authController.signUp);

router.post('/login', authController.logIn);

//ADD RECIPE
router.get('/add-recipe', (req, res) => {
  res.render("add-recipe", {errors: null, message: null})
});

router.post('/add-recipe', recipeController.addRecipe);




module.exports = router;