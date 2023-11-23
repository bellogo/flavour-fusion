const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const path = require("path");
const session = require("express-session");
const { port } = require('./config');

// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
// };

const app = express();
// app.use(cors(corsOptions));

// Configure views and static assets
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/templates"));
app.use(express.static(__dirname + "/public/"));


app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
    // Add other necessary directives here according to your needs
  },
}));

app.use(
  session({
      secret: "randomsecret",
      resave: false,
      saveUninitialized: true,
  })
);
// const port = process.env.PORT || 3000;
const routes = require('./src/routes'); // Import your welcome route

// app.use(helmet());

// Connect to MongoDB
mongoose.connect('mongodb+srv://bellogo:1234@netflix-skinny-double.mozzv.mongodb.net/flavour-fusion?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swaggerConfig'); // Import the Swagger configuration


// Serve Swagger UI and Swagger JSON
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Passport Configuration
require('./src/config/passport')(passport);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Application Route
const apiRoutes = require('./src/routes');

// Routes
app.use('', routes);


app.listen(port || 3000, () => {
  console.log(`Server is running on port ${port||'3000'} http://localhost:${port||'3000'}`);
});
