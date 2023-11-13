const MainController = require('./MainController');
const {
    responseCode, errorResponse, successResponse, generateJWT, comparePasswords, generateRandomString, hashPassword,
  } = require('../utilities/helper');
  const UserRepository = require('../repositories/UserRepo');
  

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
      const { email, password } = req.body;
    
      const hashed = await hashPassword(password)
      const admin = await this.mainRepo.create({email, password: hashed})

      return successResponse(res, responseCode.SUCCESS, 'admin login succussful.', admin);
    } catch (err) {
      console.log(err);
      return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);
    }
  }

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
        res.render("signup")

    //   return successResponse(res, responseCode.SUCCESS, 'admin login succussful.', admin);
    } catch (err) {
      console.log(err);
      return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);
    }
  }

};
