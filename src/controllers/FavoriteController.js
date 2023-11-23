/* eslint-disable no-unused-vars */
const Joi = require("joi");
const MainController = require("./MainController");
const {
  validateRequest,

} = require("../utilities/helper");
const FavoriteRepository = require("../repositories/FavoriteRepo");
const { nodeEnv } = require('../../config');
const SendGrid = require("../services/sendgrid");


module.exports = class FavoriteController extends MainController {
  constructor() {
    super();
    this.mainRepo = new FavoriteRepository();
  }

  /**
   *
   * add Favorite controller
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
  addFavorite = async (req, res) => {
    try {
      const schema = Joi.object({
        user: Joi.string().required(), // Assuming user is a string representation of ObjectId
        edamam_uri: Joi.string().required(),
      });

      const errors = await validateRequest(req.body, res, schema);
      console.log("errors", errors);
      if (errors) {
        return res.status(400).json({
          status: 'error',
          message: 'validarion error',
          error: errors,
        });
      }

      const Favorite = await this.mainRepo.create(req.body);

    
      return res.status(200).json({
        status: 'success',
        message: 'added to favorites',
        data: Favorite,
      });  
    
    
    } catch (err) {
      console.log('error', err);

    }
  };


  
  

   /**
   *
   * fetch Favorites
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
   getFavorites = async (req, res) => {
    try {
        const allFavorites = await this.mainRepo.getCollection({user: req.params.user});
        console.log(allFavorites);
     
        return res.status(200).json({
          status: 'success',
          message: 'fetch all favorites',
          data: allFavorites.records,
        });
    
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

  getAllFavorites = async (req, res) => {
    try {

     
       
        const allFavorites = await this.mainRepo.getCollection();
        // console.log(allFavorites);
        return res.json(allFavorites)
    
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

 
};
