

	var libPath = '/js/libs/',
		app = '/js/app/';

	requirejs([
	    libPath + 'json2.js',
	    libPath + 'jquery.js',
	    libPath + 'jquery-ui.js',
	    libPath + 'underscore.js',
	    libPath + 'backbone.js',
	    libPath + 'ejs.js'
	    ], 

	    function( ) {
	    	console.log( arguments );
	    }

	);

