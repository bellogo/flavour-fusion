/* eslint-disable no-unused-vars */
const Joi = require("joi");
const MainController = require("./MainController");
const {
  responseCode,
  errorResponse,
  successResponse,
  generateJWT,
  comparePasswords,
  generateRandomString,
  hashPassword,
  validateRequest,
} = require("../utilities/helper");
const UserRepository = require("../repositories/UserRepo");

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
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
      });

      const errors = await validateRequest(req.body, res, schema);
      console.log("erriuhiusn", errors);
      if (errors) {
        res.render("register", {
          errors: errors,
         message: null
        });
      }

      const { email, password } = req.body;

      const hashed = await hashPassword(password);
      const admin = await this.mainRepo.create({
        email,
        password: hashed,
      });

      res.render("register", {errors: null, message: "Registeration success"})
 
    } catch (err) {
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
  renserSignUp = async (req, res) => {
    try {
      res.render("signup");

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
