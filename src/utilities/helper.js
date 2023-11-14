/**
 * import the configuration file
 */
const config = require('../../config');
const { jwtKey } = config;



const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const saltRounds = 10;
const Joi = require('joi');

/** *******************************
 *  Response Code Helpers
 ********************************* */
exports.responseCode = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOW: 405,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    ACCOUNT_NOT_VERIFIED: 209,
  };


/**
 *
 * @param {object} res response object
 * @param {number} statusCode
 * @param {string} message
 * @param {*} data
 * @returns {object} res
 */
exports.successResponse =  (res, statusCode = this.responseCode.SUCCESS,
    message = 'success', data = null) => {
    res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  };
  
  
  
  /**
   *
   * @param {object} res response object
   * @param {number} statusCode
   * @param {string} message
   * @param {*} errors
   * @param files
   * @returns {object} res
   */
  exports.errorResponse = (res, statusCode = this.responseCode.NOT_FOUND,
    message = 'error', errors = []) => {
    res.status(statusCode).json({
      status: 'error',
      message,
      errors,
    });
  };

  /**
 * The validation rule
 * @param req
 * @param res
 * @param next
 * @param schema
 */
exports.validateRequest = (object, res, schema, unknown = false) => {
  const FormattedError = [];

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: unknown, // ignore unknown props
    // stripUnknown: true, // remove unknown props
  };
  const { error, data } = schema.validate(object, options);
  if (error) {
    /**
         * loop through the error messages and return readable error message
         */
    error.details.forEach((e) => {
      FormattedError.push(e.message.replace(/"/g, ''));
    });

    /**
         * returns a single error at a time
         */
    return FormattedError;
  }else {
    return false;
  }
}

/**
 * hash passwords
 * @returns {Promise<void>}
 * @param password
 */
exports.hashPassword = async (password) => {
  console.log('pasword', password);
  const newPassword = password.replace(/ /g, '')
  const salt = await bcrypt.genSaltSync(saltRounds);
  return await bcrypt.hashSync(newPassword, salt);
};