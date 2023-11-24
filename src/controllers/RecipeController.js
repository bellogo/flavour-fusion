/* eslint-disable no-unused-vars */
const Joi = require("joi");
const MainController = require("./MainController");
const {
  validateRequest,

} = require("../utilities/helper");
const RecipeRepository = require("../repositories/RecipeRepo");
const { nodeEnv } = require('../../config');
const SendGrid = require("../services/sendgrid");
const axios = require('axios');


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
      // // for testing 
      // const allRecipes = await this.mainRepo.getCollection();
      //   // console.log(allRecipes);
      // res.render("recipies", {errors: null, message: null, recipes: allRecipes.records})


      // --original data
      if (req.session.userLoggedIn) {

        // console.log(req.session.user)
        const allRecipes = await this.mainRepo.getCollection();
        // console.log(allRecipes);
        res.render("recipies", {errors: null, message: null, recipes: allRecipes.records,userId: req.session.user})
    
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

  getSingleRecipe = async (req, res) => {
    try {

        const uriValue = req.query.uri;
        console.log(uriValue)
        // res.json({"message": "received request"})
       
        const appId = 'fbf980cd'; 
        const appKey = '17f290186199c2129b0e48087b583767';
        // get the edamam ednpoint
        const edamamApiEndpoint = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodeURIComponent(uriValue)}&app_id=${appId}&app_key=${appKey}`;

        
        
        // res.status(edamamResponse.status).json(edamamResponse.data);
        
        return res.render("recipe-page", {
          errors: null,
          message: null,
          endpoint: edamamApiEndpoint
        });
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'error',
        message: 'an error occured while fetching recipe',
      });
    }
  };

};
