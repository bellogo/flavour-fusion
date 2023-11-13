// validationMiddleware.js
const Joi = require('joi');
const {errorResponse, validateRequest} = require('../utilities/helper');

module.exports = class Validations {
 
  
/**
   * validate user details on creation
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
async registerValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  await validateRequest(req.body, res, schema)

  return next();
}
}

