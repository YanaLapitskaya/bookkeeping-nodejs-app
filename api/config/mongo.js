const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports=()=> {
	mongoose.Promise = global.Promise;
	mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
	mongoose.connection.on('error', (err) => {
		console.error(err);
		console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
		process.exit();
	});
};