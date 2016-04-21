var env = process.env.NODE_ENV || 'dev';
var END_POINTS = {
	dev: "http://localhost:4000/api",
	stage: "http://www.nigma.api.grupo-guiame.org/api",
	production: "http://nigma.com:4000/api"
}

exports.URL = END_POINTS[env];