const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./api/routes/v1/index.route.js');
const ev = require('express-validation');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

dotenv.load({ path: '.env.example' });

const app = express();

//swagger configuration
let swaggerDefinition = {
	info: {
		title: 'Node Swagger API',
		version: '1.0.0',
		description: 'REST API for version 1.0.0 bookkeeping service',
	},
	host: 'localhost:8080',
	basePath: '/',
};

let options = {
	swaggerDefinition: swaggerDefinition,
	apis: ['./api/routes/v1/*.js'],
};

let swaggerSpec = swaggerJSDoc(options);

//mongo configuration
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
	console.error(err);
	console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
	process.exit();
});

//express configuration
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET,
	store: new MongoStore({
		url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
		autoReconnect: true,
		clear_interval: 3600
	})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

//mount api v1 routes
app.use('/api/v1', routes);

// serve swagger
app.get('/swagger.json', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});
 
// error handlers
app.use((err, req, res)=>{
	// specific for validation errors 
	if (err instanceof ev.ValidationError) return res.status(err.status).json(err);
});
app.use(errorHandler());

app.listen(app.get('port'), () => {
	console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
	console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
