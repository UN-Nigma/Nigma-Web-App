const Nigma 	 = require('./components/app');
const React  	 = require('react');
const router 	 = require('./router/router');
//const ckeditor = require('./utils/ckeditor');



router.run( function ( Handler, state ) {

	React.render(
		<Handler />,
		document.body
	);
});

