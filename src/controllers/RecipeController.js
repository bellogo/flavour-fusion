/* eslint-disable no-unused-vars */
const Joi = require("joi");
const MainController = require("./MainController");
const {
  validateRequest,

} = require("../utilities/helper");
const RecipeRepository = require("../repositories/RecipeRepo");
const { nodeEnv } = require('../../config');
const SendGrid = require("../services/sendgrid");


module.exports = class RecipeController extends MainController {
  constructor() {
    super();
    this.mainRepo = new RecipeRepository();
  }

  /**
   *
   * add recipe controller
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
  addRecipe = async (req, res) => {
    try {

      console.log(req.body);
      const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        ingredients: Joi.array().items(Joi.string()).required(),
        instructions: Joi.array().items(Joi.string()).required(),
        source: Joi.string(),
        source_url: Joi.string(),
        calories: Joi.string(),
        video: Joi.string(),
      });

      const errors = await validateRequest(req.body, res, schema);
      console.log("errors", errors);
      if (errors) {
        res.render("register", {
          errors: errors,
         message: null
        });
      }

      const recipe = await this.mainRepo.create(req.body);

      const allRecipes = await this.mainRepo.getCollection();
      // console.log(allRecipes);
      return res.render("recipies", {errors: null, message: "Recipe added successful"})
    
    } catch (err) {
      console.log('error', err);

      if(err.code === 11000) {
       return res.render("register", {
          errors: [`${Object.keys(err.keyValue)[0]} already exists`],
          message: null
        });
      }
      return res.render("register", {
        errors: ["An error occured"], message: null
      });
    }
  };

  

   /**
   *
   * fetch recipes
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
   fetchRecipes = async (req, res) => {
    try {

      if (req.session.userLoggedIn) {
        const allRecipes = await this.mainRepo.getCollection();
        // console.log(allRecipes);
        res.render("recipies", {errors: null, message: null, recipes: allRecipes.records})
    
      }else {
        res.render("login", {errors: ['Please login to continue'], message: null})
      }
     

    
    } catch (err) {
      console.log('error', err);

      if(err.code === 11000) {
       return res.render("register", {
          errors: [`${Object.keys(err.keyValue)[0]} already exists`],
          message: null
        });
      }
      return res.render("register", {
        errors: ["An error occured"], message: null
      });
    }
  };

  getAllRecipes = async (req, res) => {
    try {

     
       
        const allRecipes = await this.mainRepo.getCollection();
        // console.log(allRecipes);
        return res.status(200).json({
          status: 'success',
          message: 'fetched local recipes',
          data: allRecipes.records,
        });
    } catch (err) {
      console.log('error', err);

      if(err.code === 11000) {
       return res.render("register", {
          errors: [`${Object.keys(err.keyValue)[0]} already exists`],
          message: null
        });
      }
      return res.status(500).json({
        status: 'error',
        message: 'an error occured',
      });
    }
  };

 
};
