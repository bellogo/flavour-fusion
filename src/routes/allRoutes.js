const express = require('express');

const router = express.Router();
const AuthController = require('../controllers/AuthController');
const RecipeController = require('../controllers/RecipeController');
const FavoriteController = require('../controllers/FavoriteController');

const authController = new AuthController();
const recipeController = new RecipeController();
const favoriteController = new FavoriteController();

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

router.get('/our-recipe-page', (req, res) => {
  res.render("our-recipe-page", {errors: null, message: null})
});

router.get('/user', recipeController.renderUserPage);

router.get('/favorites', (req, res) => {
  if (req.session.userLoggedIn) {
    
    res.render("favorites", {errors: null, message: null, recipes: null})


  }else {
    res.render("login", {errors: ['Please login to continue'], message: null})
  }
}); 

router.get('/recipies', recipeController.fetchRecipes);

router.get('/view-recipe/recipe', recipeController.getSingleRecipe);

router.get('/get-recipies', recipeController.getAllRecipes);
router.get('/forgot-password', (req, res) => {
  res.render("forgot-password", {errors: null, message: null})
});

router.get('/about-us', (req, res) => {
  res.render("about-us", {errors: null, message: null})
});



router.get('/forgot-password', (req, res) => {
  res.render("forgot-password", {errors: null, message: null})
});

router.get('/login', (req, res) => {
  res.render("login", {errors: null, message: null})
});

router.get('/register', (req, res) => {
  if (req.session.userLoggedIn) {
    res.render("register", {errors: null, message: null})

  }
  res.render("register", {errors: null, message: null})
});

router.get('/logout', (req, res) => {
   req.session.username = "";
    req.session.userLoggedIn = false;
    res.redirect("/");
});

router.get('/verify/:token', authController.verifyUser);

router.get('/get-current-user', authController.getCurrentUser);

router.post('/register', authController.signUp);

router.post('/login', authController.logIn);

router.get("/logout", (req, res) => {
  req.session.email = "";
  req.session.userLoggedIn = false;
  res.render("login", {errors: null, message: 'User logged out'})
});

//ADD RECIPE
router.get('/add-recipe', (req, res) => {
  if (req.session.userLoggedIn) {

    res.render("add-recipe", {errors: null, message: null})

  }else {
    res.render("login", {errors: ['Please login to continue'], message: null})
  }
});

router.post('/add-recipe', recipeController.addRecipe);

router.post('/add-favorite', favoriteController.addFavorite);

router.get('/get-favorites/:user', favoriteController.getFavorites);


router.get('/get-host', (req, res) => {
  if (process.env.HOST) {
    return res.status(200).json({
      status: 'success',
      message: 'host retrieved',
      data: process.env.HOST,
    });
  }else {
    return res.status(400).json({
      status: 'error',
      message: 'no added host in env',
    });
  }
  
});

module.exports = router;