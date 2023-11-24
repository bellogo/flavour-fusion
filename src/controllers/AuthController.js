/* eslint-disable no-unused-vars */
const Joi = require("joi");
const MainController = require("./MainController");
const {
  responseCode,
  errorResponse,
  generateJWT,
  comparePasswords,
  hashPassword,
  validateRequest,
  verifyJWT,
  statusCode
} = require("../utilities/helper");
const UserRepository = require("../repositories/UserRepo");
const { nodeEnv } = require('../../config');
const SendGrid = require("../services/sendgrid");


module.exports = class AuthController extends MainController {
  constructor() {
    super();
    this.mainRepo = new UserRepository();
  }

  /**
   *
   * user signup controller
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
  signUp = async (req, res) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
      });

      const errors = await validateRequest(req.body, res, schema);
      console.log("errors", errors);
      if (errors) {
        res.render("register", {
          errors: errors,
         message: null
        });
      }

      const { email, password, name } = req.body;

      const hashed = await hashPassword(password);
      const user = await this.mainRepo.create({
        email,
        password: hashed,
        name
      });

      if(user) {
       await SendGrid.sendVerificationEmail(user.email, name)
      } 
      res.render("register", {errors: null, message: "Registeration successful, we've sent you a verification mail."})
    
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
   * user signup controller
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
   logIn = async (req, res) => {
    try {
      const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
      });

      const errors = await validateRequest(req.body, res, schema);
      console.log("errors", errors);
      if (errors) {
        res.render("login", {
          errors: errors,
         message: null
        });
      }

      const { email, password } = req.body;

      const user = await this.mainRepo.getModelByCondition({email});
      
      if (!user){
        res.render("login", {
          errors: ['These credentials do not match our records.'],
         message: null
        });
        
      } 
      const validpass = comparePasswords(password, user.password);
      if (!validpass) {
        res.render("login", {
          errors: ['These credentials do not match our records.'],
         message: null
        });
        
      } 
      if(!user.is_verified){
        res.render("login", {
          errors: ['Kindly verify your email to continue.'],
         message: null
        });
        
      } 

      req.session.email = user.email;

      // added user id, to send the user id to the recipes page
      req.session.user = user._id;
      
      req.session.userLoggedIn = true;
      res.redirect("recipies");
    
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

  verifyUser = async (req, res) => {
    try {
      const {token} = req.params;
      
      if (token) {
       const tokenData = verifyJWT(token);
       if (!tokenData) {
        res.render("login", {
          errors: ['Verification link expired. resend verification '],
         message: null
        });
        }
       
       const admin = await this.mainRepo.updateModelWithQuery({email: tokenData.email}, {is_verified: true});
       if(admin){   
        res.render("login", {
          errors: null,
         message: 'Verification Successful'
        });
        }
      }
      
    } catch (err) {
      console.log(err);
      if(err.code === 11000) {
       return res.render("register", {
          errors: [`${Object.keys(err.keyValue)[0]} already exists`],
          message: null
        });
      }
      return res.render("login", {
        errors: ["An error occured"], message: null
      });
    }
  };

  getCurrentUser = async (req, res) => {
    try {
      if(req.session.userLoggedIn){
        const user = await this.mainRepo.getModelByCondition({email: req.session.email});
        // return res.json({user: user._id});
        return res.status(200).json({
          status: 'success',
          message: 'Current user gotten successfully',
          data: { user:  user._id },
        });
      }else {
        return res.status(400).json({
          status: 'error',
          message: 'no logged-in user',
          data: null
        });
      }
      
    } catch (err) {
      console.log(err);
      return res.json({message: "an error occured"});
    }
  };
  /**
   *
   * user signup controller
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
  renserSignUp = async (req, res) => {
    try {
      res.render("signup", {errors: null, message: null});

      //   return successResponse(res, responseCode.SUCCESS, 'admin login succussful.', admin);
    } catch (err) {
      console.log(err);
      return errorResponse(
        res,
        responseCode.INTERNAL_SERVER_ERROR,
        "An error occurred.",
        err
      );
    }
  };
};
