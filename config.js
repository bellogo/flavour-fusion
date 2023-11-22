// Import env package
require('dotenv').config({ silent: true, path: '.env' });

module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  jwtKey: process.env.JWT_KEY,
  host: process.env.HOST
}
