const swaggerJSDoc = require('swagger-jsdoc');

module.exports=()=> {
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

	return swaggerJSDoc(options);
};