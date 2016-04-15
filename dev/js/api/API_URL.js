var env = process.env.NODE_ENV || 'dev';
var END_POINTS = {
	dev: "http://localhost:4000/api",
	stage: "http://stage.nigma.com:4000/api",
	production: "http://nigma.com:4000/api"
}

exports.URL = END_POINTS[env];